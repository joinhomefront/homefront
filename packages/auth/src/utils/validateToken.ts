import type { Session as NextAuthSession } from "next-auth";

import { db } from "@homefront/db";

import { KyselyAdapter } from "../adapters/kysely";

export const adapter = KyselyAdapter(db);

export const validateToken = async (
  token: string,
): Promise<NextAuthSession | null> => {
  const sessionToken = token.slice("Bearer ".length);
  const session = await adapter.getSessionAndUser?.(sessionToken);
  return session
    ? {
        user: {
          ...session.user,
        },
        expires: session.session.expires.toISOString(),
      }
    : null;
};
