import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`CREATE EXTENSION IF NOT EXISTS "pg_trgm"`.execute(db);

  await sql`CREATE INDEX domain_areas_title_trgm_idx ON domain_areas USING gin (title gin_trgm_ops)`.execute(
    db,
  );
  await sql`CREATE INDEX occupations_title_trgm_idx ON occupations USING gin (title gin_trgm_ops)`.execute(
    db,
  );
  await sql`CREATE INDEX occupation_titles_title_trgm_idx ON occupation_titles USING gin (title gin_trgm_ops)`.execute(
    db,
  );
  await sql`CREATE INDEX roles_title_trgm_idx ON roles USING gin (title gin_trgm_ops)`.execute(
    db,
  );
  await sql`CREATE INDEX skills_title_trgm_idx ON skills USING gin (title gin_trgm_ops)`.execute(
    db,
  );
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropIndex("domain_areas_title_trgm_idx").execute();
  await db.schema.dropIndex("occupations_title_trgm_idx").execute();
  await db.schema.dropIndex("occupation_titles_title_trgm_idx").execute();
  await db.schema.dropIndex("roles_title_trgm_idx").execute();
  await db.schema.dropIndex("skills_title_trgm_idx").execute();

  await sql`DROP EXTENSION IF EXISTS "pg_trgm"`.execute(db);
}
