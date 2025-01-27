import { z } from "zod";

import { REPORT_REASONS, REPORTED_TYPES, ReportedType } from "@homefront/db";

import { protectedProcedure } from "../trpc";

export const reportsRouter = {
  createReport: protectedProcedure
    .input(
      z.object({
        type: z.enum(REPORTED_TYPES),
        id: z.string().uuid(),
        reason: z.enum(REPORT_REASONS),
        details: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      await ctx.db
        .insertInto("reports")
        .values({
          userId,
          reportedId: input.id,
          reportedType: input.type as ReportedType,
          reason: input.reason,
          reasonDetails: input.details,
        })
        .execute();

      return { success: true };
    }),
};
