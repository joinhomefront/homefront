import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  // Enable the pgcrypto extension for UUID generation
  await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`.execute(db);

  await db.schema
    .createTable("users")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("name", "text")
    .addColumn("username", "text", (col) => col.notNull().unique())
    .addColumn("email", "text")
    .addColumn("email_verified", "timestamp")
    .addColumn("password_hash", "text", (col) => col.notNull())
    .addColumn("image", "text")
    .execute();

  await db.schema
    .createTable("sessions")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("user_id", "uuid", (col) => col.notNull().references("users.id"))
    .addColumn("session_token", "text", (col) => col.notNull().unique())
    .addColumn("expires", "timestamp", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("accounts")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("user_id", "uuid", (col) => col.notNull().references("users.id"))
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("provider", "text", (col) => col.notNull())
    .addColumn("provider_account_id", "text", (col) => col.notNull())
    .addColumn("refresh_token", "text")
    .addColumn("access_token", "text")
    .addColumn("expires_at", "integer")
    .addColumn("token_type", "text")
    .addColumn("scope", "text")
    .addColumn("id_token", "text")
    .addColumn("session_state", "text")
    .execute();

  await db.schema
    .createTable("verification_tokens")
    .addColumn("identifier", "text", (col) => col.primaryKey().notNull())
    .addColumn("token", "text", (col) => col.notNull())
    .addColumn("expires", "timestamp", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable("verification_tokens").execute();
  await db.schema.dropTable("accounts").execute();
  await db.schema.dropTable("sessions").execute();
  await db.schema.dropTable("users").execute();
  await sql`DROP EXTENSION IF EXISTS "pgcrypto"`.execute(db);
}
