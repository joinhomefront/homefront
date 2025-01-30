import { decodeBase64, encodeBase64 } from "@oslojs/encoding";

import { env } from "../env";

export { decodeBase64, encodeBase64 } from "@oslojs/encoding";

export async function generateECDHKeyPair(): Promise<CryptoKeyPair> {
  return crypto.subtle.generateKey(
    { name: "ECDH", namedCurve: "P-256" },
    true,
    ["deriveKey", "deriveBits"],
  );
}

export async function deriveSharedSecret(
  privateKey: CryptoKey,
  publicKeyRaw: ArrayBuffer,
): Promise<ArrayBuffer> {
  const publicKey = await crypto.subtle.importKey(
    "raw",
    publicKeyRaw,
    { name: "ECDH", namedCurve: "P-256" },
    true,
    [],
  );

  return crypto.subtle.deriveBits(
    { name: "ECDH", public: publicKey },
    privateKey,
    256,
  );
}

export async function deriveAESKey(
  sharedSecret: ArrayBuffer,
  length = 256,
): Promise<CryptoKey> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    sharedSecret,
    "HKDF",
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "HKDF",
      hash: "SHA-256",
      salt,
      info: new TextEncoder().encode("AES-GCM key derivation"),
    },
    keyMaterial,
    { name: "AES-GCM", length },
    true,
    ["encrypt", "decrypt"],
  );
}

export const encryptData = async (
  data: string,
  encryptionKeyBase64: string,
  isBase64 = false, // Add a flag to indicate if the input is Base64
): Promise<string> => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptionKey = decodeBase64(encryptionKeyBase64);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encryptionKey,
    { name: "AES-GCM" },
    false,
    ["encrypt"],
  );

  // Decode Base64 input if necessary
  const rawData = isBase64
    ? decodeBase64(data)
    : new TextEncoder().encode(data);

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    rawData,
  );

  return `${encodeBase64(iv)}:${encodeBase64(new Uint8Array(encrypted))}`;
};

export const decryptData = async (
  encryptedData: string,
  encryptionKeyBase64: string,
): Promise<string> => {
  const [ivBase64, ciphertextBase64] = encryptedData.split(":");
  if (!ivBase64 || !ciphertextBase64) {
    throw new Error("Invalid encrypted data format. Missing IV or ciphertext.");
  }

  const iv = decodeBase64(ivBase64);
  const ciphertext = decodeBase64(ciphertextBase64);
  const encryptionKey = decodeBase64(encryptionKeyBase64);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encryptionKey,
    { name: "AES-GCM" },
    false,
    ["decrypt"],
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    ciphertext,
  );

  return new TextDecoder().decode(decrypted);
};

export async function encryptMiniSession(
  miniSession: string,
  sharedSecret: ArrayBuffer,
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    sharedSecret,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"],
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(miniSession);

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded,
  );

  return encodeBase64(iv) + "." + encodeBase64(new Uint8Array(ciphertext));
}

export async function decryptMiniSession(
  encryptedSession: string,
  sharedSecret: ArrayBuffer,
): Promise<string> {
  // Split IV and ciphertext
  const [ivBase64, ciphertextBase64] = encryptedSession.split(".");
  if (!ivBase64 || !ciphertextBase64) {
    throw new Error("Invalid encrypted session format");
  }

  // Decode components
  const iv = decodeBase64(ivBase64);
  const ciphertext = decodeBase64(ciphertextBase64);

  // Import key for decryption
  const key = await crypto.subtle.importKey(
    "raw",
    sharedSecret,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );

  // Decrypt
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext,
  );

  // Convert to string
  return new TextDecoder().decode(decrypted);
}

export async function hashMiniSession(miniSession: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(env.AUTH_MINI_SESSION_ENCRYPTION_KEY),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(miniSession),
  );

  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyRequestSignature(
  signature: string,
  sharedSecret: ArrayBuffer,
  request: {
    method: string;
    url: string;
    body: string;
    miniSession: string;
  },
): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    "raw",
    sharedSecret,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );

  const signatureData = new TextEncoder().encode(
    `${request.method}\n${request.url}\n${request.body}\n${request.miniSession}`,
  );

  return crypto.subtle.verify(
    "HMAC",
    key,
    decodeBase64(signature),
    signatureData,
  );
}

interface SignatureFields {
  created: number;
  nonce: string;
  headers: string[];
}

function parseSignatureInput(input: string): SignatureFields | null {
  // Extract sig1 value: sig1=("@method" "@path" ...);created=123;nonce="abc"
  const match = /sig1=\((.*?)\);created=(\d+);nonce="([^"]+)"/.exec(input);
  if (!match) return null;

  const [, headers, created, nonce] = match;

  if (!headers || !created || !nonce) return null;

  return {
    headers: headers.split(" ").map((h) => h.replace(/^"(.*)"$/, "$1")),
    created: parseInt(created, 10),
    nonce: nonce,
  };
}

