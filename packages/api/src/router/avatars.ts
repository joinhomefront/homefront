import type { TRPCRouterRecord } from "@trpc/server";

import {
  sql,
} from "@homefront/db";

import { publicProcedure } from "../trpc";

export const avatarsRouter = {
  getRandomAvatar: publicProcedure.query(async ({ ctx }) => {
    const randomAvatar = await ctx.db
      .selectFrom("avatars")
      .selectAll()
      .orderBy(sql`RANDOM()`)
      .limit(1)
      .executeTakeFirst();

    return randomAvatar;
  }),
} satisfies TRPCRouterRecord;
