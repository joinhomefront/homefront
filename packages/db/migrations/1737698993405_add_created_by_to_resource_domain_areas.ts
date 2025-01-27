import type { Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .alterTable("resource_domain_areas")
    .addColumn("created_by", "uuid", (col) =>
      col.notNull().references("users.id"),
    )
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .alterTable("resource_domain_areas")
    .dropColumn("created_by")
    .execute();
}
