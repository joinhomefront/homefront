import type {
  CodeChallengeMethod,
  GrantIdentifier,
} from "@jmondi/oauth2-server";
import type {
  Generated,
  GeneratedAlways,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

import type {
  ActionStatus,
  ActionType,
  DonationProduct,
  DonationType,
  EscoRelationType,
  EscoSkillType,
  OccupationDataSource,
  PriorityLevel,
  RelationshipStatus,
  ReportedType,
  ReportReason,
  ResourceType,
  RoleForUser,
  SkillLevel,
  StripeEventStatus,
  TrustLevel,
  Vote,
} from "./columns";

export interface Accounts {
  id: GeneratedAlways<string>;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: Lowercase<string> | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
}

export type Account = Selectable<Accounts>;
export type NewAccount = Insertable<Accounts>;

export interface ActionDomainAreas {
  id: GeneratedAlways<string>;
  actionId: string;
  domainAreaId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type ActionDomainArea = Selectable<ActionDomainAreas>;
export type NewActionDomainArea = Insertable<ActionDomainAreas>;
export type ActionDomainAreaUpdate = Updateable<ActionDomainAreas>;

export interface ActionRoles {
  id: GeneratedAlways<string>;
  priority: PriorityLevel | null;
  actionId: string;
  roleId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type ActionRole = Selectable<ActionRoles>;
export type NewActionRole = Insertable<ActionRoles>;
export type ActionRoleUpdate = Updateable<ActionRoles>;

export interface ActionSkills {
  id: GeneratedAlways<string>;
  level: SkillLevel | null;
  actionId: string;
  skillId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type ActionSkill = Selectable<ActionSkills>;
export type NewActionSkill = Insertable<ActionSkills>;
export type ActionSkillUpdate = Updateable<ActionSkills>;

export interface ActionVotes {
  id: GeneratedAlways<string>;
  userId: string;
  actionId: string;
  vote: Vote;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type ActionVote = Selectable<ActionVotes>;
export type NewActionVote = Insertable<ActionVotes>;
export type ActionVoteUpdate = Updateable<ActionVotes>;

export interface Actions {
  id: GeneratedAlways<string>;
  title: string;
  description: string | null;
  body: string | null;
  type: ActionType;
  status: ActionStatus | null;
  dueDate: Date | null;
  isDueDateOverridable: boolean | null;
  dueTime: Date | null;
  isDueTimeOverridable: boolean | null;
  completedAt: Date | null;
  createdBy: string;
  votes: number;
  hotScore: number;
  risingScore: number;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type Action = Selectable<Actions>;
export type NewAction = Insertable<Actions>;
export type ActionUpdate = Updateable<Actions>;

export interface Avatars {
  id: GeneratedAlways<string>;
  filename: string;
  displayName: string;
  wikipediaUrl: string | null;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type Avatar = Selectable<Avatars>;
export type NewAvatar = Insertable<Avatars>;
export type AvatarUpdate = Updateable<Avatars>;

export interface AuthChallenges {
  id: GeneratedAlways<string>;
  challenge: string;
  userId: string;
  expiresAt: Date;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type AuthChallenge = Selectable<AuthChallenges>;
export type NewAuthChallenge = Insertable<AuthChallenges>;
export type AuthChallengeUpdate = Updateable<AuthChallenges>;

export interface AuthCodes {
  code: string;
  redirectUri?: string | null;
  codeChallenge?: string | null;
  codeChallengeMethod?: CodeChallengeMethod | null;
  expiresAt: Date;
  userId?: string | null;
  clientId: string;
  scopes: JSONColumnType<string[]>;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type AuthCode = Selectable<AuthCodes>;
export type NewAuthCode = Insertable<AuthCodes>;
export type AuthCodeUpdate = Updateable<AuthCodes>;

export interface BackupCodes {
  id: GeneratedAlways<string>;
  userId: string;
  codeHash: string;
  used: boolean;
  usedAt: Date | null;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type BackupCode = Selectable<BackupCodes>;
export type NewBackupCode = Insertable<BackupCodes>;
export type BackupCodeUpdate = Updateable<BackupCodes>;

export interface Clients {
  id: string;
  secret?: string;
  name: string;
  allowedGrants: GrantIdentifier[];
  redirectUris: string[];
  scopes: JSONColumnType<string[]>;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type Client = Selectable<Clients>;
export type NewClient = Insertable<Clients>;
export type ClientUpdate = Updateable<Clients>;

export interface CuratedActions {
  id: GeneratedAlways<string>;
  position: string;
  actionId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type CuratedAction = Selectable<CuratedActions>;
export type NewCuratedAction = Insertable<CuratedActions>;
export type CuratedActionUpdate = Updateable<CuratedActions>;

export interface DomainAreas {
  id: GeneratedAlways<string>;
  title: string;
  description: string | null;
  slug: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type DomainArea = Selectable<DomainAreas>;
export type NewDomainArea = Insertable<DomainAreas>;
export type DomainAreaUpdate = Updateable<DomainAreas>;

export interface EscoOnetMapping {
  id: GeneratedAlways<string>;
  escoCode: string;
  escoTitle: string;
  onetSocCode: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export interface Equipment {
  id: GeneratedAlways<string>;
  title: string;
  description: string | null;
  onetTitle: string | null;
  onetCode: string | null;
  onetExampleCommodity: string | null;
  onetSoceCode: string | null;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type EquipmentItem = Selectable<Equipment>;
export type NewEquipmentItem = Insertable<Equipment>;
export type EquipmentItemUpdate = Updateable<Equipment>;

export interface Invites {
  id: GeneratedAlways<string>;
  userId: string;
  code: string;
  used: boolean;
  expiresAt: Date;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type Invite = Selectable<Invites>;
export type NewInvite = Insertable<Invites>;
export type InviteUpdate = Updateable<Invites>;

export interface Occupations {
  id: GeneratedAlways<string>;
  title: string;
  description: string | null;
  escoCode: string | null;
  escoTitle: string | null;
  escoDescription: string | null;
  escoConceptUri: string | null;
  onetTitle: string | null;
  onetSocCode: string | null;
  source: OccupationDataSource | null;
  relevance: string | null;
  priority: PriorityLevel | null;
  roleJustification: string | null;
  operationalConditions: JSONColumnType<string[]> | null;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type Occupation = Selectable<Occupations>;
export type NewOccupation = Insertable<Occupations>;
export type OccupationUpdate = Updateable<Occupations>;

export interface OccupationSkills {
  id: GeneratedAlways<string>;
  level: SkillLevel | null;
  escoRelationType: EscoRelationType | null;
  escoSkillType: EscoSkillType | null;
  occupationId: string;
  skillId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type OccupationSkill = Selectable<OccupationSkills>;
export type NewOccupationSkill = Insertable<OccupationSkills>;
export type OccupationSkillUpdate = Updateable<OccupationSkills>;

export interface OccupationTitles {
  id: GeneratedAlways<string>;
  title: string;
  escoCode: string | null;
  escoTitle: string | null;
  onetTitle: string | null;
  onetSocCode: string | null;
  source: OccupationDataSource | null;
  occupationId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type OccupationTitle = Selectable<OccupationTitles>;
export type NewOccupationTitle = Insertable<OccupationTitles>;
export type OccupationTitleUpdate = Updateable<OccupationTitles>;

export interface Population {
  fid: number;
  population: number;
  geom: unknown; // geometry(Geometry,3857)
  h3: string; // h3index
}

export type PopulationItem = Selectable<Population>;

export interface RecommendedActions {
  id: GeneratedAlways<string>;
  position: string;
  accepted: boolean;
  respondedAt: Date | null;
  actionId: string;
  userId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type RecommendedAction = Selectable<RecommendedActions>;
export type NewRecommendedAction = Insertable<RecommendedActions>;
export type RecommendedActionUpdate = Updateable<RecommendedActions>;

export interface RecoveryPhrases {
  id: GeneratedAlways<string>;
  userId: string;
  phraseHash: string;
  createdAt: Generated<Date>;
}

export type RecoveryPhrase = Selectable<RecoveryPhrases>;
export type NewRecoveryPhrase = Insertable<RecoveryPhrases>;
export type RecoveryPhraseUpdate = Updateable<RecoveryPhrases>;

export interface Relationships {
  id: GeneratedAlways<string>;
  userId: string;
  friendId: string;
  status: RelationshipStatus;
  trustLevel: TrustLevel | null;
  createdFromInvite: boolean;
  inviteCreatedAt: Date | null;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type Relationship = Selectable<Relationships>;
export type NewRelationship = Insertable<Relationships>;
export type RelationshipUpdate = Updateable<Relationships>;

export interface Reports {
  id: GeneratedAlways<string>;
  userId: string;
  reportedId: string;
  reportedType: ReportedType;
  reason: ReportReason;
  reasonDetails: string | null;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type Report = Selectable<Reports>;
export type NewReport = Insertable<Reports>;
export type ReportUpdate = Updateable<Reports>;

export interface Resources {
  id: GeneratedAlways<string>;
  type: ResourceType;
  title: string;
  description: string | null;
  body: string | null;
  url: string | null;
  urlHash: string | null;
  canonicalUrl: string | null;
  image: string | null;
  metadata: JSONColumnType<Record<string, unknown>> | null;
  sharedBy: string;
  hotScore: number;
  risingScore: number;
  votes: number;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type Resource = Selectable<Resources>;
export type NewResource = Insertable<Resources>;
export type ResourceUpdate = Updateable<Resources>;

export interface ResourceBookmarks {
  id: GeneratedAlways<string>;
  userId: string;
  resourceId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type ResourceBookmark = Selectable<ResourceBookmarks>;
export type NewResourceBookmark = Insertable<ResourceBookmarks>;
export type ResourceBookmarkUpdate = Updateable<ResourceBookmarks>;

export interface ResourceDomainAreas {
  id: GeneratedAlways<string>;
  resourceId: string;
  domainAreaId: string;
  createdBy: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type ResourceDomainArea = Selectable<ResourceDomainAreas>;
export type NewResourceDomainArea = Insertable<ResourceDomainAreas>;
export type ResourceDomainAreaUpdate = Updateable<ResourceDomainAreas>;

export interface ResourceVotes {
  id: GeneratedAlways<string>;
  userId: string;
  resourceId: string;
  vote: Vote;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type ResourceVote = Selectable<ResourceVotes>;
export type NewResourceVote = Insertable<ResourceVotes>;
export type ResourceVoteUpdate = Updateable<ResourceVotes>;

export interface RoleOccupations {
  id: GeneratedAlways<string>;
  roleId: string;
  occupationId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type RoleOccupation = Selectable<RoleOccupations>;
export type NewRoleOccupation = Insertable<RoleOccupations>;
export type RoleOccupationUpdate = Updateable<RoleOccupations>;

export interface RoleSkills {
  id: GeneratedAlways<string>;
  level: SkillLevel | null;
  levelRequired: boolean | null;
  roleId: string;
  skillId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type RoleSkill = Selectable<RoleSkills>;
export type NewRoleSkill = Insertable<RoleSkills>;
export type RoleSkillUpdate = Updateable<RoleSkills>;

export interface Roles {
  id: GeneratedAlways<string>;
  title: string;
  description: string | null;
  priority: PriorityLevel | null;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type Role = Selectable<Roles>;
export type NewRole = Insertable<Roles>;
export type RoleUpdate = Updateable<Roles>;

export interface RoleDomainAreas {
  id: GeneratedAlways<string>;
  roleId: string;
  domainAreaId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type RoleDomainArea = Selectable<RoleDomainAreas>;
export type NewRoleDomainArea = Insertable<RoleDomainAreas>;
export type RoleDomainAreaUpdate = Updateable<RoleDomainAreas>;

export interface Sessions {
  id: GeneratedAlways<string>;
  userId: string;
  sessionToken: string;
  expires: Date;
}

export type Session = Selectable<Sessions>;
export type NewSession = Insertable<Sessions>;
export type SessionUpdate = Updateable<Sessions>;

export interface Skills {
  id: GeneratedAlways<string>;
  title: string;
  description: string | null;
  escoTitle: string | null;
  escoDescription: string | null;
  escoSkillType: EscoSkillType | null;
  escoConceptUri: string | null;
  isEscoPreferredLabel: boolean | null;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type Skill = Selectable<Skills>;
export type NewSkill = Insertable<Skills>;
export type SkillUpdate = Updateable<Skills>;

export interface SkillDomainAreas {
  id: GeneratedAlways<string>;
  skillId: string;
  domainAreaId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type SkillDomainArea = Selectable<SkillDomainAreas>;
export type NewSkillDomainArea = Insertable<SkillDomainAreas>;
export type SkillDomainAreaUpdate = Updateable<SkillDomainAreas>;

export interface StripeCustomers {
  id: GeneratedAlways<string>;
  userId: string;
  stripeCustomerId: string;
  stripeCustomerIdHash: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type StripeCustomer = Selectable<StripeCustomers>;
export type NewStripeCustomer = Insertable<StripeCustomers>;
export type StripeCustomerUpdate = Updateable<StripeCustomers>;

export interface StripeEvents {
  id: GeneratedAlways<string>;
  stripeEventId: string;
  stripeEventIdHash: string;
  type: string;
  status: StripeEventStatus;
  error: string | null;
  processedAt: Date | null;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type StripeEvent = Selectable<StripeEvents>;
export type NewStripeEvent = Insertable<StripeEvents>;
export type StripeEventUpdate = Updateable<StripeEvents>;

export interface StripePaymentIntents {
  id: GeneratedAlways<string>;
  stripeCustomerId: string;
  stripeCustomerIdHash: string;
  stripePaymentIntentId: string;
  stripePaymentIntentIdHash: string;
  stripePriceId: string;
  amount: number;
  status: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type StripePaymentIntent = Selectable<StripePaymentIntents>;
export type NewStripePaymentIntent = Insertable<StripePaymentIntents>;
export type StripePaymentIntentUpdate = Updateable<StripePaymentIntents>;

export interface StripePrices {
  id: GeneratedAlways<string>;
  stripePriceId: string;
  stripeProductId: string;
  amount: number | null;
  type: DonationType;
  lookupKey: string | null;
  active: boolean;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type StripePrice = Selectable<StripePrices>;
export type NewStripePrice = Insertable<StripePrices>;
export type StripePriceUpdate = Updateable<StripePrices>;

export interface StripeProducts {
  id: GeneratedAlways<string>;
  stripeProductId: string;
  name: DonationProduct | string;
  active: boolean;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type StripeProduct = Selectable<StripeProducts>;
export type NewStripeProduct = Insertable<StripeProducts>;
export type StripeProductUpdate = Updateable<StripeProducts>;

export interface StripeSubscriptions {
  id: GeneratedAlways<string>;
  stripeSubscriptionId: string;
  stripeSubscriptionIdHash: string;
  stripeCustomerId: string;
  stripeCustomerIdHash: string;
  stripePriceId: string;
  status: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  cancelAt: number | null;
  canceledAt: number | null;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type StripeSubscription = Selectable<StripeSubscriptions>;
export type NewStripeSubscription = Insertable<StripeSubscriptions>;
export type StripeSubscriptionUpdate = Updateable<StripeSubscriptions>;

export interface Tokens {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken?: string | null;
  refreshTokenExpiresAt?: Date | null;
  clientId: string;
  userId?: string;
  scopes: JSONColumnType<string[]>;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type Token = Selectable<Tokens>;
export type NewToken = Insertable<Tokens>;
export type TokenUpdate = Updateable<Tokens>;

export interface UserActions {
  id: GeneratedAlways<string>;
  position: string;
  completed: boolean;
  completedAt: Date | null;
  dueDate: Date | null;
  dueTime: Date | null;
  userId: string;
  actionId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type UserAction = Selectable<UserActions>;
export type NewUserAction = Insertable<UserActions>;
export type UserActionUpdate = Updateable<UserActions>;

export interface UserDomainAreas {
  id: GeneratedAlways<string>;
  userId: string;
  domainAreaId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type UserDomainArea = Selectable<UserDomainAreas>;
export type NewUserDomainArea = Insertable<UserDomainAreas>;
export type UserDomainAreaUpdate = Updateable<UserDomainAreas>;

export interface UserEquipment {
  id: GeneratedAlways<string>;
  userId: string;
  quantity: number | null;
  equipmentId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type UserEquipmentItem = Selectable<UserEquipment>;
export type NewUserEquipmentItem = Insertable<UserEquipment>;
export type UserEquipmentItemUpdate = Updateable<UserEquipment>;

export interface UserLocations {
  id: GeneratedAlways<string>;
  hex: string;
  userId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type UserLocation = Selectable<UserLocations>;
export type NewUserLocation = Insertable<UserLocations>;
export type UserLocationUpdate = Updateable<UserLocations>;

export interface UserOccupations {
  id: GeneratedAlways<string>;
  title: string;
  userId: string;
  occupationId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type UserOccupation = Selectable<UserOccupations>;
export type NewUserOccupation = Insertable<UserOccupations>;
export type UserOccupationUpdate = Updateable<UserOccupations>;

export interface Users {
  id: GeneratedAlways<string>;
  username: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  passwordHash: string;
  image: string | null;
  role: RoleForUser;
  twoFactorEnabled: boolean;
  twoFactorSecret: string | null;
}

export type User = Selectable<Users>;
export type SanitizedUser = Omit<User, "passwordHash" | "twoFactorSecret">;
export type NewUser = Insertable<Users>;
export type UserUpdate = Updateable<Users>;

export interface UserRoles {
  id: GeneratedAlways<string>;
  userId: string;
  roleId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type UserRole = Selectable<UserRoles>;
export type NewUserRole = Insertable<UserRoles>;
export type UserRoleUpdate = Updateable<UserRoles>;

export interface UserSkills {
  id: GeneratedAlways<string>;
  level: SkillLevel | null;
  userId: string;
  skillId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type UserSkill = Selectable<UserSkills>;
export type NewUserSkill = Insertable<UserSkills>;
export type UserSkillUpdate = Updateable<UserSkills>;

export interface VerificationTokens {
  identifier: string;
  token: string;
  expires: Date;
}

export type VerificationToken = Selectable<VerificationTokens>;
