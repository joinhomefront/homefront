import { NextResponse } from "next/server";
import { verify } from "@node-rs/argon2";
import { decodeBase32 } from "@oslojs/encoding";
import { verifyTOTPWithGracePeriod } from "@oslojs/otp";

import { auth } from "@homefront/auth";
import { decryptTOTPKey } from "@homefront/auth/otp";
import { db } from "@homefront/db";
import { TwoFactorDisableRequestSchema } from "@homefront/validators";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { password, totp } = await TwoFactorDisableRequestSchema.parseAsync(
      await request.json(),
    );

    const user = await db
      .selectFrom("users")
      .select(["id", "passwordHash", "twoFactorEnabled", "twoFactorSecret"])
      .where("id", "=", session.user.id)
      .executeTakeFirst();

    if (!user) throw new Error("User not found");

    const isValid = await verify(user.passwordHash, password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    if (!user.twoFactorEnabled) {
      return NextResponse.json(
        { error: "Two-factor authentication is not enabled" },
        { status: 400 },
      );
    }

    if (!user.twoFactorSecret) {
      return NextResponse.json(
        { error: "Two-factor authentication secret not found" },
        { status: 500 },
      );
    }

    const secret = await decryptTOTPKey(user.twoFactorSecret);
    const decodedSecret = decodeBase32(secret);
    const validCode = verifyTOTPWithGracePeriod(decodedSecret, 30, 6, totp, 30);
    if (!validCode) {
      return NextResponse.json(
        { error: "Invalid authentication code" },
        { status: 401 },
      );
    }

    await db.transaction().execute(async (tx) => {
      await tx
        .updateTable("users")
        .set({
          twoFactorEnabled: false,
          twoFactorSecret: null,
        })
        .where("id", "=", user.id)
        .execute();

      await tx
        .deleteFrom("backupCodes")
        .where("userId", "=", user.id)
        .execute();
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to disable 2FA:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error(
        "Unknown error disabling two-factor authentication:",
        error,
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
