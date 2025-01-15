import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { db } from "@homefront/db";

import { protectedProcedure } from "../trpc";

export const relationshipsRouter = {
  createRelationship: protectedProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        friendId: z.string().uuid(),
        createdFromInvite: z.boolean().default(false),
        inviteCreatedAt: z.date().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { userId, friendId, createdFromInvite, inviteCreatedAt } = input;

      const relationship = await db.transaction().execute(async (tx) => {
        const newRelationship = await tx
          .insertInto("relationships")
          .values({
            userId,
            friendId,
            status: "pending_trust",
            createdFromInvite,
            inviteCreatedAt,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        await tx
          .insertInto("relationships")
          .values({
            friendId,
            userId,
            status: "pending_trust",
            createdFromInvite,
            inviteCreatedAt,
          })
          .executeTakeFirstOrThrow();

        return newRelationship;
      });

      return relationship;
    }),

  getRelationship: protectedProcedure
    .input(z.string().uuid())
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      return await db
        .selectFrom("relationships as r")
        .innerJoin("users as f", "r.friendId", "f.id")
        .select([
          "r.id",
          "r.userId",
          "r.friendId",
          "r.status",
          "r.trustLevel",
          "r.createdFromInvite",
          "r.inviteCreatedAt",
          "r.createdAt",
          "r.updatedAt",
          "f.username as friendUsername",
          "f.image as friendImage",
        ])
        .where("id", "=", input)
        .where("userId", "=", userId)
        .executeTakeFirstOrThrow();
    }),

  getRelationships: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    return await db
        .selectFrom("relationships as r")
        .innerJoin("users as f", "r.friendId", "f.id")
        .select([
          "r.id",
          "r.userId",
          "r.friendId",
          "r.status",
          "r.trustLevel",
          "r.createdFromInvite",
          "r.inviteCreatedAt",
          "r.createdAt",
          "r.updatedAt",
          "f.username as friendUsername",
          "f.image as friendImage",
        ])
      .where("userId", "=", userId)
      .execute();
  }),

  updateRelationship: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        status: z.enum(["pending_trust", "trusted", "blocked"]),
        trustLevel: z.number().min(1).max(5),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, status, trustLevel } = input;
      const userId = ctx.session.user.id;

      return await db
        .updateTable("relationships")
        .set("status", status)
        .set("trustLevel", trustLevel)
        .where("id", "=", id)
        .where("userId", "=", userId)
        .returningAll()
        .execute();
    }),
} satisfies TRPCRouterRecord;
