import type { z } from "zod";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { api } from "@homefront/app/utils/trpc";
import {
  ActivityIndicator,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Form,
  FormField,
  FormOtpInput,
  Text,
} from "@homefront/ui";
import {
  APIErrorSchema,
  ChallengeFormSchema,
  ChangePasswordResponseSchema,
  ChangePasswordSchema,
  ValidateChallengeResponseSchema,
} from "@homefront/validators";

import { VisiblePasswordInput } from "../auth/VisiblePasswordInput";

interface ChallengeValidation {
  challenge: string;
}

enum ChangePasswordStep {
  CHALLENGE = "challenge",
  CHANGE = "change",
}

const passwordFormSchema = ChangePasswordSchema;

export function ChangePassword({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<ChangePasswordStep>(
    ChangePasswordStep.CHALLENGE,
  );
  const [challengeData, setChallengeData] =
    useState<ChallengeValidation | null>(null);

  const { data: challenges, isLoading: isChallengesLoading } =
    api.auth.getRequiredChallenges.useQuery(
      {
        action: "password_update",
      },
      {
        enabled: isOpen,
      },
    );

  const validateChallenge = async (
    data: z.infer<typeof ChallengeFormSchema>,
  ) => {
    try {
      const result = await fetch("/api/auth/challenges/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!result.ok) {
        const body = APIErrorSchema.parse(await result.json());
        if (body.error === "Invalid authentication code") {
          challengeForm.setError("content", {
            message: "Invalid code",
          });
        }

        throw new Error("Invalid code");
      }

      return await ValidateChallengeResponseSchema.parseAsync(
        await result.json(),
      );
    } catch (error) {
      console.error(error);
      throw new Error("Failed to validate challenge");
    }
  };

  const changePassword = async (data: {
    currentPassword: string;
    newPassword: string;
    challenge?: string;
  }) => {
    try {
      const result = await fetch("/api/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!result.ok) {
        if (result.status === 401) {
          passwordForm.setError("currentPassword", {
            message: "Invalid password",
          });
        }

        passwordForm.setError("root", {
          message: "Something went wrong",
        });

        throw new Error("Invalid password");
      }

      return await ChangePasswordResponseSchema.parseAsync(await result.json());
    } catch (error) {
      console.error(error);
      throw new Error("Failed to change password");
    }
  };

  const challengeForm = useForm<z.infer<typeof ChallengeFormSchema>>({
    resolver: zodResolver(ChallengeFormSchema),
    defaultValues: { action: "password_update", type: "totp", content: "" },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
  });

  const handleChallengeSubmit = async (
    data: z.infer<typeof ChallengeFormSchema>,
  ) => {
    if (!challenges?.[0]) return;

    try {
      const result = await validateChallenge(data);

      setChallengeData(result);
      setStep(ChangePasswordStep.CHANGE);
    } catch {
      throw new Error("Failed to validate challenge");
    }
  };

  const handlePasswordSubmit = async (
    data: z.infer<typeof passwordFormSchema>,
  ) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        ...(challengeData && {
          challenge: challengeData.challenge,
        }),
      });
      handleClose();
    } catch {
      throw new Error("Failed to change password");
    }
  };

  const handleClose = () => {
    setStep(ChangePasswordStep.CHALLENGE);
    challengeForm.reset();
    passwordForm.reset();

    onClose();
  };

  const isContinueDisabled =
    challengeForm.formState.isSubmitting || !challengeForm.formState.isValid;

  useEffect(() => {
    if (
      step === ChangePasswordStep.CHALLENGE &&
      !isChallengesLoading &&
      !challenges?.length
    ) {
      setStep(ChangePasswordStep.CHANGE);
    }
  }, [isChallengesLoading, challenges, step]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="min-w-96 max-w-96">
        {isChallengesLoading && (
          <View className="items-center justify-center p-4">
            <ActivityIndicator size="small" />
          </View>
        )}
        {step === ChangePasswordStep.CHALLENGE && !!challenges?.length && (
          <View className="space-y-4">
            <DialogHeader>
              <DialogTitle asChild>
                <Text className="text-xl font-bold">Verification required</Text>
              </DialogTitle>
            </DialogHeader>

            <Form {...challengeForm}>
              <View className="space-y-4">
                <Text className="text-sm">
                  Enter the code from your authenticator app.
                </Text>
                <FormField
                  control={challengeForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormOtpInput
                      {...field}
                      onFilled={() => {
                        if (!challengeForm.formState.isSubmitting) {
                          void challengeForm.handleSubmit(
                            handleChallengeSubmit,
                          )();
                        }
                      }}
                    />
                  )}
                />
                <View className="flex-row justify-between space-x-4">
                  <Button size="sm" variant="outline" onPress={handleClose}>
                    <Text>Cancel</Text>
                  </Button>

                  <Button
                    size="sm"
                    onPress={challengeForm.handleSubmit(handleChallengeSubmit)}
                    disabled={isContinueDisabled}
                  >
                    {challengeForm.formState.isSubmitting ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Text>Continue</Text>
                    )}
                  </Button>
                </View>
              </View>
            </Form>
          </View>
        )}

        {step === ChangePasswordStep.CHANGE && (
          <View className="space-y-4">
            <DialogHeader>
              <DialogTitle asChild>
                <Text className="text-xl font-bold">Change password</Text>
              </DialogTitle>
            </DialogHeader>

            <Form {...passwordForm} key={"${step}-form"}>
              <View className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <VisiblePasswordInput {...field} label="Old password" />
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <VisiblePasswordInput {...field} label="New password" />
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <VisiblePasswordInput
                      {...field}
                      label="Confirm new password"
                    />
                  )}
                />
                <View className="flex-row justify-between space-x-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onPress={handleClose}
                    disabled={passwordForm.formState.isSubmitting}
                  >
                    <Text>Cancel</Text>
                  </Button>

                  <Button
                    size="sm"
                    onPress={passwordForm.handleSubmit(handlePasswordSubmit)}
                    disabled={passwordForm.formState.isSubmitting}
                  >
                    {passwordForm.formState.isSubmitting ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Text>Change Password</Text>
                    )}
                  </Button>
                </View>
              </View>
            </Form>
          </View>
        )}
      </DialogContent>
    </Dialog>
  );
}
