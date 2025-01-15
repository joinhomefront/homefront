import type { Kysely } from "kysely";

import type { Database } from "../src";
import { roles } from "./data";

export async function seed(db: Kysely<Database>): Promise<void> {
  // Get domain areas for lookup
  const domainAreas = await db
    .selectFrom("domainAreas")
    .select(["id", "title"])
    .execute();

  const domainAreaMap = new Map(
    domainAreas.map((area) => [area.title, area.id]),
  );

  await db.transaction().execute(async (tx) => {
    // Process each role
    for (const roleData of roles) {
      // Check if role exists
      const existing = await tx
        .selectFrom("roles")
        .where("title", "=", roleData.role)
        .executeTakeFirst();

      if (!existing) {
        // Insert role only if it doesn't exist
        const [role] = await tx
          .insertInto("roles")
          .values({
            title: roleData.role,
            priority: roleData.critical ? "high" : "low",
          })
          .returning("id")
          .execute();

        if (role) {
          // Create domain area associations
          for (const area of roleData.domain_areas) {
            const domainAreaId = domainAreaMap.get(area);
            if (domainAreaId) {
              await tx
                .insertInto("roleDomainAreas")
                .values({
                  roleId: role.id,
                  domainAreaId,
                })
                .execute();
            }
          }
        }
      }
    }
  });
}
