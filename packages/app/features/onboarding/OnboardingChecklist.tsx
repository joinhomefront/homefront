"use client";

import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ContactRound,
  HeartHandshake,
  Key,
  MapPinned,
  Puzzle,
  UserCircle,
} from "lucide-react-native";
import { Link } from "solito/link";

import { useUser } from "@homefront/app/hooks/useUser";
import { getRecoveryPhrase } from "@homefront/app/utils/recovery-phrase-store";
import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Chevron3, H3, Progress, Text } from "@homefront/ui";

import { OnboardingStep, ROUTES, STEP_ORDER } from "./data";

const STEP_LABELS = {
  [OnboardingStep.RecoveryPhrase]: "Save your recovery phrase",
  [OnboardingStep.Avatar]: "Choose your avatar",
  [OnboardingStep.DomainAreas]: "Choose your interests",
  [OnboardingStep.Invites]: "Invite people you trust",
  [OnboardingStep.Location]: "Add your location",
  [OnboardingStep.Occupation]: "Add your work experience",
  [OnboardingStep.Skills]: "Add your skills",
  [OnboardingStep.Roles]: "Choose volunteer roles",
};

const STEP_DESCRIPTIONS = {
  [OnboardingStep.RecoveryPhrase]:
    "You'll need it to recover your account if you forget your password.",
  [OnboardingStep.Avatar]:
    "Step into the fight with an avatar that inspires you.",
  [OnboardingStep.DomainAreas]:
    "How do you think you could help? What do you want to learn?",
  [OnboardingStep.Invites]:
    "Help build a trusted community ready to organize and take action when it matters most.",
  [OnboardingStep.Location]:
    "Get connected to your community and learn what's happening near you.",
  [OnboardingStep.Occupation]:
    "Your work experience can help us match you to volunteer roles that make the most of your skills.",
  [OnboardingStep.Skills]:
    "Add your skills to find better volunteer roles, resources, and relevant actions.",
  [OnboardingStep.Roles]: "Choose the volunteer roles that interest you most.",
};

const STEP_ICONS = {
  [OnboardingStep.RecoveryPhrase]: Key,
  [OnboardingStep.Avatar]: UserCircle,
  [OnboardingStep.DomainAreas]: HeartHandshake,
  [OnboardingStep.Invites]: ContactRound,
  [OnboardingStep.Location]: MapPinned,
  [OnboardingStep.Occupation]: BriefcaseBusiness,
  [OnboardingStep.Skills]: Chevron3,
  [OnboardingStep.Roles]: Puzzle,
};

export function OnboardingChecklist() {
  // Query user data
  const { user, isLoading: isUserLoading } = useUser();

  // Query recovery phrase status
  const { data: recoveryPhrase } = useQuery({
    queryKey: ["recovery-phrase"],
    queryFn: getRecoveryPhrase,
  });

  // Query for user's profile data
  const { data: location, isLoading: isLocationLoading } =
    api.userLocations.getUserLocation.useQuery();
  const { data: userOccupations, isLoading: isUserOccupationsLoading } =
    api.occupations.getUserOccupations.useQuery();
  const { data: userSkills, isLoading: isUserSkillsLoading } =
    api.skills.getUserSkills.useQuery();
  const { data: userRoles, isLoading: isUserRolesLoading } =
    api.roles.getUserRoles.useQuery();
  const { data: userDomainAreas, isLoading: isUserDomainAreasLoading } =
    api.domainAreas.getAllDomainAreas.useQuery();
  const { data: relationships, isLoading: isRelationshipsLoading } =
    api.relationships.getRelationships.useQuery();
  const { data: userInvites, isLoading: isUserInvitesLoading } =
    api.invites.getUserInvites.useQuery();

  const checkStepCompletion = (step: OnboardingStep): boolean => {
    switch (step) {
      case OnboardingStep.RecoveryPhrase:
        return !recoveryPhrase; // If phrase is null/undefined, it means it was downloaded
      case OnboardingStep.Avatar:
        return !!user?.image;
      case OnboardingStep.DomainAreas:
        return userDomainAreas?.some((area) => area.hasDomainArea) ?? false;
      case OnboardingStep.Invites:
        return !!userInvites?.length || !!relationships?.length;
      case OnboardingStep.Location:
        return !!location;
      case OnboardingStep.Occupation:
        return !!userOccupations?.length;
      case OnboardingStep.Skills:
        return !!userSkills?.length;
      case OnboardingStep.Roles:
        return !!userRoles?.length;
      default:
        return false;
    }
  };

  const isLoading =
    isLocationLoading ||
    isUserOccupationsLoading ||
    isUserSkillsLoading ||
    isUserRolesLoading ||
    isUserDomainAreasLoading ||
    isRelationshipsLoading ||
    isUserInvitesLoading ||
    isUserLoading;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  const incompleteSteps = STEP_ORDER.filter(
    (step) => step !== OnboardingStep.Completed && !checkStepCompletion(step),
  );

  if (incompleteSteps.length === 0) {
    return null;
  }

  const totalStepsCount = STEP_ORDER.filter(
    (step) => step !== OnboardingStep.Completed,
  ).length;
  const incompleteStepsCount = incompleteSteps.length;
  const stepsCompleted = totalStepsCount - incompleteStepsCount;

  return (
    <View>
      <H3 className="font-header-bold uppercase text-primary">
        Complete your profile
      </H3>
      <View className="pt-4">
        <Progress
          className="h-2 max-w-60"
          value={stepsCompleted}
          max={totalStepsCount}
        />
      </View>
      <View className="gap-y-1 py-4">
        {STEP_ORDER.map((step) => {
          if (step === OnboardingStep.Completed) return null;

          const completed = checkStepCompletion(step);

          if (completed) {
            return (
              <View key={step} className="flex-row items-center gap-x-2">
                <CheckCircle2 size={24} className="text-primary" />
                <Text className="text-gray-500 line-through">
                  {STEP_LABELS[step]}
                </Text>
              </View>
            );
          }

          const LucideIcon = STEP_ICONS[step];

          return (
            <Link key={step} href={ROUTES[step]}>
              <View className="group py-1">
                <View className="group flex-row items-center gap-x-2">
                  <LucideIcon
                    size={24}
                    className="text-primary group-hover:text-primary-800"
                  />
                  <Text className="font-bold text-primary group-hover:text-primary-800 group-hover:underline">
                    {STEP_LABELS[step]}
                  </Text>
                  <ArrowRight
                    size={16}
                    className="text-primary group-hover:text-primary-800"
                  />
                </View>
                <Text className="max-w-prose pl-8 text-sm text-gray-500 group-hover:text-primary">
                  {STEP_DESCRIPTIONS[step]}
                </Text>
              </View>
            </Link>
          );
        })}
      </View>
    </View>
  );
}
