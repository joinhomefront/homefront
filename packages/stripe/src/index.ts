import type { Stripe } from "stripe";

import type {
  CreateCustomerInput,
  CreateDonationInput,
  CreatePriceInput,
} from "./types";
import { stripe } from "./client";

if (!process.env.STRIPE_HASH_KEY) {
  throw new Error("STRIPE_HASH_KEY must be set");
}

async function importKey(secret: string) {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"],
  );
}

async function hashUserId(userId: string): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const secret = process.env.STRIPE_HASH_KEY!;
  const encoder = new TextEncoder();
  const key = await importKey(secret);
  const data = encoder.encode(userId);
  const signature = await crypto.subtle.sign("HMAC", key, data);

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createBillingPortalSession(customerId: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    return_url: process.env.STRIPE_BILLING_RETURN_URL,
  });
}

export async function getCustomerForUserId(userId: string) {
  const hashedUserId = await hashUserId(userId);
  return getCustomerForHashedUserId(hashedUserId);
}

export async function getCustomerForHashedUserId(hashedUserId: string) {
  const customers = await stripe.customers.search({
    query: `metadata['userId']:'${hashedUserId}'`,
    limit: 1,
  });

  return customers.data[0];
}

export async function createCustomer(input: CreateCustomerInput) {
  const { metadata, userId } = input;

  const hashedUserId = await hashUserId(userId);

  return stripe.customers.create(
    {
      metadata: {
        ...metadata,
        userId: hashedUserId,
      },
    },
    {
      idempotencyKey: `createCustomer-${hashedUserId}`,
    },
  );
}

export async function createCustomerSession(
  customerId: string,
  payment_method_save_usage: Stripe.CustomerSessionCreateParams.Components.PaymentElement.Features.PaymentMethodSaveUsage,
) {
  return stripe.customerSessions.create({
    customer: customerId,
    components: {
      payment_element: {
        enabled: true,
        features: {
          payment_method_redisplay: "enabled",
          payment_method_save: "enabled",
          payment_method_save_usage,
          payment_method_remove: "enabled",
        },
      },
    },
  });
}

export async function createDonation(input: CreateDonationInput) {
  const { amount, customerId, metadata, priceId, type } = input;

  if (type === "one_time") {
    const paymentIntent: Stripe.PaymentIntent =
      await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        customer: customerId,
        metadata: metadata,
        payment_method_options: {
          card: {
            setup_future_usage: "off_session",
          },
        },
      });

    if (typeof paymentIntent.client_secret !== "string") {
      throw new TypeError("Client secret not found for payment intent");
    }

    const customerSession: Stripe.CustomerSession = await createCustomerSession(
      customerId,
      "off_session",
    );

    return {
      paymentIntent,
      subscription: undefined,
      customerSession,
      clientSecret: paymentIntent.client_secret,
    };
  }

  const subscription: Stripe.Subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    payment_settings: {
      save_default_payment_method: "on_subscription",
    },
    metadata: metadata,
    expand: ["latest_invoice.payment_intent"],
  });

  if (
    !subscription.latest_invoice ||
    typeof subscription.latest_invoice === "string" ||
    !subscription.latest_invoice.payment_intent ||
    typeof subscription.latest_invoice.payment_intent === "string" ||
    !subscription.latest_invoice.payment_intent.client_secret
  ) {
    throw new TypeError("No expanded latest invoice found for subscription");
  }

  const customerSession: Stripe.CustomerSession = await createCustomerSession(
    customerId,
    "off_session",
  );

  const paymentIntent = subscription.latest_invoice.payment_intent;

  if (typeof paymentIntent.client_secret !== "string") {
    throw new TypeError("Client secret not found for payment intent");
  }

  return {
    subscription,
    paymentIntent,
    customerSession,
    clientSecret: paymentIntent.client_secret,
  };
}

export async function createPrice(
  input: CreatePriceInput,
): Promise<Stripe.Price> {
  const { amount, productId, type } = input;

  const lookupKey = `${type}_donation_${amount}`;

  // Check if price already exists
  const existingPrices = await stripe.prices.list({
    lookup_keys: [lookupKey],
    limit: 1,
  });

  if (existingPrices.data.length > 0 && existingPrices.data[0]) {
    return existingPrices.data[0];
  }

  return stripe.prices.create({
    unit_amount: amount,
    currency: "usd",
    lookup_key: lookupKey,
    product: productId,
    recurring:
      type !== "one_time"
        ? {
            interval: type === "monthly" ? "month" : "year",
          }
        : undefined,
  });
}

export async function getPaymentIntent(paymentIntentId: string) {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
    expand: ["invoice.subscription"],
  });

  return paymentIntent;
}

export async function getPaymentIntents(customerId: string) {
  const paymentIntents = await stripe.paymentIntents.search({
    query: `customer:"${customerId}" AND status:"succeeded"`,
  });

  return paymentIntents.data.filter(
    (pi) => !pi.invoice, // Only include non-subscription payments
  );
}

export { stripe };
