import type { Kysely } from 'kysely'
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`
    ALTER TABLE occupation_titles 
    ALTER COLUMN onet_title DROP NOT NULL,
    ALTER COLUMN onet_soc_code DROP NOT NULL
  `.execute(db)
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await sql`
    ALTER TABLE occupation_titles 
    ALTER COLUMN onet_title SET NOT NULL,
    ALTER COLUMN onet_soc_code SET NOT NULL
  `.execute(db)
}
