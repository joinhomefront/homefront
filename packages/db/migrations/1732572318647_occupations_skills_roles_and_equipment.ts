import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  // Domain Areas
  await db.schema
    .createTable("domain_areas")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Roles
  await db.schema
    .createTable("roles")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("priority", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Role Domain Areas
  await db.schema
    .createTable("role_domain_areas")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("role_id", "uuid", (col) => col.notNull().references("roles.id"))
    .addColumn("domain_area_id", "uuid", (col) =>
      col.notNull().references("domain_areas.id"),
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Users Roles
  await db.schema
    .createTable("user_roles")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("user_id", "uuid", (col) => col.notNull().references("users.id"))
    .addColumn("role_id", "uuid", (col) => col.notNull().references("roles.id"))
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Skills
  await db.schema
    .createTable("skills")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Skill Domain Areas
  await db.schema
    .createTable("skill_domain_areas")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("skill_id", "uuid", (col) =>
      col.notNull().references("skills.id"),
    )
    .addColumn("domain_area_id", "uuid", (col) =>
      col.notNull().references("domain_areas.id"),
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // User Skills
  await db.schema
    .createTable("user_skills")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("level", "text")
    .addColumn("user_id", "uuid", (col) => col.notNull().references("users.id"))
    .addColumn("skill_id", "uuid", (col) =>
      col.notNull().references("skills.id"),
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Occupations
  await db.schema
    .createTable("occupations")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("onet_title", "text")
    .addColumn("onet_soc_code", "text")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Occupation Titles
  await db.schema
    .createTable("occupation_titles")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("onet_title", "text", (col) => col.notNull())
    .addColumn("onet_soc_code", "text", (col) => col.notNull())
    .addColumn("occupation_id", "uuid", (col) =>
      col.notNull().references("occupations.id"),
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // User Occupations
  await db.schema
    .createTable("user_occupations")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("user_id", "uuid", (col) => col.notNull().references("users.id"))
    .addColumn("occupation_id", "uuid", (col) =>
      col.notNull().references("occupations.id"),
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Occupation Skills
  await db.schema
    .createTable("occupation_skills")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("level", "text")
    .addColumn("occupation_id", "uuid", (col) =>
      col.notNull().references("occupations.id"),
    )
    .addColumn("skill_id", "uuid", (col) =>
      col.notNull().references("skills.id"),
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Role Skills
  await db.schema
    .createTable("role_skills")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("level", "text")
    .addColumn("level_required", "boolean")
    .addColumn("role_id", "uuid", (col) => col.notNull().references("roles.id"))
    .addColumn("skill_id", "uuid", (col) =>
      col.notNull().references("skills.id"),
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Equipment
  await db.schema
    .createTable("equipment")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("onet_title", "text")
    .addColumn("onet_code", "text")
    .addColumn("onet_example_commodity", "text")
    .addColumn("onet_soce_code", "text")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // User Equipment
  await db.schema
    .createTable("user_equipment")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("quantity", "integer")
    .addColumn("user_id", "uuid", (col) => col.notNull().references("users.id"))
    .addColumn("equipment_id", "uuid", (col) =>
      col.notNull().references("equipment.id"),
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .execute();

  // Add indexes after creating tables

  // Indexes for domain_areas
  await db.schema
    .createIndex("domain_areas_title_idx")
    .on("domain_areas")
    .column("title")
    .unique()
    .execute();

  // Indexes for equipment
  await db.schema
    .createIndex("equipment_title_idx")
    .on("equipment")
    .column("title")
    .unique()
    .execute();

  // Indexes for occupations
  await db.schema
    .createIndex("occupations_title_idx")
    .on("occupations")
    .column("title")
    .unique()
    .execute();
  await db.schema
    .createIndex("occupations_onet_soc_code_idx")
    .on("occupations")
    .column("onet_soc_code")
    .execute();

  // Indexes for occupation_skills
  await db.schema
    .createIndex("occupation_skills_occupation_id_idx")
    .on("occupation_skills")
    .column("occupation_id")
    .execute();
  await db.schema
    .createIndex("occupation_skills_skill_id_idx")
    .on("occupation_skills")
    .column("skill_id")
    .execute();
  await db.schema
    .createIndex("occupation_skills_occupation_skill_unique_idx")
    .on("occupation_skills")
    .columns(["occupation_id", "skill_id"])
    .unique()
    .execute();

  // Indexes for occupation_titles
  await db.schema
    .createIndex("occupation_titles_occupation_id_idx")
    .on("occupation_titles")
    .column("occupation_id")
    .execute();
  await db.schema
    .createIndex("occupation_titles_onet_soc_code_idx")
    .on("occupation_titles")
    .column("onet_soc_code")
    .execute();
  await db.schema
    .createIndex("occupation_titles_title_idx")
    .on("occupation_titles")
    .column("title")
    .unique()
    .execute();

  // Indexes for roles
  await db.schema
    .createIndex("roles_title_idx")
    .on("roles")
    .column("title")
    .unique()
    .execute();

  // Indexes for role_domain_areas
  await db.schema
    .createIndex("role_domain_areas_role_id_idx")
    .on("role_domain_areas")
    .column("role_id")
    .execute();
  await db.schema
    .createIndex("role_domain_areas_domain_area_id_idx")
    .on("role_domain_areas")
    .column("domain_area_id")
    .execute();
  await db.schema
    .createIndex("role_domain_areas_role_domain_area_unique_idx")
    .on("role_domain_areas")
    .columns(["role_id", "domain_area_id"])
    .unique()
    .execute();

  // Indexes for role_skills
  await db.schema
    .createIndex("role_skills_role_id_idx")
    .on("role_skills")
    .column("role_id")
    .execute();
  await db.schema
    .createIndex("role_skills_skill_id_idx")
    .on("role_skills")
    .column("skill_id")
    .execute();
  await db.schema
    .createIndex("role_skills_role_skill_unique_idx")
    .on("role_skills")
    .columns(["role_id", "skill_id"])
    .unique()
    .execute();

  // Indexes for skills
  await db.schema
    .createIndex("skills_title_idx")
    .on("skills")
    .column("title")
    .unique()
    .execute();

  // Indexes for skill_domain_areas
  await db.schema
    .createIndex("skill_domain_areas_skill_id_idx")
    .on("skill_domain_areas")
    .column("skill_id")
    .execute();
  await db.schema
    .createIndex("skill_domain_areas_domain_area_id_idx")
    .on("skill_domain_areas")
    .column("domain_area_id")
    .execute();
  await db.schema
    .createIndex("skill_domain_areas_skill_domain_area_unique_idx")
    .on("skill_domain_areas")
    .columns(["skill_id", "domain_area_id"])
    .unique()
    .execute();

  // Indexes for user_equipment
  await db.schema
    .createIndex("user_equipment_user_id_idx")
    .on("user_equipment")
    .column("user_id")
    .execute();
  await db.schema
    .createIndex("user_equipment_equipment_id_idx")
    .on("user_equipment")
    .column("equipment_id")
    .execute();
  await db.schema
    .createIndex("user_equipment_user_equipment_unique_idx")
    .on("user_equipment")
    .columns(["user_id", "equipment_id"])
    .unique()
    .execute();

  // Indexes for user_occupations
  await db.schema
    .createIndex("user_occupations_user_id_idx")
    .on("user_occupations")
    .column("user_id")
    .execute();
  await db.schema
    .createIndex("user_occupations_occupation_id_idx")
    .on("user_occupations")
    .column("occupation_id")
    .execute();
  await db.schema
    .createIndex("user_occupations_user_occupation_unique_idx")
    .on("user_occupations")
    .columns(["user_id", "occupation_id"])
    .unique()
    .execute();

  // Indexes for user_roles
  await db.schema
    .createIndex("user_roles_user_id_idx")
    .on("user_roles")
    .column("user_id")
    .execute();
  await db.schema
    .createIndex("user_roles_role_id_idx")
    .on("user_roles")
    .column("role_id")
    .execute();
  await db.schema
    .createIndex("user_roles_user_role_unique_idx")
    .on("user_roles")
    .columns(["user_id", "role_id"])
    .unique()
    .execute();

  // Indexes for user_skills
  await db.schema
    .createIndex("user_skills_user_id_idx")
    .on("user_skills")
    .column("user_id")
    .execute();
  await db.schema
    .createIndex("user_skills_skill_id_idx")
    .on("user_skills")
    .column("skill_id")
    .execute();
  await db.schema
    .createIndex("user_skills_user_skill_unique_idx")
    .on("user_skills")
    .columns(["user_id", "skill_id"])
    .unique()
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  // Drop indexes before dropping tables
  await db.schema.dropIndex("domain_areas_title_idx").execute();
  await db.schema.dropIndex("equipment_title_idx").execute();
  await db.schema.dropIndex("occupations_onet_soc_code_idx").execute();
  await db.schema.dropIndex("occupations_title_idx").execute();
  await db.schema.dropIndex("occupation_skills_occupation_id_idx").execute();
  await db.schema
    .dropIndex("occupation_skills_occupation_skill_unique_idx")
    .execute();
  await db.schema.dropIndex("occupation_skills_skill_id_idx").execute();
  await db.schema.dropIndex("occupation_titles_occupation_id_idx").execute();
  await db.schema.dropIndex("occupation_titles_onet_soc_code_idx").execute();
  await db.schema.dropIndex("occupation_titles_title_idx").execute();
  await db.schema.dropIndex("role_domain_areas_domain_area_id_idx").execute();
  await db.schema
    .dropIndex("role_domain_areas_role_domain_area_unique_idx")
    .execute();
  await db.schema.dropIndex("role_domain_areas_role_id_idx").execute();
  await db.schema.dropIndex("role_skills_role_id_idx").execute();
  await db.schema.dropIndex("role_skills_role_skill_unique_idx").execute();
  await db.schema.dropIndex("role_skills_skill_id_idx").execute();
  await db.schema.dropIndex("roles_title_idx").execute();
  await db.schema.dropIndex("skills_title_idx").execute();
  await db.schema.dropIndex("skill_domain_areas_skill_id_idx").execute();
  await db.schema.dropIndex("skill_domain_areas_domain_area_id_idx").execute();
  await db.schema
    .dropIndex("skill_domain_areas_skill_domain_area_unique_idx")
    .execute();
  await db.schema.dropIndex("user_equipment_user_id_idx").execute();
  await db.schema.dropIndex("user_equipment_equipment_id_idx").execute();
  await db.schema
    .dropIndex("user_equipment_user_equipment_unique_idx")
    .execute();
  await db.schema.dropIndex("user_occupations_occupation_id_idx").execute();
  await db.schema.dropIndex("user_occupations_user_id_idx").execute();
  await db.schema
    .dropIndex("user_occupations_user_occupation_unique_idx")
    .execute();
  await db.schema.dropIndex("user_skills_skill_id_idx").execute();
  await db.schema.dropIndex("user_skills_user_id_idx").execute();
  await db.schema.dropIndex("user_skills_user_skill_unique_idx").execute();
  await db.schema.dropIndex("user_roles_role_id_idx").execute();
  await db.schema.dropIndex("user_roles_user_id_idx").execute();
  await db.schema.dropIndex("user_roles_user_role_unique_idx").execute();

  // Drop tables

  // Join tables
  await db.schema.dropTable("occupation_skills").execute();
  await db.schema.dropTable("occupation_titles").execute();
  await db.schema.dropTable("role_domain_areas").execute();
  await db.schema.dropTable("role_skills").execute();
  await db.schema.dropTable("skill_domain_areas").execute();
  await db.schema.dropTable("user_equipment").execute();
  await db.schema.dropTable("user_occupations").execute();
  await db.schema.dropTable("user_skills").execute();
  await db.schema.dropTable("user_roles").execute();

  // Main tables
  await db.schema.dropTable("domain_areas").execute();
  await db.schema.dropTable("equipment").execute();
  await db.schema.dropTable("occupations").execute();
  await db.schema.dropTable("roles").execute();
  await db.schema.dropTable("skills").execute();
}
