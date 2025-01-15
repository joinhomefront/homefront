import { encodeBase32 } from "@oslojs/encoding";
import { env } from "@homefront/auth/env";

const IV_LENGTH = 16; // Initialization Vector length for AES-GCM
const OTP_ENCRYPTION_KEY = env.OTP_ENCRYPTION_KEY; // Base64-encoded key

// Helper to decode Base64 to Uint8Array
const decodeBase64 = (base64: string): Uint8Array => {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
};

// Generate a TOTP secret using Web Crypto API
export const generateTOTPSecret = (): string => {
  const randomBuffer = new Uint8Array(20);
  crypto.getRandomValues(randomBuffer); // Generate secure random bytes
  return encodeBase32(randomBuffer); // Encode as Base32
};

// Encrypt a TOTP key using Web Crypto API
export const encryptTOTPKey = async (key: string): Promise<string> => {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH)); // Generate random IV
  const encryptionKey = decodeBase64(OTP_ENCRYPTION_KEY); // Decode Base64 key
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encryptionKey,
    { name: "AES-GCM" },
    false,
    ["encrypt"],
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    new TextEncoder().encode(key), // Convert key to Uint8Array
  );

  // Convert encrypted data and IV to hex for storage
  return `${Buffer.from(iv).toString("hex")}:${Buffer.from(encrypted).toString("hex")}`;
};

export const decryptTOTPKey = async (encryptedKey: string): Promise<string> => {
  const [ivHex, encryptedHex] = encryptedKey.split(":");
  if (!ivHex || !encryptedHex) {
    throw new TypeError("Invalid encrypted key format");
  }
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const encryptionKey = decodeBase64(OTP_ENCRYPTION_KEY);
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
    encrypted,
  );

  return new TextDecoder().decode(decrypted);
};

// Example: Generate and encrypt a TOTP key
export const generateAndEncryptTOTPKey = async (): Promise<string> => {
  const totpSecret = generateTOTPSecret(); // Generate TOTP secret
  return encryptTOTPKey(totpSecret); // Encrypt the TOTP secret
};
