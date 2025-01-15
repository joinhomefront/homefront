import type { FieldValues, UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { View } from "react-native";

import { ActivityIndicator, Button, cn, Form, Text } from "@homefront/ui";

import type { OnboardingStep } from "./data";
import { useOnboardingNavigation } from "./hooks/useOnboardingNavigation";

interface BottomNavigationProps<T extends FieldValues> {
  currentStep: OnboardingStep;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  form: UseFormReturn<T, unknown, undefined>;
  continueDisabled?: boolean;
  hideSkip?: boolean;
  onContinue?: (data: T) => Promise<void>;
}

export const BottomNavigation = <T extends FieldValues>({
  currentStep,
  form,
  continueDisabled = false,
  hideSkip = false,
  onContinue,
}: BottomNavigationProps<T>) => {
  const { navigateNext } = useOnboardingNavigation({
    currentStep,
  });

  const [isNavigating, setIsNavigating] = useState(false);
  const [buttonPressed, setButtonPressed] = useState<
    "skip" | "submit" | undefined
  >();

  const {
    formState: { isSubmitting },
  } = form;

  const handleNavigateNext = async () => {
    setIsNavigating(true);
    await navigateNext();
  };

  const handleContinue = form.handleSubmit(async (data) => {
    setButtonPressed("submit");
    if (onContinue) {
      await onContinue(data).then(handleNavigateNext);
    } else {
      await handleNavigateNext();
    }
  });

  const handleSkip = async () => {
    setButtonPressed("skip");
    await handleNavigateNext();
  };

  const isSkipDisabled = isSubmitting || isNavigating;
  const isContinueDisabled = continueDisabled || isSubmitting || isNavigating;

  return (
    <View className="border-t border-gray-100 bg-white px-4 py-4">
      <View className="mx-auto w-full max-w-screen-sm">
        <Form {...form}>
          <View
            className={cn(
              "flex-row justify-between",
              hideSkip ? "justify-end" : "justify-between",
            )}
          >
            {!hideSkip && (
              <Button
                className="max-w-fit"
                variant="outline"
                disabled={isSkipDisabled}
                onPress={handleSkip}
              >
                {(isSubmitting || isNavigating) && buttonPressed === "skip" ? (
                  <ActivityIndicator className="text-primary" />
                ) : (
                  <Text>Skip</Text>
                )}
              </Button>
            )}
            <Button
              className="max-w-fit"
              disabled={isContinueDisabled}
              onPress={handleContinue}
            >
              {(isSubmitting || isNavigating) && buttonPressed === "submit" ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text>Continue</Text>
              )}
            </Button>
          </View>
        </Form>
      </View>
    </View>
  );
};
