import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  // Add new columns to skills
  await db.schema
    .alterTable("skills")
    .addColumn("esco_title", "text")
    .addColumn("esco_description", "text")
    .addColumn("esco_skill_type", "text")
    .addColumn("esco_concept_uri", "text")
    .addColumn("is_esco_preferred_label", "boolean", (col) =>
      col.defaultTo(null),
    )
    .execute();

  // Add new columns to occupations
  await db.schema
    .alterTable("occupations")
    .addColumn("esco_code", "text")
    .addColumn("esco_title", "text")
    .addColumn("esco_description", "text")
    .addColumn("esco_concept_uri", "text")
    .addColumn("source", "text", (col) => col.notNull().defaultTo("O*NET"))
    .execute();

  // Add new columns to occupation_titles
  await db.schema
    .alterTable("occupation_titles")
    .addColumn("esco_code", "text")
    .addColumn("esco_title", "text")
    .addColumn("esco_concept_uri", "text")
    .addColumn("source", "text", (col) => col.notNull().defaultTo("O*NET"))
    .execute();

  // Add new columns to occupation_skills
  await db.schema
    .alterTable("occupation_skills")
    .addColumn("esco_relation_type", "text")
    .addColumn("esco_skill_type", "text")
    .execute();

  // Create esco_onet_mappings table
  await db.schema
    .createTable("esco_onet_mappings")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("esco_code", "text", (col) => col.notNull())
    .addColumn("esco_title", "text", (col) => col.notNull())
    .addColumn("onet_soc_code", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addUniqueConstraint("unique_esco_onet", [
      "esco_code",
      "esco_title",
      "onet_soc_code",
    ])
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  try {
    // Drop esco_onet_mappings table first
    await db.schema.dropTable("esco_onet_mappings").execute();

    // Remove columns from occupation_skills
    await db.schema
      .alterTable("occupation_skills")
      .dropColumn("esco_relation_type")
      .dropColumn("esco_skill_type")
      .execute();

    // Remove columns from occupation_titles
    await db.schema
      .alterTable("occupation_titles")
      .dropColumn("esco_code")
      .dropColumn("esco_title")
      .dropColumn("esco_concept_uri")
      .dropColumn("source")
      .execute();

    // Remove columns from occupations
    await db.schema
      .alterTable("occupations")
      .dropColumn("esco_code")
      .dropColumn("esco_title")
      .dropColumn("esco_concept_uri")
      .dropColumn("source")
      .execute();

    // Remove columns from skills
    await db.schema
      .alterTable("skills")
      .dropColumn("esco_title")
      .dropColumn("esco_description")
      .dropColumn("esco_skill_type")
      .dropColumn("esco_concept_uri")
      .dropColumn("is_esco_preferred_label")
      .execute();
  } catch (error) {
    console.error("Migration down failed:", error);
    throw error;
  }
}
