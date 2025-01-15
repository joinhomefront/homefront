import { promises as fs } from "fs";
import * as path from "path";
import { neonConfig, Pool } from "@neondatabase/serverless";
import {
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
} from "kysely";
import ws from "ws";

import { Database } from "./src";

// We need to provide a constructor for WebSocket connections in Node.js environments
// See: https://neon.tech/docs/serverless/serverless-driver#pool-and-client-usage-notes
neonConfig.webSocketConstructor = ws;

export async function migrate() {
  try {
    const db = new Kysely<Database>({
      dialect: new PostgresDialect({
        pool: new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false, // Required for Neon connections
          },
        }),
      }),
    });

    const migrator = new Migrator({
      db,
      provider: new FileMigrationProvider({
        fs,
        path,
        migrationFolder: path.join(__dirname, "migrations"),
      }),
    });

    const { error, results } = await migrator.migrateToLatest();

    results?.forEach((it) => {
      if (it.status === "Success") {
        console.log(
          `migration "${it.migrationName}" was executed successfully`,
        );
      } else if (it.status === "Error") {
        console.error(`failed to execute migration "${it.migrationName}"`);
      }
    });

    if (error) {
      console.error("failed to migrate");
      console.error(error);
      process.exit(1);
    }

    await db.destroy();
  } catch (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }
}
