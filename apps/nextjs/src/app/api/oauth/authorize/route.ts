import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "@homefront/auth";
import { authorizationServer, requestFromVanilla } from "@homefront/oauth";

import { env } from "~/env";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("No session found");
    }

    const url = new URL(req.url);
    const state = url.searchParams.get("state");
    const codeChallenge = url.searchParams.get("code_challenge");
    const codeChallengeMethod = url.searchParams.get("code_challenge_method");

    if (!state || !codeChallenge || !codeChallengeMethod) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 },
      );
    }

    const tokenUrl = `${env.NEXT_PUBLIC_BASE_URL}/api/oauth/token`;
    const clientId = env.AUTH_HOMEFRONT_ID;
    const redirectUri = `${env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/homefront`;

    const params = {
      response_type: "code",
      redirect_uri: redirectUri,
      client_id: clientId,
      code_challenge: codeChallenge,
      code_challenge_method: codeChallengeMethod,
      state: state,
      scope: "user",
    };

    const baseUrl = new URL(tokenUrl);
    baseUrl.search = new URLSearchParams(params).toString();

    const oauthRequest = await requestFromVanilla(
      new Request(baseUrl, { method: "GET" }),
    );

    const authorizationRequest =
      await authorizationServer.validateAuthorizationRequest(oauthRequest);

    authorizationRequest.isAuthorizationApproved = true;
    authorizationRequest.user = session.user;

    const authorizationResponse =
      await authorizationServer.completeAuthorizationRequest(
        authorizationRequest,
      );

    if (authorizationResponse.status === 302) {
      const redirectLocation =
        authorizationResponse.headers.location ||
        authorizationResponse.headers.get("location");

      if (redirectLocation) {
        return NextResponse.redirect(new URL(redirectLocation));
      }
    }

    return NextResponse.json(
      { message: "Unexpected response from authorization server" },
      { status: 500 },
    );
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.json(
      { error: "An error occurred during callback" },
      { status: 500 },
    );
  }
}
