import { z } from "zod";

import { db } from "@homefront/db";

import { USERNAME_BLACKLIST } from "./data/blacklist";

export const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, "Your username must be at least 3 characters.")
  .max(20, "Your username cannot exceed 20 characters.")
  .regex(
    /^[a-zA-Z0-9]{1}[a-zA-Z0-9_]{0,19}$/,

    "Your username must start with a letter or number, and can only contain letters, numbers, and underscores.",
  )
  .refine(
    (username) => {
      return !USERNAME_BLACKLIST.includes(username);
    },
    {
      message: "This username isn't available. Please try another.",
    },
  );

const checkUsernameAvailability = async (username: string) => {
  const user = await db
    .selectFrom("users")
    .select("id")
    .where("username", "=", username)
    .executeTakeFirst();

  return { available: !user };
};

export const serverUsernameSchema = usernameSchema.superRefine(
  async (username, ctx) => {
    const { available } = await checkUsernameAvailability(username);
    if (!available) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "This username isn't available. Please try another.",
      });
      return z.NEVER;
    }
    return z.OK;
  },
);
