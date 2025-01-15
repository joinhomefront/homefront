import "server-only";

import type { JWK } from "jose";
import { compactDecrypt, CompactEncrypt, importJWK } from "jose";

export function isUserIdValid(
  userId: string | number | null | undefined,
): userId is string | null | undefined {
  return userId === null || userId === undefined || typeof userId === "string";
}

const base64JWK = process.env.OAUTH_ENCRYPTION_KEY;
if (!base64JWK) {
  throw new Error("OAUTH_ENCRYPTION_KEY is required");
}

const jwk = JSON.parse(
  Buffer.from(base64JWK, "base64").toString("utf-8"),
) as JWK;

const getKey = importJWK(jwk);

/**
 * Encrypts a token using JWE with AES-GCM.
 * @param {string} token - The plaintext token to encrypt.
 * @returns {Promise<string>} - The encrypted token in compact JWE format.
 */
export async function encryptToken(token: string): Promise<string> {
  const key = await getKey;

  // Encrypt the token into a JWE compact format
  const jwe = await new CompactEncrypt(new TextEncoder().encode(token))
    .setProtectedHeader({ alg: "dir", enc: "A256GCM", kid: jwk.kid }) // Use "dir" for direct encryption
    .encrypt(key);

  return jwe;
}

/**
 * Decrypts a JWE token to retrieve the plaintext.
 * @param {string} encryptedToken - The JWE compact token.
 * @returns {Promise<string>} - The decrypted plaintext token.
 */
export async function decryptToken(encryptedToken: string): Promise<string> {
  const key = await getKey;

  // Decrypt the JWE compact token
  const { plaintext } = await compactDecrypt(encryptedToken, key);

  return new TextDecoder().decode(plaintext);
}
