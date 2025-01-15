import { Pressable, View } from "react-native";
import { ChevronLeft } from "lucide-react-native";

import { Text } from "@homefront/ui";

import type { OnboardingStep } from "./data";
import { STEP_ORDER } from "./data";
import { useOnboardingNavigation } from "./hooks/useOnboardingNavigation";

interface TopNavigationProps {
  currentStep: OnboardingStep;
}

export const TopNavigation = ({ currentStep }: TopNavigationProps) => {
  const { navigateBack } = useOnboardingNavigation({ currentStep });
  const isFirstStep = currentStep === STEP_ORDER[0];

  return (
    <View className="flex-row items-center justify-between py-2">
      {isFirstStep ? (
        <View className="flex-1 flex-wrap py-2">
          <Text className="text-sm text-primary sm:text-base">
            Before we get started, let's secure your account.
          </Text>
        </View>
      ) : (
        <Pressable
          onPress={navigateBack}
          className="group max-w-fit flex-row space-x-1 px-1 py-2 text-primary hover:text-primary-background"
        >
          <ChevronLeft size={24} />
          <Text className="text-primary group-hover:text-primary-background">
            Go back
          </Text>
        </Pressable>
      )}
    </View>
  );
};
