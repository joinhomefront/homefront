import { z } from "zod";

import type { Vote } from "@homefront/db";

/**
 * A schema for validating a vote.
 *
 * A vote can be one of the following:
 * -1: Downvote
 *  0: No vote (typically used to cancel a vote)
 *  1: Upvote
 *
 * @see Vote
 *
 * @example
 * VoteSchema.parse(1); // => 1
 * VoteSchema.parse(-1); // => -1
 * VoteSchema.parse(0); // => 0
 */
export const VoteSchema = z
  .union([z.literal(-1), z.literal(0), z.literal(1)])
  .transform((v) => v satisfies Vote);
