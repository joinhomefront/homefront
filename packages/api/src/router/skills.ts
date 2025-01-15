import type { TRPCRouterRecord } from "@trpc/server";
import { sql } from "kysely";
import { z } from "zod";

import { protectedProcedure } from "../trpc";

export const skillsRouter = {
  search: protectedProcedure
    .input(
      z.object({
        query: z.string().min(2),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { query } = input;

      const words = query.split(" ");
      const matchingSkills = await ctx.db
        .selectFrom("skills as s")
        .select([
          "s.id",
          "s.title",
          "s.description",
          sql<number>`similarity(s.title, ${query})`.as("similarityScore"),
        ])
        .where((eb) =>
          eb.or([
            // Include similarity conditions for s.title
            sql<boolean>`similarity(s.title, ${query}) > 0.2`,
            // Include ILIKE conditions for partial matches
            eb.or(
              words.map((word) => sql<boolean>`s.title ILIKE ${`%${word}%`}`),
            ),
          ]),
        )
        .orderBy(sql`similarity(s.title, ${query}) DESC`) // Rank by the highest similarity
        .limit(10)
        .execute();

      return matchingSkills;
    }),

  getUserSkills: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const userSkills = await ctx.db
      .selectFrom("userSkills as us")
      .innerJoin("skills as s", (join) => join.onRef("us.skillId", "=", "s.id"))
      .select([
        "s.id",
        "us.skillId",
        "us.level as userLevel",
        "s.title",
        "s.description",
        sql<boolean>`TRUE`.as("hasSkill"),
      ])
      .where("us.userId", "=", userId)
      .orderBy("s.title")
      .execute();

    return userSkills;
  }),

  recommendedForUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

  const recommendedSkills = await ctx.db
    .selectFrom("skills as s")
    .distinctOn("s.title")
    .innerJoin("occupationSkills as os", "os.skillId", "s.id")
    .innerJoin("userOccupations as uo", "uo.occupationId", "os.occupationId")
    .leftJoin("userSkills as us", (join) => 
      join
        .onRef("us.skillId", "=", "s.id")
        .on("us.userId", "=", userId)
    )
    .select([
      "s.id",
      "s.title", 
      "s.description",
      sql<boolean>`FALSE`.as("hasSkill"),
      sql<string>`NULL`.as("userLevel"),
    ])
    .where("uo.userId", "=", userId)
    .where("us.id", "is", null) // Only get skills user doesn't have
    .orderBy("s.title")
    .execute();


    return recommendedSkills;
  }),
  skillsForOccupation: protectedProcedure
    .input(
      z.object({
        occupationId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { occupationId } = input;

      const skills = await ctx.db
        .selectFrom("skills as s")
        .select(["s.id", "s.title", "s.description"])
        .leftJoin("occupationSkills as os", (join) =>
          join.on("s.id", "=", "os.skillId"),
        )
        .where("os.occupationId", "=", occupationId)
        .execute();

      return skills;
    }),
  createUserSkill: protectedProcedure
    .input(
      z.object({
        skillId: z.string(),
        level: z
          .enum([
            "want_to_learn",
            "learning",
            "beginner",
            "intermediate",
            "expert",
          ])
          .nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { skillId, level } = input;

      const existing = await ctx.db
        .selectFrom("userSkills")
        .where("userId", "=", ctx.session.user.id)
        .where("skillId", "=", skillId)
        .executeTakeFirst();

      if (existing) {
        return existing;
      }

      const userSkill = await ctx.db
        .insertInto("userSkills")
        .values({
          userId: ctx.session.user.id,
          skillId,
          level,
        })
        .returning(["id", "skillId", "userId"])
        .executeTakeFirst();

      return userSkill;
    }),
  updateUserSkill: protectedProcedure
    .input(
      z.object({
        skillId: z.string(),
        level: z
          .enum([
            "want_to_learn",
            "learning",
            "beginner",
            "intermediate",
            "expert",
          ])
          .nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { skillId, level } = input;

      const userSkill = await ctx.db
        .updateTable("userSkills")
        .set("level", level)
        .set("updatedAt", new Date())
        .where("userId", "=", ctx.session.user.id)
        .where("skillId", "=", skillId)
        .returning(["id", "skillId", "userId"])
        .executeTakeFirst();

      return userSkill;
    }),
  deleteUserSkill: protectedProcedure
    .input(
      z.object({
        skillId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { skillId } = input;

      await ctx.db
        .deleteFrom("userSkills")
        .where("userId", "=", ctx.session.user.id)
        .where("skillId", "=", skillId)
        .execute();

      return true;
    }),
} satisfies TRPCRouterRecord;
