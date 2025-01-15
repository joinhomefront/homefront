import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decodeJwt } from "jose";

import { db } from "@homefront/db";

export const dynamic = "force-dynamic";

// Utility function to extract the access token from the `Authorization` header
function getAccessTokenFromHeader(req: NextRequest): string | null {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7); // Remove "Bearer " prefix
}

export async function GET(req: NextRequest) {
  try {
    // Extract the access token
    const accessToken = getAccessTokenFromHeader(req);

    if (!accessToken) {
      return NextResponse.json(
        { error: "invalid_request", error_description: "Missing access token" },
        { status: 401 },
      );
    }

    const { sub, exp } = decodeJwt(accessToken);

    if (!sub || !exp) {
      return NextResponse.json(
        { error: "invalid_token", error_description: "Invalid access token" },
        { status: 401 },
      );
    }

    // Fetch user details from the database
    const user = await db
      .selectFrom("users")
      .where("id", "=", sub)
      .select([
        "id",
        "username",
        "image",
        "email",
        "emailVerified",
        "role",
        "name",
      ]) // Select only public fields
      .executeTakeFirst();

    if (!user) {
      return NextResponse.json(
        { error: "invalid_token", error_description: "User not found" },
        { status: 401 },
      );
    }

    // Return user info
    return NextResponse.json({
      sub: user.id,
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
      name: user.name,
      username: user.username,
      image: user.image,
    });
  } catch (error) {
    console.error("Userinfo error:", error);
    return NextResponse.json(
      {
        error: "server_error",
        error_description: "An internal error occurred",
      },
      { status: 500 },
    );
  }
}
