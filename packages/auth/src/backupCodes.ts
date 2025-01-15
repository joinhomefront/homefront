import "server-only";

import type { Transaction } from "kysely";

import type { BackupCode, Database } from "@homefront/db";
import { db } from "@homefront/db";

const DEFAULT_CODE_LENGTH = 8;
const DEFAULT_COUNT = 16;

const generateRandomCode = (length = DEFAULT_CODE_LENGTH): string => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (value) => chars[value % chars.length]).join("");
};

const generateBackupCodes = (
  count = DEFAULT_COUNT,
  length = DEFAULT_CODE_LENGTH,
): string[] => {
  return Array.from({ length: count }, () => generateRandomCode(length));
};

const hashBackupCode = async (code: string): Promise<string> => {
  const { hash } = await import("@node-rs/argon2");
  return hash(code);
};

const hashBackupCodes = async (codes: string[]): Promise<string[]> => {
  return Promise.all(codes.map(hashBackupCode));
};

const verifyBackupCode = async (
  codeHash: string,
  code: string,
): Promise<boolean> => {
  const { verify } = await import("@node-rs/argon2");
  return verify(codeHash, code);
};

const storeBackupCodes = async (
  codes: string[],
  userId: string,
  tx: Transaction<Database>,
) => {
  const hashedCodes = await hashBackupCodes(codes);

  try {
    return tx
      .insertInto("backupCodes")
      .values(
        hashedCodes.map((codeHash) => ({ codeHash, userId, used: false })),
      )
      .execute();
  } catch (error) {
    console.error("Failed to store backup codes:", error);
  }
};

const useBackupCode = async (
  code: string,
  userId: string,
): Promise<boolean> => {
  try {
    const backupCodes: BackupCode[] = await db
      .selectFrom("backupCodes")
      .select([
        "id",
        "userId",
        "codeHash",
        "used",
        "usedAt",
        "createdAt",
        "updatedAt",
      ])
      .where("userId", "=", userId)
      .where("used", "=", false)
      .execute();

    if (!backupCodes.length) {
      throw new Error("No valid backup codes found for user");
    }

    for (const backupCode of backupCodes) {
      const isValid = await verifyBackupCode(backupCode.codeHash, code);
      if (isValid) {
        await db
          .updateTable("backupCodes")
          .set({ used: true, usedAt: new Date() })
          .where("id", "=", backupCode.id)
          .executeTakeFirstOrThrow();
      }
    }

    return false;
  } catch (error) {
    console.error("Failed to use backup code:", error);
    return false;
  }
};

export { storeBackupCodes, generateBackupCodes, useBackupCode };
