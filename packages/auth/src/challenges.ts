import crypto from "crypto";
import { decodeBase64 } from "@oslojs/encoding";

import { env } from "@homefront/auth/env";

const ENCRYPTION_KEY = env.AUTH_CHALLENGE_ENCRYPTION_KEY; // Base64-encoded key
const IV_LENGTH = 16; // AES block size

export const encryptChallenge = async (challenge: string): Promise<string> => {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH)); // Generate random IV
  const encryptionKey = decodeBase64(ENCRYPTION_KEY); // Decode Base64 key

  // Import the encryption key for AES-GCM
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encryptionKey,
    { name: "AES-GCM" },
    false,
    ["encrypt"],
  );

  // Encrypt the challenge
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    new TextEncoder().encode(challenge), // Convert challenge to Uint8Array
  );

  // Combine IV and encrypted data as a hex string
  return `${Buffer.from(iv).toString("hex")}:${Buffer.from(encrypted).toString("hex")}`;
};

export const decryptChallenge = async (
  encryptedChallenge: string,
): Promise<string> => {
  const [ivHex, encryptedHex] = encryptedChallenge.split(":");
  if (!ivHex || !encryptedHex) {
    throw new TypeError("Invalid encrypted challenge format");
  }

  const iv = Buffer.from(ivHex, "hex"); // Parse IV from hex
  const encrypted = Buffer.from(encryptedHex, "hex"); // Parse encrypted data from hex

  const encryptionKey = decodeBase64(ENCRYPTION_KEY); // Decode Base64 key

  // Import the encryption key for AES-GCM
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encryptionKey,
    { name: "AES-GCM" },
    false,
    ["decrypt"],
  );

  // Decrypt the challenge
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    encrypted,
  );

  return new TextDecoder().decode(decrypted); // Convert decrypted bytes to string
};
