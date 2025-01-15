import { z } from "zod";

import { VoteSchema } from "./votes";

export const VoteForActionSchema = z.object({
  actionId: z.string().uuid(),
  vote: VoteSchema,
});
