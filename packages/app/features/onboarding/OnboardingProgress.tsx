import { View } from "react-native";

import { Progress } from "@homefront/ui";

import type { OnboardingStep } from "./data";
import { useOnboardingProgress } from "./hooks/useOnboardingProgress";

interface OnboardingProgressProps {
  currentStep: OnboardingStep;
}

export const OnboardingProgress = ({
  currentStep,
}: OnboardingProgressProps) => {
  const { numberOfSteps, currentStepNumber } = useOnboardingProgress({
    currentStep,
  });
  return (
    <View className="py-2">
      <Progress
        className="h-2 sm:h-4"
        value={currentStepNumber}
        max={numberOfSteps}
      />
    </View>
  );
};
