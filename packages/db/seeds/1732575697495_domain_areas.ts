import type { Kysely } from "kysely";

import type { Database } from "../src";
import { domainAreas } from "./data";

export async function seed(db: Kysely<Database>): Promise<void> {
  for (const area of domainAreas) {
    // Check if domain area exists
    const existing = await db
      .selectFrom("domainAreas")
      .where("title", "=", area.title)
      .executeTakeFirst();

    // Only insert if not found
    if (!existing) {
      await db
        .insertInto("domainAreas")
        .values({
          title: area.title,
          slug: area.slug,
        })
        .execute();
    } else {
      await db
        .updateTable("domainAreas")
        .where("id", "=", area.title)
        .set("slug", area.slug)
        .execute();
    }
  }
}
