import type { TRPCRouterRecord } from "@trpc/server";
import { sql } from "kysely";
import { z } from "zod";

import { recommendRoles } from "@homefront/ai";

import { protectedProcedure } from "../trpc";

export const rolesRouter = {
  searchRoles: protectedProcedure
    .input(
      z.object({
        query: z.string().min(2),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { query } = input;

      const words = query.split(" ");
      const matchingRoles = await ctx.db
        .selectFrom("roles")
        .select([
          "id",
          "title",
          "priority",
          sql<number>`similarity(title, ${query})`.as("similarityScore"),
        ])
        .where((eb) =>
          eb.or([
            sql<boolean>`similarity(title, ${query}) > 0.2`,

            eb.or(
              words.map((word) => sql<boolean>`title ILIKE ${`%${word}%`}`),
            ),
          ]),
        )
        .orderBy(sql`similarity(title, ${query}) DESC`) // Rank by the highest similarity
        .limit(10)
        .execute();

      return matchingRoles;
    }),

  createUserRole: protectedProcedure
    .input(
      z.object({
        roleId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { roleId } = input;

      const userRole = await ctx.db
        .insertInto("userRoles")
        .values({ roleId, userId: ctx.session.user.id })
        .returning(["id", "roleId", "userId"])
        .executeTakeFirstOrThrow();

      return userRole;
    }),

  getUserRoles: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const userRoles = await ctx.db
      .selectFrom("userRoles as ur")
      .innerJoin("roles as r", "r.id", "ur.roleId")
      .leftJoin("roleDomainAreas", "r.id", "roleDomainAreas.roleId")
      .leftJoin("domainAreas as da", "roleDomainAreas.domainAreaId", "da.id")
      .select([
        "r.id",
        "r.title",
        "r.description",
        "r.priority",
        sql<string[]>`array_agg(DISTINCT da.slug)`.as("domainAreas"),
        "ur.id as userRoleId",
        sql<boolean>`(ur.id IS NOT NULL)`.as("hasRole"),
      ])
      .where("ur.userId", "=", userId)
      .groupBy(["r.id", "ur.id"])
      .orderBy("r.title")
      .execute();

    return userRoles;
  }),

  updateUserRole: protectedProcedure
    .input(
      z.object({
        roleId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { roleId } = input;

      const userRole = await ctx.db
        .updateTable("userRoles")
        .set({ roleId, userId: ctx.session.user.id, updatedAt: new Date() })
        .returning(["id", "roleId", "userId"])
        .executeTakeFirstOrThrow();

      return userRole;
    }),

  deleteUserRole: protectedProcedure
    .input(
      z.object({
        roleId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { roleId } = input;

      const userRole = await ctx.db
        .deleteFrom("userRoles")
        .where("roleId", "=", roleId)
        .where("userId", "=", ctx.session.user.id)
        .returning(["id", "roleId", "userId"])
        .executeTakeFirstOrThrow();

      return userRole;
    }),

  recommendedRoles: protectedProcedure.query(async ({ ctx }) => {
    const recommendedRoles = await recommendRoles(ctx.session.user.id);
    return recommendedRoles;
    // const userOccupations = await ctx.db
    //   .selectFrom("userOccupations as uo")
    //   .select("uo.occupationId")
    //   .where("uo.userId", "=", ctx.session.user.id)
    //   .execute();

    // const userSkills = await ctx.db
    //   .selectFrom("userSkills as us")
    //   .select("us.skillId")
    //   .where("us.userId", "=", ctx.session.user.id)
    //   .execute();

    // if (!userOccupations.length && !userSkills.length) {
    //   return [];
    // }

    // const occupationIds = userOccupations.map(uo => uo.occupationId);
    // const skillIds = userSkills.map(us => us.skillId);

    // const recommendedRoles = await ctx.db
    //   .selectFrom("roles as r")
    //   .leftJoin("userRoles as ur", join =>
    //     join
    //       .onRef("ur.roleId", "=", "r.id")
    //       .on("ur.userId", "=", ctx.session.user.id)
    //   )
    //   .leftJoin("roleOccupations as ro", "ro.roleId", "r.id")
    //   .leftJoin("roleSkills as rs", "rs.roleId", "r.id")
    //   .leftJoin("roleDomainAreas as rda", "rda.roleId", "r.id")
    //   .leftJoin("domainAreas as da", "da.id", "rda.domainAreaId")
    //   .select([
    //     "r.id",
    //     "r.title",
    //     "r.priority",
    //     sql<boolean>`ur.id IS NOT NULL`.as("hasRole"),
    //     sql<number>`count(DISTINCT ro.occupation_id) filter (where ro.occupation_id = any(${occupationIds}))`.as("occupationMatchCount"),
    //     sql<number>`count(DISTINCT rs.skill_id) filter (where rs.skill_id = any(${skillIds}))`.as("skillMatchCount"),
    //     sql<number>`(
    //       count(DISTINCT ro.occupation_id) filter (where ro.occupation_id = any(${occupationIds})) * 2 +
    //       count(DISTINCT rs.skill_id) filter (where rs.skill_id = any(${skillIds}))
    //     )`.as("totalScore"),
    //     sql<string[]>`array_agg(DISTINCT da.slug)`.as("domainAreas")
    //   ])
    //   .where(eb =>
    //     eb.or([
    //       eb("ro.occupationId", "in", occupationIds),
    //       eb("rs.skillId", "in", skillIds)
    //     ])
    //   )
    //   .groupBy(["r.id", "r.title", "r.priority", "ur.id"])
    //   .orderBy([
    //     "totalScore desc",
    //     "r.priority desc",
    //     "r.title asc"
    //   ])
    //   .limit(20)
    //   .execute();

    // return recommendedRoles;
  }),

  getPopularRoles: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const popularRoles = await ctx.db
      .selectFrom("roles as r")
      .leftJoin("roleDomainAreas", "r.id", "roleDomainAreas.roleId")
      .leftJoin("domainAreas as da", "roleDomainAreas.domainAreaId", "da.id")
      .leftJoin("userRoles as ur", (join) =>
        join.onRef("r.id", "=", "ur.roleId").on("ur.userId", "=", userId),
      )
      .select([
        "r.id",
        "r.title",
        "r.description",
        "r.priority",
        sql<string[]>`array_agg(DISTINCT da.slug)`.as("domainAreas"),
        "ur.id as userRoleId",
        sql<boolean>`(ur.id IS NOT NULL)`.as("hasRole"),
      ])
      .where("r.title", "in", [
        "Administrative Support",
        "Protestor",
        "Political Organizer",
        "Scout",
        "Volunteer Recruiter",
        "Volunteer Coordinator",
        "Logistics Support",
        "Fundraiser",
        "Rapid Response Volunteer",
        "Resources Volunteer",
      ])
      .orderBy("r.title")
      .groupBy(["r.id", "ur.id"])
      .execute();

    return popularRoles;
  }),
} satisfies TRPCRouterRecord;
