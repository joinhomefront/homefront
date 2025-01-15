import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable("relationships")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("user_id", "uuid", (col) => col.references("users.id").notNull())
    .addColumn("friend_id", "uuid", (col) =>
      col.references("users.id").notNull(),
    )
    .addColumn("status", "text", (col) => col.notNull())
    .addColumn("trust_level", "integer")
    .addColumn("created_from_invite", "boolean", (col) =>
      col.notNull().defaultTo(false),
    )
    .addColumn("invite_created_at", "timestamp")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addUniqueConstraint("unique_relationship", ["user_id", "friend_id"])
		.execute();

  await db.schema
    .createTable("invites")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("code", "text", (col) => col.notNull().unique())
    .addColumn("used", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("user_id", "uuid", (col) => col.references("users.id").notNull())
    .addColumn("expires_at", "timestamp", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable("invites").execute();
  await db.schema.dropTable("relationships").execute();
}
