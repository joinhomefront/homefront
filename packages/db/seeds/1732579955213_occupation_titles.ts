import type { Kysely } from "kysely";

import type { Database } from "../src";
import { occupationTitles } from "./data";

export async function seed(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (tx) => {
    for (const titleData of occupationTitles) {
      // Look up related occupation
      const occupation = await tx
        .selectFrom("occupations")
        .select(["id"])
        .where("onetSocCode", "=", titleData.onetSocCode)
        .executeTakeFirst();

      if (occupation) {
        // Check if title exists
        const existing = await tx
          .selectFrom("occupationTitles")
          .where("title", "=", titleData.title)
          .where("occupationId", "=", occupation.id)
          .executeTakeFirst();

        if (!existing) {
          await tx
            .insertInto("occupationTitles")
            .values({
              title: titleData.title,
              onetTitle: titleData.title,
              onetSocCode: titleData.onetSocCode,
              occupationId: occupation.id,
            })
            .execute();
        }
      }
    }
  });
}
