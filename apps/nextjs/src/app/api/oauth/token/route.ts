import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  authorizationServer,
  requestFromVanilla,
  responseToVanilla,
} from "@homefront/oauth";

export async function POST(req: NextRequest) {
  try {
    // Parse form-encoded body
    const formBody = await req.text();
    const body = Object.fromEntries(new URLSearchParams(formBody));

    // Proceed with the request
    const oauthRequest = await requestFromVanilla(
      new Request(req.url, {
        method: req.method,
        headers: {
          ...Object.fromEntries(req.headers.entries()),
          "Content-Type": "application/json", // Change Content-Type to JSON
        },
        body: JSON.stringify(body), // Transform the body to JSON
      }),
    );

    // Process the token request
    const oauthResponse =
      await authorizationServer.respondToAccessTokenRequest(oauthRequest);

    // Adapt the response back to Next.js
    const vanillaResponse = responseToVanilla(oauthResponse);

    // Get content type
    const contentType = vanillaResponse.headers.get("content-type");
    let responseData;

    const rawResponse = await vanillaResponse.text();

    if (contentType?.includes("application/json")) {
      try {
        responseData = JSON.parse(rawResponse);

        // Validate expected response shape
        if (typeof responseData !== "object" || responseData === null) {
          throw new Error("Invalid JSON response structure");
        }
      } catch (parseError) {
        console.error("JSON Parse error:", parseError);
        // Fall back to raw response
        responseData = rawResponse;
      }
    } else {
      // Handle as raw response
      responseData = rawResponse;
    }

    const response = NextResponse.json(responseData, {
      status: vanillaResponse.status,
      headers: {
        "Content-Type": contentType || "application/json",
      },
    });

    // Copy other headers
    vanillaResponse.headers.forEach((value: string, key: string) => {
      if (key.toLowerCase() !== "content-type") {
        response.headers.set(key, value);
      }
    });

    return response;
  } catch (error: unknown) {
    // Log the error for debugging
    if (error instanceof Error) {
      console.error("Token error:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error("Unknown error", error);
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 },
    );
  }
}
