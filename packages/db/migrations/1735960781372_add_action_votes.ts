import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable("action_votes")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )

    .addColumn("action_id", "uuid", (col) =>
      col.notNull().references("actions.id"),
    )
    .addColumn("user_id", "uuid", (col) => col.notNull().references("users.id"))
    .addColumn("vote", "integer", (col) =>
      col.defaultTo(0).check(sql`vote IN (-1, 0, 1)`),
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createIndex("action_votes_user_id_idx")
    .on("action_votes")
    .column("user_id")
    .execute();

  await db.schema
    .createIndex("action_votes_action_id_idx")
    .on("action_votes")
    .column("action_id")
    .execute();

  await db.schema
    .createIndex("action_votes_action_id_user_id_idx")
    .on("action_votes")
    .columns(["action_id", "user_id"])
    .unique()
    .execute();

  await db.schema
    .createIndex("action_votes_updated_at_idx")
    .on("action_votes")
    .column("updated_at")
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable("action_votes").execute();
}
