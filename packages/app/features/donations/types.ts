import { z } from "zod";

import { DONATION_TYPES } from "@homefront/db";

export enum DonationStep {
  AMOUNT = "amount",
  PAYMENT = "payment",
  RECEIPT = "receipt",
}

export const DonationFormSchema = z.object({
  amount: z.number().int().min(100),
  type: z.enum(DONATION_TYPES),
});

export const PaymentFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export type PaymentFormData = z.infer<typeof PaymentFormSchema>;
