import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  // Resources table
  await db.schema
    .createTable("resources")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("type", "text", (col) =>
      col.notNull().check(sql`type IN ('link', 'text', 'video', 'image')`),
    )
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("body", "text")
    .addColumn("url", "text")
    .addColumn("canonical_url", "text")
    .addColumn("image", "text")
    .addColumn("shared_by", "uuid", (col) =>
      col.notNull().references("users.id"),
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Resource votes table
  await db.schema
    .createTable("resource_votes")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("user_id", "uuid", (col) => col.notNull().references("users.id"))
    .addColumn("resource_id", "uuid", (col) =>
      col.notNull().references("resources.id"),
    )
    .addColumn("vote", "integer", (col) =>
      col.notNull().check(sql`vote IN (-1, 0, 1)`),
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Resource bookmarks table
  await db.schema
    .createTable("resource_bookmarks")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("user_id", "uuid", (col) => col.notNull().references("users.id"))
    .addColumn("resource_id", "uuid", (col) =>
      col.notNull().references("resources.id"),
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Resource domain areas table
  await db.schema
    .createTable("resource_domain_areas")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("resource_id", "uuid", (col) =>
      col.notNull().references("resources.id"),
    )
    .addColumn("domain_area_id", "uuid", (col) =>
      col.notNull().references("domain_areas.id"),
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Reports table
  await db.schema
    .createTable("reports")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("user_id", "uuid", (col) => col.notNull().references("users.id"))
    .addColumn("reported_id", "uuid", (col) => col.notNull())
    .addColumn("reported_type", "text", (col) =>
      col.notNull().check(sql`reported_type IN ('user', 'resource', 'action')`),
    )
    .addColumn("reason", "text", (col) =>
      col
        .notNull()
        .check(
          sql`reason IN ('spam', 'inappropriate', 'other', 'misinformation', 'disinformation', 'harassment', 'hate_speech', 'violence', 'self_harm')`,
        ),
    )
    .addColumn("reason_details", "text")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Add indexes
  await db.schema
    .createIndex("resources_shared_by_idx")
    .on("resources")
    .column("shared_by")
    .execute();

  await db.schema
    .createIndex("resource_votes_user_resource_idx")
    .on("resource_votes")
    .columns(["user_id", "resource_id"])
    .unique()
    .execute();

  await db.schema
    .createIndex("resource_bookmarks_user_resource_idx")
    .on("resource_bookmarks")
    .columns(["user_id", "resource_id"])
    .unique()
    .execute();

  await db.schema
    .createIndex("resource_domain_areas_idx")
    .on("resource_domain_areas")
    .columns(["resource_id", "domain_area_id"])
    .unique()
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  // Drop tables in reverse order
  await db.schema.dropTable("resource_domain_areas").execute();
  await db.schema.dropTable("resource_bookmarks").execute();
  await db.schema.dropTable("resource_votes").execute();
  await db.schema.dropTable("resources").execute();
}
