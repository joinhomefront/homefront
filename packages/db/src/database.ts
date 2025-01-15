import { Pool } from "@neondatabase/serverless";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";

import type { Database } from "./types";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon connections
  },
});

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool }),
  plugins: [new CamelCasePlugin()],
});
