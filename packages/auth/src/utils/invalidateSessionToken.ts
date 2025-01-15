import { db } from "@homefront/db";

import { KyselyAdapter } from "../adapters/kysely";

export const adapter = KyselyAdapter(db);

export const invalidateSessionToken = async (token: string) => {
  const sessionToken = token.slice("Bearer ".length);
  await adapter.deleteSession(sessionToken);
};
