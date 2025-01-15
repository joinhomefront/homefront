import crypto from "crypto";
import { NextResponse } from "next/server";
import { hash, verify } from "@node-rs/argon2";

import { auth } from "@homefront/auth";
import { decryptChallenge } from "@homefront/auth/challenges";
import { db } from "@homefront/db";
import { ChangePasswordRequestSchema } from "@homefront/validators";
import { env } from "~/env";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword, challenge } =
      await ChangePasswordRequestSchema.parseAsync(await request.json());

    // Fetch user details from the database
    const user = await db
      .selectFrom("users")
      .select(["id", "passwordHash"])
      .where("id", "=", session.user.id)
      .executeTakeFirst();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify the current password
    const isPasswordValid = await verify(user.passwordHash, currentPassword);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Fetch all challenges for the user
    const challenges = await db
      .selectFrom("authChallenges")
      .selectAll()
      .where("userId", "=", session.user.id)
      .execute();

    if (challenges.length === 0) {
      return NextResponse.json(
        { error: "No active challenges" },
        { status: 401 },
      );
    }

    const secretKey = env.AUTH_SECRET;

    let validChallenge = null;

    // Iterate over stored challenges to validate the received challenge
    for (const storedChallenge of challenges) {
      const decryptedChallenge = await decryptChallenge(
        storedChallenge.challenge,
      );

      const hmac = crypto
        .createHmac("sha256", secretKey)
        .update(decryptedChallenge)
        .digest("hex");

      if (crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(challenge))) {
        validChallenge = storedChallenge;
        break;
      }
    }

    // If no valid challenge is found, reject the request
    if (!validChallenge) {
      return NextResponse.json(
        { error: "Invalid or expired challenge" },
        { status: 401 },
      );
    }

    // Check if the valid challenge has expired
    if (new Date(validChallenge.expiresAt) < new Date()) {
      // Delete the expired challenge
      await db
        .deleteFrom("authChallenges")
        .where("id", "=", validChallenge.id)
        .execute();
      return NextResponse.json({ error: "Challenge expired" }, { status: 401 });
    }

    // Update the user's password and delete the used challenge
    await db.transaction().execute(async (tx) => {
      await tx
        .deleteFrom("authChallenges")
        .where("id", "=", validChallenge.id)
        .execute();

      await tx
        .updateTable("users")
        .set({
          passwordHash: await hash(newPassword),
        })
        .where("id", "=", session.user.id)
        .execute();
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to update password:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error("Unknown error updating password:", error);
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
