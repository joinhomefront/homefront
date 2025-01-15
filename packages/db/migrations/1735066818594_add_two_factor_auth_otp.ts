import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  // Existing two factor columns
  await db.schema
    .alterTable("users")
    .addColumn("two_factor_enabled", "boolean", (col) =>
      col.notNull().defaultTo(false),
    )
    .addColumn("two_factor_secret", "text")
    .execute();

  // New backup_codes table
  await db.schema
    .createTable("backup_codes")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("user_id", "uuid", (col) =>
      col.notNull().references("users.id").onDelete("cascade"),
    )
    .addColumn("code_hash", "text", (col) => col.notNull())
    .addColumn("used", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("used_at", "timestamp")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Add index for faster lookups
  await db.schema
    .createIndex("backup_codes_user_id_idx")
    .on("backup_codes")
    .column("user_id")
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable("backup_codes").execute();

  await db.schema
    .alterTable("users")
    .dropColumn("two_factor_enabled")
    .dropColumn("two_factor_secret")
    .execute();
}
