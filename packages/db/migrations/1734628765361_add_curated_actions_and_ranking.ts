import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable("curated_actions")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("action_id", "uuid", (col) =>
      col.notNull().references("actions.id"),
    )
    .addColumn("position", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
		.addUniqueConstraint("curated_actions_action_id_unique_idx", ["action_id"])
		.addUniqueConstraint("curated_actions_position_unique_idx", ["position"])
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable("curated_actions").execute();
}
