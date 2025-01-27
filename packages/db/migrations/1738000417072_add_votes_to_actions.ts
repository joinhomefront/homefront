import type { Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .alterTable("actions")
    .addColumn("hot_score", "real", (col) => col.notNull().defaultTo(0))
    .addColumn("rising_score", "real", (col) => col.notNull().defaultTo(0))
    .addColumn("votes", "integer", (col) => col.notNull().defaultTo(1))
    .execute();

  await db.schema
    .createIndex("action_hot_score_idx")
    .on("actions")
    .column("hot_score")
    .execute();

  await db.schema
    .createIndex("action_rising_score_idx")
    .on("actions")
    .column("rising_score")
    .execute();

  await db.schema
    .createIndex("action_votes_created_at_idx")
    .on("action_votes")
    .column("created_at")
    .execute();

  await db.schema
    .createIndex("action_votes_action_id_created_at_idx")
    .on("action_votes")
    .columns(["action_id", "created_at"])
    .execute();

  await db.schema
    .createIndex("action_votes_idx")
    .on("actions")
    .column("votes")
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropIndex("action_votes_action_id_created_at_idx").execute();
  await db.schema.dropIndex("action_votes_created_at_idx").execute();
  await db.schema.dropIndex("action_rising_score_idx").execute();
  await db.schema.dropIndex("action_hot_score_idx").execute();

  await db.schema
    .alterTable("actions")
    .dropColumn("hot_score")
    .dropColumn("rising_score")
    .dropColumn("votes")
    .execute();
}
