import { NextResponse } from "next/server";
import { verify } from "@node-rs/argon2";

import { auth } from "@homefront/auth";
import {
  generateRecoveryPhrase,
  storeRecoveryPhrase,
} from "@homefront/auth/recovery-phrase";
import { db } from "@homefront/db";

interface GenerateRecoveryPhraseRequest {
  password: string;
}

export async function POST(req: Request) {
  const { password } = (await req.json()) as GenerateRecoveryPhraseRequest;

  // Input validation
  if (!password) {
    return NextResponse.json(
      { error: "Your current password is required" },
      { status: 400 },
    );
  }

  try {
    // Validate the session token
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "You are not currently signed in" },
        { status: 401 },
      );
    }

    // Fetch user from database
    const user = await db
      .selectFrom("users")
      .select(["id", "passwordHash"])
      .where("id", "=", session.user.id)
      .executeTakeFirstOrThrow();

    // Verify password
    const isValid = await verify(user.passwordHash, password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate a recovery phrase for the user
    const recoveryPhrase = generateRecoveryPhrase();

    const result = await db.transaction().execute(async (tx) => {
      // Store the recovery phrase for the user
      return storeRecoveryPhrase(recoveryPhrase, user.id, tx);
    });

    if (!result) {
      return NextResponse.json(
        {
          error: "Failed to generate recovery phrase. Please try again later.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, recoveryPhrase });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Recovery phrase generation error:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error("Unknown error during signup:", error);
    }
    return NextResponse.json(
      { error: "Failed to generate recovery phrase. Please try again later." },
      { status: 500 },
    );
  }
}
