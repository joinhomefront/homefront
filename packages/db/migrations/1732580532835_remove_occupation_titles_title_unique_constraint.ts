import type { Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  // Drop existing unique index
  await db.schema.dropIndex("occupation_titles_title_idx").execute();

  // Recreate as non-unique index
  await db.schema
    .createIndex("occupation_titles_title_idx")
    .on("occupation_titles")
    .column("title")
    .execute();
}

export async function down(_db: Kysely<unknown>): Promise<void> {
  // Do nothing, since we can't restore the unique constraint
}
