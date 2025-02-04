import { z } from "zod";

export const InviteCodeSchema = z
  .string()
  .nullable()
  .optional()
  .transform((val) => (val === undefined ? null : val))
  .refine(
    (code) => {
      if (code === null) return true;
      return /^[A-Za-z0-9_-]{8}$/.test(code);
    },
    {
      message: "Invalid invite code format",
    },
  );