function buildSignatureBase(
  method: string,
  path: string,
  headers: Headers,
  params: SignatureFields,
): string {
  const lines: string[] = [];

  // Add covered headers
  for (const header of params.headers) {
    let value = "";
    if (header === "@method") value = method;
    else if (header === "@path") value = path;
    else value = headers.get(header) ?? "";

    lines.push(`"${header}": ${value}`);
  }

  // Add signature parameters
  const paramLine = `"@signature-params": (${params.headers.map((h) => `"${h}"`).join(" ")});created=${params.created};nonce="${params.nonce}"`;
  lines.push(paramLine);

  return lines.join("\n");
}

export async function verifySignature({
  publicKey,
  signatureInput,
  signature,
  method,
  path,
  headers,
}: {
  publicKey: string;
  signatureInput: string;
  signature: string;
  method: string;
  path: string;
  headers: Headers;
}): Promise<boolean> {
  const params = parseSignatureInput(signatureInput);
  if (!params) return false;

  // Validate timestamp is within window
  const nowSeconds = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSeconds - params.created) > 300) return false; // 5 minute window

  const signatureBase = buildSignatureBase(method, path, headers, params);
  const key = await importPublicKey(publicKey);

  return crypto.subtle.verify(
    { name: "ECDSA", hash: "SHA-256" },
    key,
    decodeBase64(signature.split(":")[1] ?? ""),
    new TextEncoder().encode(signatureBase),
  );
}

async function importPublicKey(publicKey: string) {
  return await crypto.subtle.importKey(
    "raw",
    decodeBase64(publicKey),
    {
      name: "ECDSA",
      namedCurve: "P-256",
      hash: { name: "SHA-256" },
    },
    true,
    ["verify"],
  );
}

export async function encryptServerKeys(
  serverKeys: CryptoKeyPair,
  envKeyBase64: string,
): Promise<{ encryptedPublicKey: string; encryptedPrivateKey: string }> {
  const encryptionKey = decodeBase64(envKeyBase64);

  // Import the environment encryption key
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encryptionKey,
    { name: "AES-GCM" },
    false,
    ["encrypt"],
  );

  // Export the raw keys from the server key pair
  const serverPublicKeyRaw = await crypto.subtle.exportKey(
    "raw",
    serverKeys.publicKey,
  );
  const serverPrivateKeyRaw = await crypto.subtle.exportKey(
    "pkcs8",
    serverKeys.privateKey,
  );

  // Generate IVs for encryption
  const publicKeyIv = crypto.getRandomValues(new Uint8Array(12));
  const privateKeyIv = crypto.getRandomValues(new Uint8Array(12));

  // Encrypt the public and private keys
  const encryptedPublicKey = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: publicKeyIv },
    cryptoKey,
    new Uint8Array(serverPublicKeyRaw),
  );
  const encryptedPrivateKey = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: privateKeyIv },
    cryptoKey,
    new Uint8Array(serverPrivateKeyRaw),
  );

  // Return encrypted keys along with their IVs
  return {
    encryptedPublicKey: `${encodeBase64(publicKeyIv)}:${encodeBase64(
      new Uint8Array(encryptedPublicKey),
    )}`,
    encryptedPrivateKey: `${encodeBase64(privateKeyIv)}:${encodeBase64(
      new Uint8Array(encryptedPrivateKey),
    )}`,
  };
}
export async function decryptServerKeys(
  encryptedPublicKey: string,
  encryptedPrivateKey: string,
  envKeyBase64: string,
): Promise<{ publicKey: CryptoKey; privateKey: CryptoKey }> {
  const encryptionKey = decodeBase64(envKeyBase64);

  // Import the environment encryption key
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encryptionKey,
    { name: "AES-GCM" },
    false,
    ["decrypt"],
  );

  // Split and decode the IV and ciphertext for the public key
  const [publicKeyIvBase64, publicKeyCiphertextBase64] =
    encryptedPublicKey.split(":");
  if (!publicKeyIvBase64 || !publicKeyCiphertextBase64) {
    throw new Error("Invalid encrypted public key format");
  }
  const publicKeyIv = decodeBase64(publicKeyIvBase64);
  const publicKeyCiphertext = decodeBase64(publicKeyCiphertextBase64);

  // Decrypt the public key
  const publicKeyRaw = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: publicKeyIv },
    cryptoKey,
    publicKeyCiphertext,
  );

  // Split and decode the IV and ciphertext for the private key
  const [privateKeyIvBase64, privateKeyCiphertextBase64] =
    encryptedPrivateKey.split(":");
  if (!privateKeyIvBase64 || !privateKeyCiphertextBase64) {
    throw new Error("Invalid encrypted private key format");
  }
  const privateKeyIv = decodeBase64(privateKeyIvBase64);
  const privateKeyCiphertext = decodeBase64(privateKeyCiphertextBase64);

  // Decrypt the private key
  const privateKeyRaw = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: privateKeyIv },
    cryptoKey,
    privateKeyCiphertext,
  );

  // Import the decrypted keys back into CryptoKey objects
  const publicKey = await crypto.subtle.importKey(
    "raw",
    publicKeyRaw,
    { name: "ECDH", namedCurve: "P-256" },
    true,
    [],
  );

  const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    privateKeyRaw,
    { name: "ECDH", namedCurve: "P-256" },
    true,
    ["deriveBits"],
  );

  return { publicKey, privateKey };
}
