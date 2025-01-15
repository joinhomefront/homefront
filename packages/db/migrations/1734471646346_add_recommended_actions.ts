import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable("recommended_actions")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("accepted", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("responded_at", "timestamp")
    .addColumn("action_id", "uuid", (col) =>
      col.notNull().references("actions.id"),
    )
    .addColumn("user_id", "uuid", (col) => col.notNull().references("users.id"))
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createIndex("recommended_actions_action_id_idx")
    .on("recommended_actions")
    .column("action_id")
    .execute();

  await db.schema
    .createIndex("recommended_actions_user_id_idx")
    .on("recommended_actions")
    .column("user_id")
    .execute();

  await db.schema
    .createIndex("recommended_actions_action_user_unique_idx")
    .on("recommended_actions")
    .columns(["action_id", "user_id"])
    .unique()
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable("recommended_actions").execute();
}
