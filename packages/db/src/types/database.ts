import type {
  Accounts,
  ActionDomainAreas,
  ActionRoles,
  Actions,
  ActionSkills,
  ActionVotes,
  AuthChallenges,
  AuthCodes,
  Avatars,
  BackupCodes,
  Clients,
  CuratedActions,
  DomainAreas,
  Equipment,
  EscoOnetMapping,
  Invites,
  Occupations,
  OccupationSkills,
  OccupationTitles,
  Population,
  RecommendedActions,
  RecoveryPhrases,
  Relationships,
  RoleDomainAreas,
  RoleOccupations,
  Roles,
  RoleSkills,
  Sessions,
  SkillDomainAreas,
  Skills,
  StripeCustomers,
  StripeEvents,
  StripePaymentIntents,
  StripePrices,
  StripeProducts,
  StripeSubscriptions,
  Tokens,
  UserActions,
  UserDomainAreas,
  UserEquipment,
  UserLocations,
  UserOccupations,
  UserRoles,
  Users,
  UserSkills,
  VerificationTokens,
} from "./tables";

export interface Database {
  accounts: Accounts;
  actionDomainAreas: ActionDomainAreas;
  actionRoles: ActionRoles;
  actionSkills: ActionSkills;
  actionVotes: ActionVotes;
  actions: Actions;
  avatars: Avatars;
  authChallenges: AuthChallenges;
  authCodes: AuthCodes;
  backupCodes: BackupCodes;
  clients: Clients;
  curatedActions: CuratedActions;
  domainAreas: DomainAreas;
  equipment: Equipment;
  escoOnetMappings: EscoOnetMapping;
  invites: Invites;
  occupationSkills: OccupationSkills;
  occupationTitles: OccupationTitles;
  occupations: Occupations;
  population: Population;
  recommendedActions: RecommendedActions;
  recoveryPhrases: RecoveryPhrases;
  relationships: Relationships;
  roleDomainAreas: RoleDomainAreas;
  roles: Roles;
  roleOccupations: RoleOccupations;
  roleSkills: RoleSkills;
  sessions: Sessions;
  skills: Skills;
  skillDomainAreas: SkillDomainAreas;
  stripeCustomers: StripeCustomers;
  stripeEvents: StripeEvents;
  stripePaymentIntents: StripePaymentIntents;
  stripePrices: StripePrices;
  stripeProducts: StripeProducts;
  stripeSubscriptions: StripeSubscriptions;
  tokens: Tokens;
  userActions: UserActions;
  userDomainAreas: UserDomainAreas;
  userEquipment: UserEquipment;
  userLocations: UserLocations;
  userOccupations: UserOccupations;
  userRoles: UserRoles;
  userSkills: UserSkills;
  users: Users;
  verificationTokens: VerificationTokens;
}
