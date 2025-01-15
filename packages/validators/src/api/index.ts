import { z } from "zod";

export const APIErrorSchema = z.object({
  error: z.string().optional(),
})

export type APIError = z.infer<typeof APIErrorSchema>;
