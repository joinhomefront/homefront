import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .alterTable("accounts")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .alterTable("sessions")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .alterTable("users")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .alterTable("verification_tokens")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createIndex("accounts_provider_provider_account_unique_idx")
    .on("accounts")
    .columns(["provider", "provider_account_id"])
    .unique()
    .execute();

  await db.schema
    .createIndex("accounts_user_id_idx")
    .on("accounts")
    .column("user_id")
    .execute();

  await db.schema
    .createIndex("sessions_session_token_idx")
    .on("sessions")
    .column("session_token")
    .execute();

  await db.schema
    .createIndex("sessions_user_id_idx")
    .on("sessions")
    .column("user_id")
    .execute();

  await db.schema
    .createIndex("users_email_idx")
    .on("users")
    .column("email")
    .execute();

  await db.schema
    .createIndex("users_username_idx")
    .on("users")
    .column("username")
    .execute();

  await db.schema
    .createIndex("verification_tokens_identifier_token_idx")
    .on("verification_tokens")
    .columns(["identifier", "token"])
    .unique()
    .execute();

  await db.schema
    .createIndex("verification_tokens_expires_idx")
    .on("verification_tokens")
    .column("expires")
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .dropIndex("verification_tokens_expires_idx")
    .on("verification_tokens")
    .execute();
  await db.schema
    .dropIndex("verification_tokens_identifier_token_idx")
    .on("verification_tokens")
    .execute();
  await db.schema.dropIndex("users_username_idx").on("users").execute();
  await db.schema.dropIndex("users_email_idx").on("users").execute();
  await db.schema.dropIndex("sessions_user_id_idx").on("sessions").execute();
  await db.schema
    .dropIndex("sessions_session_token_idx")
    .on("sessions")
    .execute();
  await db.schema.dropIndex("accounts_user_id_idx").on("accounts").execute();
  await db.schema
    .dropIndex("accounts_provider_provider_account_unique_idx")
    .on("accounts")
    .execute();

  await db.schema
    .alterTable("accounts")
    .dropColumn("created_at")
    .dropColumn("updated_at")
    .execute();

  await db.schema
    .alterTable("sessions")
    .dropColumn("created_at")
    .dropColumn("updated_at")
    .execute();

  await db.schema
    .alterTable("users")
    .dropColumn("created_at")
    .dropColumn("updated_at")
    .execute();

  await db.schema
    .alterTable("verification_tokens")
    .dropColumn("created_at")
    .dropColumn("updated_at")
    .execute();
}
