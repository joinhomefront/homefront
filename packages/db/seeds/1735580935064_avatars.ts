import { promises as fs } from "node:fs";
import { join } from "node:path";
import type { Kysely } from "kysely";
import { sql } from "kysely";

import type { Database } from "../src";


export async function seed(db: Kysely<Database>): Promise<void> {
  try {
    // Read SQL file
    const __dirname = new URL(".", import.meta.url).pathname;
    const sqlPath = join(__dirname, "./sql/avatars.sql");
    const sqlContent = await fs.readFile(sqlPath, "utf-8");

    await sql.raw(sqlContent).execute(db);

    console.log("Successfully seeded avatars");
  } catch (error) {
    console.error("Failed to seed avatars:", error);
    throw error;
  }
}