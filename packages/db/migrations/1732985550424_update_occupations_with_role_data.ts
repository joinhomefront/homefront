import type { Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .alterTable("occupations")
    .addColumn("operational_conditions", "jsonb")
    .addColumn("role_justification", "text")
    .addColumn("relevance", "text")
    .addColumn("priority", "text")
    .execute();

  await db.schema
    .createIndex("occupations_relevance_idx")
    .on("occupations")
    .column("relevance")
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropIndex("occupations_relevance_idx").execute();

  await db.schema
    .alterTable("occupations")
    .dropColumn("operational_conditions")
    .dropColumn("role_justification")
    .dropColumn("relevance")
    .dropColumn("priority")
    .execute();
}
