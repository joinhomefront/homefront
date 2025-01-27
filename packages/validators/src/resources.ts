import { z } from "zod";

import { RESOURCE_TYPES } from "@homefront/db";

import { LinkSchema } from "./url";
import { VoteSchema } from "./votes";

export const LinkResourceSchema = z.object({
  type: z.enum(RESOURCE_TYPES),
  title: z.string().min(1, {
    message: "Please enter a title",
  }),
  description: z.string().optional(),
  url: LinkSchema,
  domainAreaIds: z.array(z.string().uuid()).optional(),
});

export const VoteForResourceSchema = z.object({
  resourceId: z.string().uuid(),
  vote: VoteSchema,
});
