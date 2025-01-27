import type { Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .alterTable("resources")
    .addColumn("hot_score", "real", (col) => col.notNull().defaultTo(0))
    .addColumn("rising_score", "real", (col) => col.notNull().defaultTo(0))
    .addColumn("votes", "integer", (col) => col.notNull().defaultTo(1))
    .execute();

  await db.schema
    .createIndex("resource_hot_score_idx")
    .on("resources")
    .column("hot_score")
    .execute();

  await db.schema
    .createIndex("resource_rising_score_idx")
    .on("resources")
    .column("rising_score")
    .execute();

  await db.schema
    .createIndex("resource_votes_created_at_idx")
    .on("resource_votes")
    .column("created_at")
    .execute();

  await db.schema
    .createIndex("resource_votes_resource_id_idx")
    .on("resource_votes")
    .column("resource_id")
    .execute();

  await db.schema
    .createIndex("resource_votes_user_id_idx")
    .on("resource_votes")
    .column("user_id")
    .execute();

  await db.schema
    .createIndex("resource_votes_resource_id_created_at_idx")
    .on("resource_votes")
    .columns(["resource_id", "created_at"])
    .execute();

  await db.schema
    .createIndex("resource_votes_idx")
    .on("resources")
    .column("votes")
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .dropIndex("resource_votes_resource_id_created_at_idx")
    .execute();
  await db.schema.dropIndex("resource_votes_user_id_idx").execute();
  await db.schema.dropIndex("resource_votes_resource_id_idx").execute();
  await db.schema.dropIndex("resource_votes_created_at_idx").execute();
  await db.schema.dropIndex("resource_rising_score_idx").execute();
  await db.schema.dropIndex("resource_hot_score_idx").execute();

  await db.schema
    .alterTable("resources")
    .dropColumn("hot_score")
    .dropColumn("rising_score")
    .dropColumn("votes")
    .execute();
}
