export enum TrustLevel {
  Dont_Know = 1,
  A_Little = 2,
  Somewhat = 3,
  High = 4,
  Complete = 5,
}

export type RelationshipStatus = "trusted" | "pending_trust" | "blocked";

export interface Relationship {
  id: string;
  userId: string;
  friendId: string;
  status: string;
  trustLevel: TrustLevel | null;
  createdFromInvite: boolean;
  inviteCreatedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Friend {
  id: string;
  username: string;
  image: string | null;
}
