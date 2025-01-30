import { webcrypto } from "crypto";
import { decodeBase64, encodeBase64 } from "@oslojs/encoding";

import { env } from "../env";

const { subtle } = webcrypto;
const ENCRYPTION_KEY = env.AUTH_MINI_SESSION_ENCRYPTION_KEY; // Base64-encoded key
const IV_LENGTH = 12; // AES-GCM recommended IV length

interface BlackBoxData {
  fingerprint: string;
  miniSession: string;
  timestamp: number;
}

interface BlackBox {
  data: BlackBoxData;
  signature: string;
}

export async function generateKeyPair() {
  const keyPair = await subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-256",
    },
    true,
    ["sign", "verify"],
  );

  const publicKey = await subtle.exportKey("spki", keyPair.publicKey);
  const privateKey = await subtle.exportKey("pkcs8", keyPair.privateKey);

  return {
    publicKey: encodeBase64(Buffer.from(publicKey)),
    privateKey: encodeBase64(Buffer.from(privateKey)),
  };
}

export async function generateFingerprint(req: Request): Promise<string> {
  const data = [
    req.headers.get("user-agent"),
    req.headers.get("accept-language"),
    req.headers.get("sec-ch-ua-platform"),
    req.headers.get("sec-ch-ua"),
  ].filter(Boolean);

  const hash = await subtle.digest(
    "SHA-256",
    new TextEncoder().encode(data.join("")),
  );

  return Buffer.from(hash).toString("hex");
}

export async function signBlackBox(
  data: BlackBoxData,
  privateKey: string,
): Promise<string> {
  const key = await subtle.importKey(
    "pkcs8",
    Buffer.from(privateKey, "base64"),
    {
      name: "ECDSA",
      namedCurve: "P-256",
    },
    true,
    ["sign"],
  );

  const signature = await subtle.sign(
    { name: "ECDSA", hash: "SHA-256" },
    key,
    new TextEncoder().encode(JSON.stringify(data)),
  );

  return Buffer.from(signature).toString("base64");
}

export async function validateBlackBox(
  blackbox: string,
  publicKey: string,
  miniSession: string,
  fingerprint: string,
): Promise<boolean> {
  try {
    const parsed = decodeBase64(blackbox);
    const { data, signature } = JSON.parse(
      new TextDecoder().decode(parsed),
    ) as BlackBox;

    if (
      data.fingerprint !== fingerprint ||
      data.miniSession !== miniSession ||
      Date.now() - data.timestamp > 5 * 60 * 1000
    ) {
      return false;
    }

    const key = await subtle.importKey(
      "spki",
      decodeBase64(publicKey),
      { name: "ECDSA", namedCurve: "P-256" },
      true,
      ["verify"],
    );

    return await subtle.verify(
      { name: "ECDSA", hash: "SHA-256" },
      key,
      decodeBase64(signature),
      new TextEncoder().encode(JSON.stringify(data)),
    );
  } catch {
    return false;
  }
}

export async function encryptPrivateKey(privateKey: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const encryptionKey = decodeBase64(ENCRYPTION_KEY);

  const cryptoKey = await subtle.importKey(
    "raw",
    encryptionKey,
    { name: "AES-GCM" },
    false,
    ["encrypt"],
  );

  const encrypted = await subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    new TextEncoder().encode(privateKey),
  );

  return `${Buffer.from(iv).toString("hex")}:${Buffer.from(encrypted).toString("hex")}`;
}

export async function decryptPrivateKey(encryptedKey: string): Promise<string> {
  const [ivHex, encryptedHex] = encryptedKey.split(":");
  if (!ivHex || !encryptedHex) {
    throw new TypeError("Invalid encrypted key format");
  }

  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const encryptionKey = decodeBase64(ENCRYPTION_KEY);

  const cryptoKey = await subtle.importKey(
    "raw",
    encryptionKey,
    { name: "AES-GCM" },
    false,
    ["decrypt"],
  );

  const decrypted = await subtle.decrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    encrypted,
  );

  return new TextDecoder().decode(decrypted);
}
