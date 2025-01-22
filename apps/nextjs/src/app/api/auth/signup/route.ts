import type { Options } from "@node-rs/argon2";
import { NextResponse } from "next/server";

import { LoginResponse, signIn } from "@homefront/auth";
import {
  generateRecoveryPhrase,
  storeRecoveryPhrase,
} from "@homefront/auth/recovery-phrase";
import dayjs from "@homefront/dayjs";
import { db, sql } from "@homefront/db";
import { SignUpRequestSchema } from "@homefront/validators";

import { env } from "~/env";

const hashingOptions: Options = {
  memoryCost: 47104,
  timeCost: 3,
  outputLen: 32,
  parallelism: 1,
};

export async function POST(req: Request) {
  const result = await SignUpRequestSchema.safeParseAsync(await req.json());

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { username, password, inviteCode } = result.data;

  try {
    // Hash the password securely
    const { hash } = await import("@node-rs/argon2");
    const passwordHash = await hash(password, hashingOptions);

    // Generate a recovery phrase for the user
    const recoveryPhrase = generateRecoveryPhrase();

    const transactionResult = await db.transaction().execute(async (tx) => {
      const randomAvatar = await tx
        .selectFrom("avatars")
        .selectAll()
        .orderBy(sql`RANDOM()`)
        .limit(1)
        .executeTakeFirstOrThrow();

      // Create the user in the database
      const user = await tx
        .insertInto("users")
        .values({
          username,
          passwordHash,
          role: "user",
          twoFactorEnabled: false,
          twoFactorSecret: null,
          image: `avatars/default/${randomAvatar.filename}`,
        })
        .returning([
          "id",
          "username",
          "name",
          "email",
          "emailVerified",
          "image",
          "role",
          "twoFactorEnabled",
        ])
        .executeTakeFirstOrThrow();

      // Store the recovery phrase for the user
      await storeRecoveryPhrase(recoveryPhrase, user.id, tx);

      // Accept the invite if one was provided
      if (inviteCode) {
        const invite = await tx
          .selectFrom("invites")
          .selectAll()
          .where("code", "=", inviteCode)
          .executeTakeFirstOrThrow();

        const isExpired = dayjs(invite.expiresAt).isBefore(dayjs());
        if (invite.used || isExpired) {
          return NextResponse.json(
            { error: "Invite is invalid or expired" },
            { status: 400 },
          );
        }

        await tx
          .updateTable("invites")
          .set({ used: true })
          .where("id", "=", invite.id)
          .execute();

        await tx
          .insertInto("relationships")
          .values([
            {
              userId: invite.userId,
              friendId: user.id,
              status: "pending_trust",
              createdFromInvite: true,
              inviteCreatedAt: invite.createdAt,
            },
            {
              userId: user.id,
              friendId: invite.userId,
              status: "pending_trust",
              createdFromInvite: true,
              inviteCreatedAt: invite.createdAt,
            },
          ])
          .execute();
      }

      return user;
    });

    if (transactionResult instanceof NextResponse) {
      return transactionResult;
    }

    const user = transactionResult;

    const response: LoginResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      emailVerified: user.emailVerified,
      name: user.name,
      image: user.image,
      role: user.role,
      twoFactorEnabled: user.twoFactorEnabled,
    };

    // Automatically sign in after signup
    await signIn("session-creator", {
      verifiedUser: JSON.stringify(response),
      secret: env.AUTH_SESSION_CREATOR_SECRET,
      redirect: false,
    });

    return NextResponse.json({ success: true, user, recoveryPhrase });
  } catch (error: unknown) {
    // Handle unique constraint violations (like duplicate usernames)
    if (error instanceof Error) {
      console.error("Signup error:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error("Unknown error during signup:", error);
    }
    return NextResponse.json(
      { error: "Failed to create user. Please try again later." },
      { status: 500 },
    );
  }
}
