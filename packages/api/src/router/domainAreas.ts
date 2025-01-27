import type { TRPCRouterRecord } from "@trpc/server";
import { sql } from "kysely";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../trpc";

export const domainAreasRouter = {
  getDomainAreas: publicProcedure.query(async ({ ctx }) => {
    const domainAreas = await ctx.db
      .selectFrom("domainAreas")
      .selectAll()
      .orderBy("title")
      .execute();

    return domainAreas;
  }),

  getAllDomainAreas: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const domainAreas = await ctx.db
      .selectFrom("domainAreas as da")
      .leftJoin("userDomainAreas as uda", (join) =>
        join
          .onRef("uda.domainAreaId", "=", "da.id")
          .on("uda.userId", "=", userId),
      )
      .select([
        "da.id",
        "da.slug",
        "da.title",
        "da.description",
        sql<boolean>`(uda.id IS NOT NULL)`.as("hasDomainArea"),
      ])
      .orderBy("da.title")
      .execute();

    return domainAreas;
  }),

  createUserDomainArea: protectedProcedure
    .input(
      z.object({
        domainAreaId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { domainAreaId } = input;
      const userId = ctx.session.user.id;

      const userDomainArea = await ctx.db
        .insertInto("userDomainAreas")
        .values({ domainAreaId, userId })
        .returning(["id", "domainAreaId", "userId"])
        .executeTakeFirstOrThrow();

      return userDomainArea;
    }),
  updateUserDomainArea: protectedProcedure
    .input(
      z.object({
        domainAreaId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { domainAreaId } = input;
      const userId = ctx.session.user.id;

      const userDomainArea = await ctx.db
        .updateTable("userDomainAreas")
        .where("domainAreaId", "=", domainAreaId)
        .where("userId", "=", userId)
        .returning(["id", "domainAreaId", "userId"])
        .executeTakeFirstOrThrow();

      return userDomainArea;
    }),
  deleteUserDomainArea: protectedProcedure
    .input(
      z.object({
        domainAreaId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { domainAreaId } = input;
      const userId = ctx.session.user.id;

      await ctx.db
        .deleteFrom("userDomainAreas")
        .where("domainAreaId", "=", domainAreaId)
        .where("userId", "=", userId)
        .execute();

      return true;
    }),
} satisfies TRPCRouterRecord;
