import type { Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .alterTable("user_actions")
    .addColumn("position", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .alterTable("recommended_actions")
    .addColumn("position", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex("user_actions_position_user_unique_idx")
    .on("user_actions")
    .columns(["userId", "position"])
    .unique()
    .execute();

  await db.schema
    .createIndex("recommended_actions_position_user_unique_idx")
    .on("recommended_actions")
    .columns(["userId", "position"])
    .unique()
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropIndex("user_actions_position_user_unique_idx").execute();

  await db.schema
    .dropIndex("recommended_actions_position_user_unique_idx")
    .execute();

  await db.schema.alterTable("user_actions").dropColumn("position").execute();

  await db.schema
    .alterTable("recommended_actions")
    .dropColumn("position")
    .execute();
}
