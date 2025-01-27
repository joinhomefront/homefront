import { NextResponse } from "next/server";
import { decodeBase32 } from "@oslojs/encoding";
import { verifyTOTPWithGracePeriod } from "@oslojs/otp";

import { LoginResponse, signIn } from "@homefront/auth";
import { useBackupCode } from "@homefront/auth/backup-codes";
import {
  decodeBase64,
  decryptMiniSession,
  decryptServerKeys,
  deriveSharedSecret,
  verifySignature,
} from "@homefront/auth/crypto";
import { decryptTOTPKey } from "@homefront/auth/otp";
import { db } from "@homefront/db";
import { deleteMiniSession, getMiniSession } from "@homefront/redis";

import { env } from "~/env";

// Helper function to produce error responses
function errorResponse(message: string, status: number = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function POST(req: Request) {
  let body: {
    miniSession?: string;
    otp?: string;
    recoveryCode?: string;
    publicKey?: string;
  };
  try {
    body = await req.json();
  } catch (err) {
    console.error("Failed to parse JSON body:", err);
    return errorResponse("Invalid JSON body", 400);
  }

  const { miniSession, otp, recoveryCode, publicKey } = body;

  // Check required fields
  if (!miniSession || !publicKey) {
    return errorResponse("miniSession and publicKey are required", 400);
  }

  // One of TOTP code or Recovery code must be provided
  if (!otp && !recoveryCode) {
    return errorResponse("TOTP or recovery code is required", 400);
  }

  try {
    // Get mini-session from Redis
    const {
      publicKey: encryptedPublicKey,
      privateKey: encryptedPrivateKey,
      miniSessionId,
      userId,
    } = await getMiniSession(miniSession);

    const { privateKey } = await decryptServerKeys(
      encryptedPublicKey,
      encryptedPrivateKey,
      env.AUTH_MINI_SESSION_ENCRYPTION_KEY,
    );

    // Derive the shared secret
    const sharedSecret = await deriveSharedSecret(
      privateKey,
      decodeBase64(publicKey),
    );

    // Decrypt the mini-session
    const decryptedSessionId = await decryptMiniSession(
      miniSession,
      sharedSecret,
    );

    // Compare the decrypted session ID with the stored one
    if (decryptedSessionId !== miniSessionId) {
      return errorResponse(
        "Mini-session ID mismatch. Possible replay attack.",
        401,
      );
    }

    // Get user info
    const user = await db
      .selectFrom("users")
      .select([
        "id",
        "name",
        "username",
        "email",
        "emailVerified",
        "image",
        "role",
        "twoFactorEnabled",
        "twoFactorSecret",
      ])
      .where("id", "=", userId)
      .executeTakeFirst();

    if (!user) {
      throw new Error("User not found");
    }

    // Verify signature
    const signatureInput = req.headers.get("signature-input");
    const signature = req.headers.get("signature");

    if (!signatureInput || !signature) {
      throw new Error("Missing signature headers");
    }

    const isValid = await verifySignature({
      publicKey,
      signatureInput,
      signature,
      method: req.method,
      path: req.url,
      headers: req.headers,
    });

    if (!isValid) {
      throw new Error("Invalid signature");
    }

    // Delete mini session from Redis
    await deleteMiniSession(miniSession);

    // If a recovery code is provided, we try that
    if (recoveryCode) {
      const result = await useBackupCode(recoveryCode, user.id);
      if (!result) {
        return errorResponse("Invalid recovery code", 401);
      }
    } else {
      // Otherwise, verify TOTP if 2FA is enabled
      if (!user.twoFactorEnabled) {
        return errorResponse("Two-factor is not enabled for this user", 401);
      }
      if (!user.twoFactorSecret) {
        throw new Error("User has twoFactorEnabled but no twoFactorSecret");
      }

      // Decrypt TOTP secret from DB
      let decryptedSecret: string;
      try {
        decryptedSecret = await decryptTOTPKey(user.twoFactorSecret);
      } catch (err) {
        throw new Error("Failed to decrypt user's TOTP secret");
      }

      // Validate TOTP code
      const decodedSecret = decodeBase32(decryptedSecret);
      const validCode = verifyTOTPWithGracePeriod(
        decodedSecret,
        30, // step
        6, // digits
        otp ?? "", // the code user provided
        30, // grace period
      );

      if (!validCode) {
        return errorResponse("Invalid two-factor code", 401);
      }
    }

    // If all checks pass, sign the user in
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

    // Attempt to set the session
    try {
      await signIn("session-creator", {
        verifiedUser: JSON.stringify(response),
        secret: env.AUTH_SESSION_CREATOR_SECRET,
        redirect: false,
      });
    } catch (err) {
      console.error("Failed to create session:", err);
      return errorResponse("Failed to create session", 500);
    }

    // Return success with user data
    return NextResponse.json({ success: true, user: response });
  } catch (error) {
    console.error("2FA verification error:", error);
    return NextResponse.json(
      { error: "An error occurred during verification" },
      { status: 500 },
    );
  }
}
