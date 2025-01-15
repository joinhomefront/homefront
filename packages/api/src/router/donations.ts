import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { sql } from "@homefront/db";
import { pgpSymDecrypt, pgpSymEncrypt } from "@homefront/db/utils";
import {
  createBillingPortalSession,
  createCustomer,
  createDonation,
  createPrice,
  getCustomerForUserId,
  getPaymentIntent,
  getPaymentIntents,
} from "@homefront/stripe";
import {
  CreateCustomerSchema,
  CreateDonationSchema,
  CreatePriceSchema,
} from "@homefront/validators";

import { protectedProcedure } from "../trpc";

export const donationsRouter = {
  createBillingPortalSession: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const customer = await ctx.db
      .selectFrom("stripeCustomers")
      .select([pgpSymDecrypt("stripeCustomerId").as("stripeCustomerId")])
      .where("userId", "=", userId)
      .executeTakeFirstOrThrow();

    const session = await createBillingPortalSession(customer.stripeCustomerId);

    return session;
  }),

  createCustomer: protectedProcedure
    .input(CreateCustomerSchema.omit({ userId: true }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const existingCustomer = await ctx.db
        .selectFrom("stripeCustomers")
        .select([
          pgpSymDecrypt("stripeCustomerId").as("stripeCustomerId"),
          "stripeCustomerIdHash",
          "userId",
        ])
        .where("userId", "=", userId)
        .executeTakeFirst();

      if (existingCustomer) {
        return existingCustomer;
      }

      const customer = await createCustomer({ ...input, userId });

      return ctx.db
        .insertInto("stripeCustomers")
        .values({
          stripeCustomerId: pgpSymEncrypt(customer.id),
          stripeCustomerIdHash: sql<string>`digest(${customer.id}, 'sha256')::text`,
          userId,
        })
        .returning([
          pgpSymDecrypt("stripeCustomerId").as("stripeCustomerId"),
          "stripeCustomerIdHash",
          "userId",
        ])
        .onConflict((oc) => oc.column("stripeCustomerIdHash").doNothing())
        .executeTakeFirstOrThrow();
    }),

  createPrice: protectedProcedure
    .input(CreatePriceSchema)
    .mutation(async ({ ctx, input }) => {
      const existingStripePrice = await ctx.db
        .selectFrom("stripePrices")
        .select("stripePriceId")
        .where("amount", "=", input.amount)
        .where("type", "=", input.type)
        .executeTakeFirst();
      if (existingStripePrice) {
        return existingStripePrice;
      }

      const price = await createPrice(input);

      const stripePrice = await ctx.db
        .insertInto("stripePrices")
        .values({
          active: price.active,
          amount: input.amount,
          lookupKey: price.lookup_key,
          stripePriceId: price.id,
          stripeProductId: input.productId,
          type: input.type,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      return stripePrice;
    }),

  getCustomer: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const stripeCustomer = await ctx.db
      .selectFrom("stripeCustomers")
      .select([
        pgpSymDecrypt("stripeCustomerId").as("stripeCustomerId"),
        "stripeCustomerIdHash",
        "userId",
      ])
      .where("userId", "=", userId)
      .executeTakeFirst();

    // TODO: fix this when we update to trpc v11
    if (!stripeCustomer) {
      return { stripeCustomerId: null, stripeCustomerIdHash: null, userId };
    }
    return stripeCustomer;
  }),

  // Add new endpoint to donations router
  getDonationHistory: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // Get customer ID
    const customer = await ctx.db
      .selectFrom("stripeCustomers")
      .select([pgpSymDecrypt("stripeCustomerId").as("stripeCustomerId")])
      .where("userId", "=", userId)
      .executeTakeFirst();

    if (!customer) return { subscriptions: [], oneTimeDonations: [] };

    // Get subscriptions
    const subscriptions = await ctx.db
      .selectFrom("stripeSubscriptions as ss")
      .innerJoin("stripePrices as sp", "sp.stripePriceId", "ss.stripePriceId")
      .select([
        pgpSymDecrypt("ss.stripeSubscriptionId").as("stripeSubscriptionId"),
        "ss.status",
        "ss.currentPeriodEnd",
        "ss.currentPeriodStart",
        "ss.cancelAt",
        "ss.canceledAt",
        "ss.stripePriceId",
        "sp.amount",
        "sp.type",
      ])
      .where(
        "stripeCustomerIdHash",
        "=",
        sql<string>`digest(${customer.stripeCustomerId}, 'sha256')::text`,
      )
      .execute();

    // Get one-time donations from payment intents
    const paymentIntents = await getPaymentIntents(customer.stripeCustomerId);

    return {
      subscriptions,
      oneTimeDonations: paymentIntents,
    };
  }),
  getPaymentDetails: protectedProcedure
    .input(
      z.object({
        paymentIntentId: z.string(),
        clientSecret: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const paymentIntent = await getPaymentIntent(input.paymentIntentId);

      if (
        !paymentIntent ||
        paymentIntent.client_secret !== input.clientSecret
      ) {
        throw new Error("Invalid payment intent");
      }

      return paymentIntent;
    }),
  initiateDonation: protectedProcedure
    .input(CreateDonationSchema)
    .mutation(async ({ ctx, input }) => {
      const { amount, customerId, type } = input;

      const stripePrice = await ctx.db
        .selectFrom("stripePrices")
        .selectAll()
        .where("type", "=", type)
        .where("amount", "=", amount)
        .executeTakeFirstOrThrow();

      const { subscription, paymentIntent, customerSession, clientSecret } =
        await createDonation(input);

      if (subscription) {
        return await ctx.db.transaction().execute(async (tx) => {
          const stripeSubscription = await tx
            .insertInto("stripeSubscriptions")
            .values({
              stripeSubscriptionId: pgpSymEncrypt(subscription.id),
              stripeSubscriptionIdHash: sql`digest(${subscription.id}, 'sha256')::text`,
              stripeCustomerId: pgpSymEncrypt(customerId),
              stripeCustomerIdHash: sql`digest(${customerId}, 'sha256')::text`,
              stripePriceId: stripePrice.stripePriceId,
              status: subscription.status,
              currentPeriodEnd: subscription.current_period_end,
              currentPeriodStart: subscription.current_period_start,
              cancelAt: subscription.cancel_at,
              canceledAt: subscription.canceled_at,
            })
            .returning([
              pgpSymDecrypt("stripeSubscriptionId").as("stripeSubscriptionId"),
              pgpSymDecrypt("stripeCustomerId").as("stripeCustomerId"),
              "stripePriceId",
              "status",
              "currentPeriodEnd",
              "currentPeriodStart",
              "cancelAt",
              "canceledAt",
            ])
            .executeTakeFirstOrThrow();

          return {
            subscription: stripeSubscription,
            paymentIntent,
            customerSession,
            clientSecret,
          };
        });
      }
      return {
        subscription: null,
        paymentIntent,
        customerSession,
        clientSecret,
      };
    }),

  getProducts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.selectFrom("stripeProducts").selectAll().execute();
  }),

  isStripeCustomer: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const customer = await ctx.db
      .selectFrom("stripeCustomers")
      .where("userId", "=", userId)
      .limit(1)
      .executeTakeFirst();

    return !!customer;
  }),
} satisfies TRPCRouterRecord;
