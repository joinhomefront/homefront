import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`CREATE EXTENSION IF NOT EXISTS "postgis"`.execute(db);
  await sql`CREATE EXTENSION IF NOT EXISTS "postgis_raster" CASCADE`.execute(db);
	await sql`CREATE EXTENSION IF NOT EXISTS "postgis_tiger_geocoder" CASCADE`.execute(db);
  await sql`CREATE EXTENSION IF NOT EXISTS "pgrouting"`.execute(db);
  await sql`CREATE EXTENSION IF NOT EXISTS "h3" CASCADE`.execute(db);
	await sql`CREATE EXTENSION IF NOT EXISTS "h3_postgis" CASCADE`.execute(db);
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await sql`DROP EXTENSION IF EXISTS "h3_postgis"`.execute(db);
	await sql`DROP EXTENSION IF EXISTS "h3"`.execute(db);
	await sql`DROP EXTENSION IF EXISTS "pgrouting"`.execute(db);
	await sql`DROP EXTENSION IF EXISTS "postgis_tiger_geocoder"`.execute(db);
	await sql`DROP EXTENSION IF EXISTS "postgis_raster"`.execute(db);
	await sql`DROP EXTENSION IF EXISTS "postgis"`.execute(db);
}
