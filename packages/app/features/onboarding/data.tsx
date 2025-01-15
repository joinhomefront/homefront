export enum OnboardingStep {
  RecoveryPhrase = "RecoveryPhrase",
  Avatar = "Avatar",
  DomainAreas = "DomainAreas",
  Invites = "Invites",
  Location = "Location",
  Occupation = "Occupation",
  Skills = "Skills",
  Roles = "Roles",
  Completed = "Completed",
}

export const ROUTES = {
  [OnboardingStep.RecoveryPhrase]: "/onboarding/recovery-phrase",
  [OnboardingStep.Avatar]: "/onboarding/avatar",
  [OnboardingStep.DomainAreas]: "/onboarding/domain-areas",
  [OnboardingStep.Invites]: "/onboarding/invites",
  [OnboardingStep.Location]: "/onboarding/location",
  [OnboardingStep.Occupation]: "/onboarding/occupation",
  [OnboardingStep.Skills]: "/onboarding/skills",
  [OnboardingStep.Roles]: "/onboarding/roles",
  [OnboardingStep.Completed]: "/home",
} as const;

export const STEP_ORDER = [
  OnboardingStep.RecoveryPhrase,
  OnboardingStep.Avatar,
  OnboardingStep.DomainAreas,
  OnboardingStep.Invites,
  OnboardingStep.Location,
  OnboardingStep.Occupation,
  OnboardingStep.Skills,
  OnboardingStep.Roles,
  OnboardingStep.Completed,
];
