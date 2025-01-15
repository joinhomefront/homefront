export const ACTION_TYPES = [
  "personal",
  "group",
  "local",
  "regional",
  "national",
  "global",
] as const;
export type ActionType = (typeof ACTION_TYPES)[number];

export const ACTION_STATUSES = [
  "pending",
  "in_progress",
  "completed",
  "failed",
  "cancelled",
] as const;
export type ActionStatus = (typeof ACTION_STATUSES)[number];

export const DONATION_TYPES = ["one_time", "monthly", "yearly"] as const;
export type DonationType = (typeof DONATION_TYPES)[number];

export const DONATION_PRODUCTS = [
  "Donation",
  "Monthly Donation",
  "Yearly Donation",
] as const;
export type DonationProduct = (typeof DONATION_PRODUCTS)[number];

export const ESCO_RELATION_TYPES = ["essential", "optional", "hidden"] as const;
export type EscoRelationType = (typeof ESCO_RELATION_TYPES)[number];

export const ESCO_SKILL_TYPES = ["skill", "knowledge", "competence"] as const;
export type EscoSkillType = (typeof ESCO_SKILL_TYPES)[number];

export const OCCUPATION_DATA_SOURCES = ["ESCO", "O*NET"] as const;
export type OccupationDataSource = (typeof OCCUPATION_DATA_SOURCES)[number];

export const PRIORITY_LEVELS = [
  "blocker",
  "critical",
  "major",
  "highest",
  "high",
  "medium",
  "low",
  "lowest",
  "minor",
  "trivial",
] as const;
export type PriorityLevel = (typeof PRIORITY_LEVELS)[number];

export const RELATIONSHIP_STATUSES = [
  "trusted",
  "pending_trust",
  "ignored",
  "blocked",
] as const;
export type RelationshipStatus = (typeof RELATIONSHIP_STATUSES)[number];

export const ROLES_FOR_USER = ["user", "admin", "moderator"] as const;
export type RoleForUser = (typeof ROLES_FOR_USER)[number];

export const SKILL_LEVELS = [
  "want_to_learn",
  "learning",
  "beginner",
  "intermediate",
  "expert",
] as const;
export type SkillLevel = (typeof SKILL_LEVELS)[number];

export const STRIPE_EVENT_STATUSES = [
  "pending",
  "processed",
  "failed",
  "unhandled",
] as const;
export type StripeEventStatus = (typeof STRIPE_EVENT_STATUSES)[number];

export enum TrustLevel {
  Dont_Know = 1,
  A_Little = 2,
  Somewhat = 3,
  High = 4,
  Complete = 5,
}

/**
 * A vote can be one of the following:
 * -1: Downvote
 *  0: No vote (typically used to cancel a vote)
 *  1: Upvote
 */
export const VOTES = [-1, 0, 1] as const;
/**
 * A vote can be one of the following:
 * -1: Downvote
 *  0: No vote (typically used to cancel a vote)
 *  1: Upvote
 */
export type Vote = (typeof VOTES)[number];
