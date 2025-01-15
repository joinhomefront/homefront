import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable("role_occupations")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("role_id", "uuid", (col) => col.notNull().references("roles.id"))
    .addColumn("occupation_id", "uuid", (col) =>
      col.notNull().references("occupations.id"),
    )
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addUniqueConstraint("unique_role_occupation", ["role_id", "occupation_id"])
    .execute();

  await db.schema
    .alterTable("domain_areas")
    .addColumn("slug", "text")
    .execute();

  await sql`UPDATE domain_areas SET slug = replace(lower(title), ' ', '-')`.execute(
    db,
  );

  await db.schema
    .alterTable("domain_areas")
    .addUniqueConstraint("unique_domain_area_slug", ["slug"])
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.alterTable("domain_areas").dropColumn("slug").execute();
  await db.schema.dropTable("role_occupations").execute();
}
