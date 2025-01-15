"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { OnboardingStep, STEP_ORDER } from "../data";

interface OnboardingState {
  currentStep: OnboardingStep;
  goForward: () => void;
  goBack: () => void;
  setStep: (step: OnboardingStep) => void;
  resetOnboarding: () => void;
  isStepComplete: (step: OnboardingStep) => boolean;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      currentStep: OnboardingStep.RecoveryPhrase,

      goForward: () => {
        const currentIndex = STEP_ORDER.indexOf(get().currentStep);
        const nextStep = STEP_ORDER[currentIndex + 1];
        if (nextStep) {
          set({ currentStep: nextStep });
        }
      },

      goBack: () => {
        const currentIndex = STEP_ORDER.indexOf(get().currentStep);
        const previousStep = STEP_ORDER[currentIndex - 1];
        if (previousStep) {
          set({ currentStep: previousStep });
        }
      },

      setStep: (step: OnboardingStep) => {
        set({ currentStep: step });
      },

      resetOnboarding: () => {
        set({ currentStep: OnboardingStep.RecoveryPhrase });
      },

      isStepComplete: (step: OnboardingStep) => {
        const currentIndex = STEP_ORDER.indexOf(get().currentStep);
        const stepIndex = STEP_ORDER.indexOf(step);
        return stepIndex < currentIndex;
      },
    }),
    {
      name: "onboarding-storage",
    },
  ),
);
