import crypto from "crypto";
import { NextResponse } from "next/server";
import { decodeBase32 } from "@oslojs/encoding";
import { verifyTOTPWithGracePeriod } from "@oslojs/otp";
import { env } from "~/env";

import { auth } from "@homefront/auth";
import { encryptChallenge } from "@homefront/auth/challenges";
import { decryptTOTPKey } from "@homefront/auth/otp";
import { db } from "@homefront/db";
import { ValidateChangeRequestSchema } from "@homefront/validators";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await ValidateChangeRequestSchema.parseAsync(
      await request.json(),
    );

    const user = await db
      .selectFrom("users")
      .select(["id", "passwordHash", "twoFactorEnabled", "twoFactorSecret"])
      .where("id", "=", session.user.id)
      .executeTakeFirst();

    if (!user) throw new Error("User not found");

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
    const validCode = verifyTOTPWithGracePeriod(
      decodedSecret,
      30,
      6,
      content,
      30,
    );
    if (!validCode) {
      return NextResponse.json(
        { error: "Invalid authentication code" },
        { status: 401 },
      );
    }

    const challenge = crypto.randomBytes(32).toString("base64");
    const secretKey = env.AUTH_SECRET;
    const hmac = crypto
      .createHmac("sha256", secretKey)
      .update(challenge)
      .digest("hex");

    await db
      .insertInto("authChallenges")
      .values({
        userId: session.user.id,
        challenge: await encryptChallenge(challenge),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      })
      .executeTakeFirstOrThrow();

    return NextResponse.json({ success: true, challenge: hmac });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to validate:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error("Unknown error validating:", error);
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
