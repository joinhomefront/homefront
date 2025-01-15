import { z } from "zod";

import { DONATION_PRODUCTS, DONATION_TYPES } from "@homefront/db";

export const DonationTypeSchema = z.enum(DONATION_TYPES);
export const DonationProductSchema = z.enum(DONATION_PRODUCTS);

export const CreateCustomerSchema = z.object({
  metadata: z.record(z.string()).optional(),
  userId: z.string().uuid(),
});
export type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>;

export const CreateDonationSchema = z.object({
  amount: z.number().int().min(100),
  customerId: z.string(),
  metadata: z.record(z.string()).optional(),
  priceId: z.string(),
  type: DonationTypeSchema,
});
export type CreateDonationInput = z.infer<typeof CreateDonationSchema>;

export const CreatePriceSchema = z.object({
  amount: z.number().int().min(100),
  productId: z.string(),
  type: DonationTypeSchema,
});
export type CreatePriceInput = z.infer<typeof CreatePriceSchema>;

export const DonationFormSchema = z.object({
  amount: z.number().int().min(100),
  type: z.enum(DONATION_TYPES),
});

export type DonationFormData = z.infer<typeof DonationFormSchema>;
export const StripeCreateSubscriptionResponseSchema = z.object({
  id: z.string(),
  status: z.string(),
  currentPeriodEnd: z.number(),
  currentPeriodStart: z.number(),
  cancelAt: z.number().nullable(),
  canceledAt: z.number().nullable(),
  latest_invoice: z.object({
    payment_intent: z.object({
      id: z.string(),
      status: z.string(),
      clientSecret: z.string(),
    }),
  }),
});
