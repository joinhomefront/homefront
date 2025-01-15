import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { invalidateSessionToken } from "@homefront/auth";
import { generateTOTPSecret } from "@homefront/auth/otp";

import { protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = {
  getSession: publicProcedure.query(({ ctx }) => {
    // TODO: fix this when we update to trpc v11
    return ctx.session ?? { data: null };
  }),

  signOut: protectedProcedure.mutation(async (opts) => {
    if (!opts.ctx.token) {
      return { success: false };
    }
    await invalidateSessionToken(opts.ctx.token);
    return { success: true };
  }),

  /**
   * Generate a random Base32 secret for use with TOTP.
   *
   * @returns {string} The generated secret.
   */
  generateTwoFactorSecret: protectedProcedure.mutation(() => {
    return generateTOTPSecret();
  }),

  getRequiredChallenges: protectedProcedure
    .input(
      z.object({
        action: z.enum([
          "password_update",
          "2fa_enable",
          "2fa_disable",
          "recovery_phrase_update",
        ]),
      }),
    )
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;

      const user = await ctx.db
        .selectFrom("users")
        .select(["id", "twoFactorEnabled"])
        .where("id", "=", userId)
        .executeTakeFirstOrThrow();

      const { twoFactorEnabled } = user;

      return twoFactorEnabled
        ? [
            {
              type: "totp",
            },
          ]
        : [];
    }),
} satisfies TRPCRouterRecord;
