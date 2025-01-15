import type { TRPCRouterRecord } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";

import dayjs from "@homefront/dayjs";
import { db } from "@homefront/db";

import { protectedProcedure, publicProcedure } from "../trpc";

export const invitesRouter = {
  createInvite: protectedProcedure
    .input(
      z.object({
        expiresInDays: z.number().int().min(1).max(7).default(3),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const code = nanoid(8);
      const { expiresInDays } = input;

      const invite = await db
        .insertInto("invites")
        .values({
          userId,
          code,
          used: false,
          expiresAt: dayjs().add(expiresInDays, "day").toDate(),
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      return invite;
    }),

  getInvite: publicProcedure
    .input(
      z.object({
        code: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { code } = input;

      const invite = await db
        .selectFrom("invites as i")
        .innerJoin("users as u", "i.userId", "u.id")
        .select([
          "i.id",
          "i.code",
          "i.expiresAt",
          "i.used",
          "u.id as userId",
          "u.username",
          "u.image",
        ])
        .where("i.code", "=", code)
        .executeTakeFirstOrThrow();

      return invite;
    }),

  getUserInvites: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const invites = await db
      .selectFrom("invites")
      .selectAll()
      .where("userId", "=", userId)
      .execute();

    return invites;
  }),

  acceptInvite: protectedProcedure
    .input(
      z.object({
        code: z.string(),
        inviteeId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const { code, inviteeId } = input;

      const invite = await db
        .selectFrom("invites")
        .selectAll()
        .where("code", "=", code)
        .executeTakeFirstOrThrow();

      const isExpired = dayjs(invite.expiresAt).isBefore(dayjs());
      if (invite.used || isExpired) {
        throw new Error("Invite is invalid or expired");
      }

      await db.transaction().execute(async (tx) => {
        await tx
          .updateTable("invites")
          .set({ used: true })
          .where("id", "=", invite.id)
          .execute();

        await tx
          .insertInto("relationships")
          .values([
            {
              userId: invite.userId,
              friendId: inviteeId,
              status: "pending_trust",
              createdFromInvite: true,
              inviteCreatedAt: invite.createdAt,
            },
            {
              userId: inviteeId,
              friendId: invite.userId,
              status: "pending_trust",
              createdFromInvite: true,
              inviteCreatedAt: invite.createdAt,
            },
          ])
          .execute();

        await tx.deleteFrom("invites").where("id", "=", invite.id).execute();
      });

      return { success: true };
    }),

  deleteInvite: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id } = input;

      await db.deleteFrom("invites").where("id", "=", id).execute();

      return { success: true };
    }),
} satisfies TRPCRouterRecord;
