import { NextResponse } from "next/server";
import { verify } from "@node-rs/argon2";

import type { LoginRequest, LoginResponse } from "@homefront/auth";
import { signIn } from "@homefront/auth";
import {
  decodeBase64,
  deriveSharedSecret,
  encryptMiniSession,
  encryptServerKeys,
  generateECDHKeyPair,
} from "@homefront/auth/crypto";
import { db } from "@homefront/db";
import { setMiniSession } from "@homefront/redis";

import { env } from "~/env";

export async function POST(req: Request) {
  const { username, password, publicKey } = (await req.json()) as LoginRequest;

  // Input validation
  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 },
    );
  }

  try {
    const user = await db
      .selectFrom("users")
      .select([
        "id",
        "name",
        "username",
        "email",
        "emailVerified",
        "passwordHash",
        "image",
        "role",
        "twoFactorEnabled",
        "twoFactorSecret",
      ])
      .where("username", "=", username)
      .executeTakeFirst();

    if (!user || !(await verify(user.passwordHash, password))) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 },
      );
    }

    if (!!user.twoFactorEnabled) {
      // Generate server key pair
      const serverKeys = await generateECDHKeyPair();
      // Derive shared secret from client public key
      const sharedSecret = await deriveSharedSecret(
        serverKeys.privateKey,
        decodeBase64(publicKey),
      );

      // Create and encrypt mini session
      const miniSession = crypto.randomUUID();
      const encryptedSession = await encryptMiniSession(
        miniSession,
        sharedSecret,
      );

      const { encryptedPublicKey, encryptedPrivateKey } =
        await encryptServerKeys(
          serverKeys,
          env.AUTH_MINI_SESSION_ENCRYPTION_KEY,
        );

      // Store in Redis instead of database
      await setMiniSession({
        miniSessionId: miniSession,
        miniSession: encryptedSession,
        userId: user.id,
        publicKey: encryptedPublicKey,
        privateKey: encryptedPrivateKey,
      });

      return NextResponse.json({
        miniSession: encryptedSession,
        publicKey,
        requiresTwoFactor: true,
      });
    }

    // Send response with user data (omit sensitive info)
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

    await signIn("session-creator", {
      verifiedUser: JSON.stringify(response),
      secret: env.AUTH_SESSION_CREATOR_SECRET,
      redirect: false,
    });

    return NextResponse.json({ success: true, user: response });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 },
    );
  }
}
