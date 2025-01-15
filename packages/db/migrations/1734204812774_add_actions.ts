import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable("actions")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("status", "text")
    .addColumn("due_date", "timestamp")
    .addColumn("is_due_date_overridable", "boolean")
    .addColumn("due_time", "timestamp")
    .addColumn("is_due_time_overridable", "boolean")
    .addColumn("completed_at", "timestamp")
    .addColumn("created_by", "uuid", (col) => 
      col.notNull().references("users.id"))
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createTable("action_domain_areas")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("action_id", "uuid", (col) =>
      col.notNull().references("actions.id"),
    )
    .addColumn("domain_area_id", "uuid", (col) =>
      col.notNull().references("domain_areas.id"),
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createTable("action_roles")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("action_id", "uuid", (col) =>
      col.notNull().references("actions.id"),
    )
    .addColumn("role_id", "uuid", (col) => col.notNull().references("roles.id"))
    .addColumn("priority", "text")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createTable("action_skills")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("action_id", "uuid", (col) =>
      col.notNull().references("actions.id"),
    )
    .addColumn("skill_id", "uuid", (col) =>
      col.notNull().references("skills.id"),
    )
    .addColumn("level", "text")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createTable("user_actions")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("user_id", "uuid", (col) => col.notNull().references("users.id"))
    .addColumn("action_id", "uuid", (col) =>
      col.notNull().references("actions.id"),
    )
    .addColumn("completed", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("completed_at", "timestamp")
    .addColumn("due_date", "timestamp")
    .addColumn("due_time", "timestamp")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createIndex("actions_title_idx")
    .on("actions")
    .column("title")
    .execute();

  await db.schema
    .createIndex("actions_created_by_idx")
    .on("actions")
    .column("created_by")
    .execute();

  await db.schema
    .createIndex("action_roles_action_id_idx")
    .on("action_roles")
    .column("action_id")
    .execute();

  await db.schema
    .createIndex("action_roles_role_id_idx")
    .on("action_roles")
    .column("role_id")
    .execute();

  await db.schema
    .createIndex("action_skills_action_id_idx")
    .on("action_skills")
    .column("action_id")
    .execute();

  await db.schema
    .createIndex("action_skills_skill_id_idx")
    .on("action_skills")
    .column("skill_id")
    .execute();

  await db.schema
    .createIndex("action_domain_areas_action_id_idx")
    .on("action_domain_areas")
    .column("action_id")
    .execute();

  await db.schema
    .createIndex("action_domain_areas_domain_area_id_idx")
    .on("action_domain_areas")
    .column("domain_area_id")
    .execute();

  await db.schema
    .createIndex("user_actions_user_id_idx")
    .on("user_actions")
    .column("user_id")
    .execute();

  await db.schema
    .createIndex("user_actions_action_id_idx")
    .on("user_actions")
    .column("action_id")
    .execute();

  await db.schema
    .createIndex("action_domain_areas_unique_idx")
    .on("action_domain_areas")
    .columns(["action_id", "domain_area_id"])
    .unique()
    .execute();

  await db.schema
    .createIndex("action_roles_unique_idx")
    .on("action_roles")
    .columns(["action_id", "role_id"])
    .unique()
    .execute();

  await db.schema
    .createIndex("action_skills_unique_idx")
    .on("action_skills")
    .columns(["action_id", "skill_id"])
    .unique()
    .execute();

  await db.schema
    .createIndex("user_actions_unique_idx")
    .on("user_actions")
    .columns(["user_id", "action_id"])
    .unique()
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable("user_actions").execute();
  await db.schema.dropTable("action_skills").execute();
  await db.schema.dropTable("action_roles").execute();
  await db.schema.dropTable("action_domain_areas").execute();
  await db.schema.dropTable("actions").execute();
}
