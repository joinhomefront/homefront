import type { OnboardingStep } from "../data";
import { STEP_ORDER } from "../data";

interface UseOnboardingProgressProps {
  currentStep: OnboardingStep;
}

export function useOnboardingProgress({
  currentStep,
}: UseOnboardingProgressProps) {
  const currentStepNumber = STEP_ORDER.indexOf(currentStep) + 1;
  const numberOfSteps = STEP_ORDER.length;

  return {
    currentStepNumber,
    numberOfSteps,
  };
}
