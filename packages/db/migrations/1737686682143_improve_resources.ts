import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .alterTable("resources")
    .addColumn("url_hash", "text")
    .execute();

  await db.schema
    .alterTable("resources")
    .addColumn("metadata", "jsonb")
    .execute();

  await db.schema
    .createIndex("resources_url_hash_idx")
    .on("resources")
    .column("url_hash")
    .unique()
    .where(sql.ref("type"), "=", "link")
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.alterTable("resources").dropColumn("metadata").execute();
  await db.schema.alterTable("resources").dropColumn("url_hash").execute();
}
