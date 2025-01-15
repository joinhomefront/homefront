import { NextResponse } from "next/server";
import { verify } from "@node-rs/argon2";
import { decodeBase32 } from "@oslojs/encoding";
import { verifyTOTPWithGracePeriod } from "@oslojs/otp";

import {
  generateBackupCodes,
  storeBackupCodes,
} from "@homefront/auth/backup-codes";
import { encryptTOTPKey } from "@homefront/auth/otp";
import { db } from "@homefront/db";
import { auth } from "@homefront/auth";
import { TwoFactorEnableRequestSchema } from "@homefront/validators";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { password, totp, secret } = await TwoFactorEnableRequestSchema.parseAsync( await request.json())

    const user = await db
      .selectFrom("users")
      .select(["id", "passwordHash", "twoFactorEnabled"])
      .where("id", "=", session.user.id)
      .executeTakeFirst();

    if (!user) throw new Error("User not found");

    const isValid = await verify(user.passwordHash, password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    if (user.twoFactorEnabled) {
      return NextResponse.json(
        { error: "Two-factor authentication is already enabled" },
        { status: 400 },
      );
    }

    const decodedSecret = decodeBase32(secret);
    const validCode = verifyTOTPWithGracePeriod(decodedSecret, 30, 6, totp, 30);
    if (!validCode) {
      return NextResponse.json(
        { error: "Invalid authentication code" },
        { status: 401 },
      );
    }

    // Generate backup codes
    const backupCodes = generateBackupCodes();

    const encryptedSecret = await encryptTOTPKey(secret);

    const result = await db.transaction().execute(async (tx) => {
      await tx
        .updateTable("users")
        .set({
          twoFactorEnabled: true,
          twoFactorSecret: encryptedSecret,
        })
        .where("id", "=", user.id)
        .execute();

      return await storeBackupCodes(backupCodes, user.id, tx);
    });

    if (!result) {
      return NextResponse.json(
        { error: "Failed to generate backup codes" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, backupCodes });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Backup codes generation error:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error("Unknown error during backup codes generation:", error);
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
