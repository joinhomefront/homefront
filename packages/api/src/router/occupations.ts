import type { TRPCRouterRecord } from "@trpc/server";
import { sql } from "kysely";
import { z } from "zod";

import { protectedProcedure } from "../trpc";

export const occupationsRouter = {
  search: protectedProcedure
    .input(
      z.object({
        query: z.string().min(2),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { query } = input;

      const words = query.split(" ");
      const matchingOccupations = await ctx.db
        .selectFrom("occupationTitles as ot")
        .innerJoin("occupations as o", "o.id", "ot.occupationId")
        .select([
          "ot.id",
          "ot.title",
          "ot.occupationId",
          "o.title as occupationTitle",
          "o.description as occupationDescription",
          "o.source as occupationSource",
          "o.priority as occupationPriority",
          sql<number>`similarity(ot.title, ${query})`.as("similarityScore"),
          sql<number>`similarity(o.title, ${query})`.as(
            "occupationTitleSimilarity",
          ),
          sql<number>`similarity(o.description, ${query})`.as(
            "occupationDescriptionSimilarity",
          ),
        ])
        .where("o.source", "=", "ESCO")
        .where((eb) =>
          eb.or([
            // Include similarity conditions for ot.title, o.title, and o.description
            sql<boolean>`similarity(ot.title, ${query}) > 0.2`,
            sql<boolean>`similarity(o.title, ${query}) > 0.2`,
            sql<boolean>`similarity(o.description, ${query}) > 0.2`,

            // Include ILIKE conditions for partial matches
            eb.or(
              words.map((word) => sql<boolean>`ot.title ILIKE ${`%${word}%`}`),
            ),
            eb.or(
              words.map((word) => sql<boolean>`o.title ILIKE ${`%${word}%`}`),
            ),
            eb.or(
              words.map(
                (word) => sql<boolean>`o.description ILIKE ${`%${word}%`}`,
              ),
            ),
          ]),
        )
        .orderBy(
          sql`GREATEST(similarity(ot.title, ${query}), similarity(o.title, ${query}), similarity(o.description, ${query})) DESC`,
        ) // Rank by the highest similarity
        .limit(10)
        .execute();

      return matchingOccupations;
    }),
  createUserOccupation: protectedProcedure
    .input(
      z.object({
        occupationId: z.string(),
        title: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { occupationId, title } = input;
      const userId = ctx.session.user.id;

      return await ctx.db.transaction().execute(async (trx) => {
        // Create userOccupation
        const userOccupation = await trx
          .insertInto("userOccupations")
          .values({ occupationId, title, userId })
          .returning(["id", "occupationId", "userId"])
          .executeTakeFirstOrThrow();


        // Get ESSENTIAL occupation skills
        const occupationSkills = await trx
          .selectFrom("occupationSkills")
          .select(["skillId", "level", "escoRelationType"])
          .where("occupationId", "=", occupationId)
          .where("escoRelationType", "=", "essential")
          .execute();

        // Create userSkills for each occupation skill
        if (occupationSkills.length > 0) {
          await trx
            .insertInto("userSkills")
            .values(
              occupationSkills.map((os) => ({
                userId,
                skillId: os.skillId,
                level: os.level,
                createdAt: new Date(),
                updatedAt: new Date(),
              })),
            )
            .onConflict((oc) => oc.columns(["userId", "skillId"]).doNothing())
            .execute();
        }

        return userOccupation;
      });
    }),
  deleteUserOccupation: protectedProcedure
    .input(
      z.object({
        occupationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { occupationId } = input;

      const result = await ctx.db.transaction().execute(async (tx) => {
        const occupationSkills = await tx
          .selectFrom("occupationSkills as os")
          .select(["os.skillId"])
          .where("os.occupationId", "=", occupationId)
          .execute();

        const occupationSkillIds = occupationSkills.map((os) => os.skillId);

        if (occupationSkillIds.length > 0) {
          // Delete associated user skills
          await tx
            .deleteFrom("userSkills")
            .where("userId", "=", ctx.session.user.id)
            .where("skillId", "in", occupationSkillIds)
            .executeTakeFirstOrThrow();
        }

        // Delete the user occupation
        const deleteResult = await tx
          .deleteFrom("userOccupations")
          .where("occupationId", "=", occupationId)
          .where("userId", "=", ctx.session.user.id)
          .executeTakeFirstOrThrow();

        return deleteResult.numDeletedRows > 0;
      });

      return result;
    }),
  getUserOccupations: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const userOccupations = await ctx.db
      .selectFrom("userOccupations")
      .select(["id", "title", "occupationId"])
      .where("userId", "=", userId)
      .execute();

    return userOccupations;
  }),
} satisfies TRPCRouterRecord;
