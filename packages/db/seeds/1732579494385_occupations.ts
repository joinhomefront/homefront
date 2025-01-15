import type { Kysely } from "kysely";

import type { Database } from "../src";
import { occupations } from "./data";

export async function seed(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (tx) => {
    for (const occupationData of occupations) {
      // Check if occupation exists
      const existing = await tx
        .selectFrom("occupations")
        .where("onetSocCode", "=", occupationData.onetSocCode)
        .executeTakeFirst();

      if (!existing) {
        await tx
          .insertInto("occupations")
          .values({
            title: occupationData.onetTitle,
            description: occupationData.description,
            onetTitle: occupationData.onetTitle,
            onetSocCode: occupationData.onetSocCode,
          })
          .execute();
      }
    }
  });
}
