import { NextResponse } from "next/server";
import { verify } from "@node-rs/argon2";

import { auth } from "@homefront/auth";
import { db } from "@homefront/db";

interface VerifyPasswordRequest {
  userId: string;
  password: string;
}

interface VerifyPasswordResponse {
  isValid: boolean;
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { password } = (await req.json()) as VerifyPasswordRequest;

    const result = await db
      .selectFrom("users")
      .select("passwordHash")
      .where("id", "=", session.user.id)
      .executeTakeFirstOrThrow();

    const isValid = await verify(result.passwordHash, password);

    return NextResponse.json({ isValid } as VerifyPasswordResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
