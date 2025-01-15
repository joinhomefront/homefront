// hooks/useOnboardingNavigation.ts
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getRedirectUrl } from "@homefront/app/utils/redirect-store";

import type { OnboardingStep } from "../data";
import { ROUTES, STEP_ORDER } from "../data";
import { useOnboardingStore } from "../stores/onboarding";

export function useOnboardingNavigation({
  currentStep: initialStep,
}: {
  currentStep: OnboardingStep;
}) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { push } = useRouter();
  const pathname = usePathname();
  const {
    currentStep: storeCurrentStep,
    setStep,
    goForward,
    goBack,
  } = useOnboardingStore();

  const [currentStep, setCurrentStep] = useState<OnboardingStep>(initialStep);

  useEffect(() => {
    setCurrentStep(storeCurrentStep);
  }, [storeCurrentStep]);

  useEffect(() => {
    const matchingStep = Object.entries(ROUTES).find(
      ([_, path]) => path === pathname,
    )?.[0] as OnboardingStep;
    if (currentStep !== matchingStep) {
      setStep(matchingStep);
    }
  }, [pathname, currentStep, setStep]);

  const navigateNext = async () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    const nextStep = STEP_ORDER[currentIndex + 1];
    const redirectUrl = await getRedirectUrl();

    if (nextStep) {
      goForward();
      if (redirectUrl) {
        push(redirectUrl);
        return;
      }
      push(ROUTES[nextStep]);
    }
  };

  const navigateBack = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    const prevStep = STEP_ORDER[currentIndex - 1];

    if (prevStep) {
      goBack();
      push(ROUTES[prevStep]);
    }
  };

  return {
    navigateNext,
    navigateBack,
    currentStep,
  };
}
