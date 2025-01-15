import type { Stripe } from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { db, DonationType, sql } from "@homefront/db";
import { pgpSymEncrypt } from "@homefront/db/utils";
import { stripe } from "@homefront/stripe";

import { env } from "~/env";

async function storeStripeEvent(event: Stripe.Event) {
  return db
    .insertInto("stripeEvents")
    .values({
      stripeEventId: pgpSymEncrypt(event.id),
      stripeEventIdHash: sql<string>`digest(${event.id}, 'sha256')::text`,
      type: event.type,
      status: "pending",
    })
    .onConflict((oc) => oc.column("stripeEventIdHash").doNothing())
    .returningAll()
    .executeTakeFirst();
}

async function updateStripeEvent(
  eventId: string,
  status: "processed" | "failed",
  error?: string,
) {
  return db
    .updateTable("stripeEvents")
    .set({
      status,
      error: error || null,
      processedAt: new Date(),
    })
    .where(
      "stripeEventIdHash",
      "=",
      sql<string>`digest(${eventId}, 'sha256')::text`,
    )
    .execute();
}

function getDonationTypeForInterval(recurring: Stripe.Price.Recurring | null) {
  if (recurring === null) {
    return "one_time";
  } else {
    switch (recurring.interval) {
      case "month":
        return "monthly";
      case "year":
        return "yearly";
    }
  }

  throw new TypeError("Invalid recurring interval");
}
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 },
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );

    const storedEvent = await storeStripeEvent(event);
    if (!storedEvent) {
      // Event already processed
      return NextResponse.json({ success: true });
    }

    switch (event.type) {
      case "payment_intent.payment_failed":
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await db
          .updateTable("stripePaymentIntents")
          .set({
            status: paymentIntent.status,
            updatedAt: sql`now()`,
          })
          .where(
            "stripePaymentIntentIdHash",
            "=",
            sql<string>`digest(${paymentIntent.id}, 'sha256')::text`,
          )
          .execute();
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await db
          .updateTable("stripeSubscriptions")
          .set({
            status: subscription.status,
            currentPeriodStart: subscription.current_period_start,
            currentPeriodEnd: subscription.current_period_end,
            cancelAt: subscription.cancel_at,
            canceledAt: subscription.canceled_at,
            updatedAt: sql`now()`,
          })
          .where(
            "stripeSubscriptionIdHash",
            "=",
            sql<string>`digest(${subscription.id}, 'sha256')::text`,
          )
          .execute();
        break;
      }

      case "invoice.paid":
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          await db
            .updateTable("stripeSubscriptions")
            .set({
              status: event.type === "invoice.paid" ? "active" : "past_due",
              updatedAt: sql`now()`,
            })
            .where(
              "stripeSubscriptionIdHash",
              "=",
              sql<string>`digest(${invoice.subscription}, 'sha256')::text`,
            )
            .execute();
        }
        break;
      }

      case "price.created": {
        const price = event.data.object as Stripe.Price;
        let productId: string | null = null;
        if (typeof price.product === "string") {
          productId = price.product;
        }

        if (typeof price.product === "object") {
          productId = price.product.id;
        }

        if (!productId) {
          throw new TypeError("Price does not have a product ID");
        }

        const type = getDonationTypeForInterval(price.recurring);

        await db
          .insertInto("stripePrices")
          .values({
            stripePriceId: price.id,
            stripeProductId: productId,
            amount: price.unit_amount,
            type,
            lookupKey:
              price.lookup_key ?? `${type}_donation_${price.unit_amount}`,
            active: price.active,
          })
          .onConflict((oc) => oc.column("stripePriceId").doNothing())
          .execute();
        break;
      }

      case "price.updated": {
        const price = event.data.object as Stripe.Price;
        await db
          .updateTable("stripePrices")
          .set({
            active: price.active,
            updatedAt: sql`now()`,
          })
          .where("stripePriceId", "=", price.id)
          .execute();
        break;
      }

      case "product.created": {
        const product = event.data.object as Stripe.Product;
        await db
          .insertInto("stripeProducts")
          .values({
            stripeProductId: product.id,
            name: product.name,
            active: product.active,
          })
          .onConflict((oc) => oc.column("stripeProductId").doNothing())
          .execute();
        break;
      }

      case "product.updated": {
        const product = event.data.object as Stripe.Product;
        await db
          .updateTable("stripeProducts")
          .set({
            name: product.name,
            active: product.active,
            updatedAt: sql`now()`,
          })
          .where("stripeProductId", "=", product.id)
          .execute();
        break;
      }
    }

    await updateStripeEvent(event.id, "processed");
    return NextResponse.json({ success: true });
  } catch (err) {
    const error = err as Error;
    console.error("Stripe webhook error:", error);

    if (error.message.includes("No signatures found")) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    let eventId: string | undefined;

    // Store failed event if we have an ID
    if (error instanceof stripe.errors.StripeSignatureVerificationError) {
      const headers = error.headers;
      if (headers) {
        const eventHeader = headers["event"];
        eventId = eventHeader
          ? eventHeader.split(",")[0]?.split("=")[1]
          : undefined;
      }
    }

    if (eventId) {
      await updateStripeEvent(eventId, "failed", error.message);
    }

    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}
