import { URLSearchParams } from "url";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  requestFromVanilla,
  responseToVanilla,
} from "@jmondi/oauth2-server/vanilla";

import { authorizationServer } from "@homefront/oauth";

import { env } from "~/env";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const codeVerifier = req.cookies.get("code_verifier")?.value;

    if (!code || !state || !codeVerifier) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 },
      );
    }

    const clientId = env.AUTH_HOMEFRONT_ID;
    const clientSecret = env.AUTH_HOMEFRONT_SECRET;
    const tokenUrl = `${env.NEXT_PUBLIC_BASE_URL}/api/oauth/token`;
    const redirectUri = `${env.NEXT_PUBLIC_BASE_URL}/api/oauth/callback`;

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
      code_verifier: codeVerifier,
    });

    const oauthRequest = await requestFromVanilla(
      new Request(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }),
    );

    const oauthResponse =
      await authorizationServer.respondToAccessTokenRequest(oauthRequest);
    const vanillaResponse = responseToVanilla(oauthResponse);

    // Get content type and raw response
    const contentType = vanillaResponse.headers.get("content-type");
    const rawResponse = await vanillaResponse.text();

    let responseData;
    if (contentType?.includes("application/json")) {
      try {
        responseData = JSON.parse(rawResponse);

        // Validate response shape
        if (typeof responseData !== "object" || responseData === null) {
          throw new Error("Invalid JSON response structure");
        }
      } catch (parseError) {
        console.error("JSON Parse error:", {
          error: parseError,
          rawResponse,
          contentType,
        });
        responseData = rawResponse;
      }
    } else {
      responseData = rawResponse;
    }

    const response = NextResponse.json(responseData, {
      status: vanillaResponse.status,
      headers: {
        "Content-Type": contentType || "application/json",
      },
    });

    // Copy remaining headers
    vanillaResponse.headers.forEach((value: string, key: string) => {
      if (key.toLowerCase() !== "content-type") {
        response.headers.set(key, value);
      }
    });

    return response;
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.json(
      { error: "An error occurred during callback" },
      { status: 500 },
    );
  }
}
