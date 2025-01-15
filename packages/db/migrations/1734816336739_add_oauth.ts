import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable("clients")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("secret", "text")
    .addColumn("redirect_uris", "json", (col) => col.notNull())
    .addColumn("scopes", "json", (col) => col.notNull())
    .addColumn("allowed_grants", "json", (col) => col.notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createTable("auth_codes")
    .addColumn("code", "text", (col) => col.notNull().primaryKey())
    .addColumn("redirectUri", "text")
    .addColumn("code_challenge", "text")
    .addColumn("code_challenge_method", "text", (col) => col.defaultTo("plain"))
    .addColumn("expires_at", "timestamp", (col) => col.notNull())
    .addColumn("user_id", "uuid", (col) => col.notNull().references("users.id"))
    .addColumn("client_id", "uuid", (col) =>
      col.notNull().references("clients.id"),
    )
    .addColumn("scopes", "json", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createTable("tokens")
    .addColumn("access_token", "text", (col) => col.notNull().primaryKey())
    .addColumn("access_token_expires_at", "timestamp", (col) => col.notNull())
    .addColumn("refresh_token", "text", (col) => col.unique())
    .addColumn("refresh_token_expires_at", "timestamp")
    .addColumn("client_id", "uuid", (col) =>
      col.notNull().references("clients.id"),
    )
    .addColumn("user_id", "uuid", (col) => col.notNull().references("users.id"))
    .addColumn("scopes", "json", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable("tokens").execute();
  await db.schema.dropTable("auth_codes").execute();
  await db.schema.dropTable("clients").execute();
}
