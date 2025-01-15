import type { TRPCRouterRecord } from "@trpc/server";
import { isValidCell } from "h3-js";
import { z } from "zod";

import { protectedProcedure } from "../trpc";

export const userLocationsRouter = {
  addUserLocation: protectedProcedure
    .input(
      z.object({
        hex: z.string().refine((hex) => isValidCell(hex), {
          message: "Invalid H3 cell index",
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { hex } = input;
      const userId = ctx.session.user.id;

      const userLocation = await ctx.db
        .selectFrom("userLocations")
        .where("userId", "=", userId)
        .selectAll()
        .executeTakeFirst();

      if (userLocation) {
        return await ctx.db
          .updateTable("userLocations")
          .set({ hex })
          .where("id", "=", userLocation.id)
          .returningAll()
          .execute();
      } else {
        return await ctx.db
          .insertInto("userLocations")
          .values({ hex, userId })
          .returningAll()
          .executeTakeFirstOrThrow();
      }
    }),

  getUserLocation: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const userLocation = await ctx.db
      .selectFrom("userLocations")
      .select("id")
      .where("userId", "=", userId)
      .executeTakeFirst();

    return userLocation;
  }),
} satisfies TRPCRouterRecord;
