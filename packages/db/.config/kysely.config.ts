import { CamelCasePlugin, PostgresDialect } from "kysely";
import { defineConfig } from "kysely-ctl";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from 'ws';

// We need to provide a constructor for WebSocket connections in Node.js environments
// See: https://neon.tech/docs/serverless/serverless-driver#pool-and-client-usage-notes
neonConfig.webSocketConstructor = ws;

export default defineConfig({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // Required for Neon connections
      },
    }),
  }),
  migrations: {
    migrationFolder: "migrations",
  },
  plugins: [new CamelCasePlugin()],
  seeds: {
    seedFolder: "seeds",
  },
});
