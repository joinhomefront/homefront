import type { AuthConfig } from "@auth/core/types";
import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { skipCSRFCheck } from "@auth/core";
import { decode, encode } from "next-auth/jwt";

import { db } from "@homefront/db";
import { APIErrorSchema, TokenResponseSchema } from "@homefront/validators";

import type { TokenResponse } from "./types";
import { env } from "../env";
import { KyselyAdapter } from "./adapters/kysely";
import homefront from "./providers/homefront";
import sessionCreator from "./providers/session-creator";

export const isSecureContext = env.NODE_ENV !== "development";

const adapter = KyselyAdapter(db);

export const authConfig: NextAuthConfig & AuthConfig = {
  // In development, we need to skip checks to allow Expo to work
  ...(!isSecureContext
    ? {
        skipCSRFCheck: skipCSRFCheck,
        trustHost: true,
      }
    : {}),
  adapter,
  secret: env.AUTH_SECRET,
  providers: [sessionCreator, homefront],
  pages: {
    newUser: "/signup",
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user, account }): Promise<JWT> => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (user && !user.id) {
        throw new TypeError("User ID is required");
      }

      if (account && account.provider === "session-creator") {
        const session = await adapter.createSession({
          expires: new Date(Date.now() + 60 * 1000),
          sessionToken: crypto.randomUUID(),
          userId: user.id ?? "",
        });

        token.user = {
          id: account.providerAccountId,
          role: user.role,
          username: user.username,
        };
        return {
          ...token,
          id: session.sessionToken,
          user: { id: user.id ?? "", username: user.username, role: user.role },
        };
      }
      if (account && account.provider === "homefront" && token.sub) {
        return {
          ...token,
          access_token: account.access_token ?? "",
          expires_at: account.expires_at ?? 0,
          refresh_token: account.refresh_token ?? "",
          user: { id: token.sub, username: user.username, role: user.role },
        };
      }

      // Refresh token if expired
      if (token.expires_at && Date.now() > token.expires_at * 1000) {
        const refreshedToken = await refreshAccessToken(token);
        return {
          ...token,
          ...refreshedToken,
        };
      }

      // Return token if access_token is still valid
      if (token.expires_at && Date.now() < token.expires_at * 1000) {
        return token;
      }

      // Ensure user info is included in the token
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (user && token.sub) {
        return {
          ...token,
          user: { id: token.sub, username: user.username, role: user.role },
        };
      }

      // Default to returning the token
      return token;
    },
    session: ({ session }) => {
      return session;
    },
  },
  cookies: {
    state: {
      name: "authjs.state",
      options: {
        httpOnly: true,
        sameSite: isSecureContext ? "strict" : false,
        secure: isSecureContext,
      },
    },
    sessionToken: {
      name: "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: isSecureContext ? "strict" : false,
        secure: isSecureContext,
      },
    },
  },
  jwt: {
    async encode({ token, salt, secret }) {
      return encode({ token, salt, secret });
    },
    async decode({ token, salt, secret }) {
      return decode({ token, salt, secret });
    },
  },
  session: {
    strategy: "database",
  },
  debug: !isSecureContext,
} satisfies NextAuthConfig;

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BASE_URL}/api/oauth/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: env.AUTH_HOMEFRONT_CLIENT_ID,
          client_secret: env.AUTH_HOMEFRONT_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: token.refresh_token ?? "",
        }),
        credentials: "include",
      },
    );

    if (!response.ok) {
      const error = APIErrorSchema.parse(await response.json());
      throw new Error(error.error ?? "Failed to refresh token");
    }

    const newTokens: TokenResponse = TokenResponseSchema.parse(
      await response.json(),
    );

    return {
      ...token,
      access_token: newTokens.access_token,
      expires_at: newTokens.expires_in
        ? Date.now() + newTokens.expires_in * 1000
        : token.expires_at,
      refresh_token: newTokens.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    console.error("Error refreshing access_token:", error);
    return {
      ...token,
      error: "RefreshTokenError",
    };
  }
};
