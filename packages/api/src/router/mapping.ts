import type { TRPCRouterRecord } from "@trpc/server";
import { sql } from "kysely";
import { z } from "zod";

import { protectedProcedure } from "../trpc";

export const mappingRouter = {
  populationsFromHex: protectedProcedure
    .input(
      z.object({
        hex: z.string().regex(/^[0-9a-f]{15}$/i, "Invalid H3 hex string"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { hex } = input;

      try {
        const result = (await ctx.db
          // Define temporary tables for types
          .withTables<{
            "res4_geom": {
              geom: string;
            },
            "res8_hexes": 
            {
              hex: string;
              population: number;
            }
            aggregated_hexes: {
              parent_hex: string;
              resolution: number;
              population: number;
            }
          }>()
          .with("res4_geom", (db) =>
            db
              .selectFrom(
                sql`ST_Transform(h3_cell_to_boundary_geometry(${hex}::h3index), 3857)`.as(
                  "geom",
                ),
              )
              .selectAll(),
          )
          .with("res8_hexes", (db) =>
            db
              .selectFrom("population as p")
              .innerJoin("res4_geom", (join) =>
                join.on(sql`ST_Intersects(res4_geom.geom, p.geom)`),
              )
              .where(
                sql`ST_Area(ST_Intersection(res4_geom.geom, p.geom)) / ST_Area(p.geom)`,
                ">",
                0.001,
              )
              .select(["p.h3 as hex", "p.population"])
          )
          .with("aggregated_hexes", (db) =>
            db
              .selectFrom("res8_hexes as p")
              .select([
                
                sql`${hex}::h3index`.as("parent_hex"),
                sql`4`.as("resolution"),
                sql`SUM(p.population)`.as("population"),
              ])
              .unionAll(
                db
                  .selectFrom("res8_hexes")
                  .select([
                    sql`h3_cell_to_parent(hex::h3index, 5)`.as("parent_hex"),
                    sql`5`.as("resolution"),
                    sql`SUM(population)`.as("population"),
                  ])
                  .groupBy("parent_hex"),
              )
              .unionAll(
                db
                  .selectFrom("res8_hexes")
                  .select([
                    sql`h3_cell_to_parent(hex::h3index, 6)`.as("parent_hex"),
                    sql`6`.as("resolution"),
                    sql`SUM(population)`.as("population"),
                  ])
                  .groupBy("parent_hex"),
              )
              .unionAll(
                db
                  .selectFrom("res8_hexes")
                  .select([
                    sql`h3_cell_to_parent(hex::h3index, 7)`.as("parent_hex"),
                    sql`7`.as("resolution"),
                    sql`SUM(population)`.as("population"),
                  ])
                  .groupBy("parent_hex"),
              )
              .unionAll(
                db
                  .selectFrom("res8_hexes")
                  .select([
                    sql`hex`.as("parent_hex"),
                    sql`8`.as("resolution"),
                    "population",
                  ]),
              )
          )
          .selectFrom("aggregated_hexes")
          .select(["parent_hex as hex", "resolution", "population"])
          .orderBy("resolution")
          .orderBy("hex")
          .execute());

        return result;
      } catch (e) {
        console.error("Error executing query:", e);
        throw e;
      }
    }),
} satisfies TRPCRouterRecord;
