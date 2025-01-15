import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { db } from "@homefront/db";
import { usernameSchema } from "@homefront/validators";

import { protectedProcedure, publicProcedure } from "../trpc";

export const usersRouter = {
  checkUsernameAvailability: publicProcedure
    .input(
      z.object({
        username: usernameSchema,
      }),
    )
    .query(async ({ input }) => {
      const { username } = input;

      const user = await db
        .selectFrom("users")
        .select("id")
        .where("username", "=", username)
        .executeTakeFirst();

      return { available: !user };
    }),

  getAvatars: protectedProcedure.query(async ({ ctx }) => {
    const avatars = await ctx.db
      .selectFrom("avatars")
      .select(["id", "filename", "displayName"])
      .orderBy("displayName")
      .execute();

    return avatars;
  }),

  updateAvatar: protectedProcedure
    .input(
      z.object({
        image: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { image } = input;
      const user = await ctx.db
        .updateTable("users")
        .set({
          image,
        })
        .where("id", "=", ctx.session.user.id)
        .returningAll()
        .executeTakeFirstOrThrow();

      return user;
    }),
} satisfies TRPCRouterRecord;
