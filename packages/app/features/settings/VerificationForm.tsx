import { useState } from "react";
import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { VisiblePasswordInput } from "@homefront/app/features/auth/VisiblePasswordInput";
import { getBaseUrl } from "@homefront/app/utils/base-url";
import {
  ActivityIndicator,
  Button,
  DialogHeader,
  Form,
  FormField,
  FormInput,
  Text,
} from "@homefront/ui";
import {
  APIErrorSchema,
  TwoFactorEnabledResponseSchema,
} from "@homefront/validators";

const formSchema = z.object({
  password: z.string().min(1, "Password is required"),
  totp: z.string().length(6, "Code must be 6 digits"),
  secret: z.string().length(32),
  userId: z.string().uuid(),
});

interface VerificationFormData {
  password: string;
  totp: string;
  secret: string;
  userId: string;
}

interface VerificationFormProps {
  secret: string;
  userId: string;
  onSuccess: (backupCodes: string[]) => void;
  onBack: () => void;
}

export function VerificationForm({
  secret,
  userId,
  onSuccess,
  onBack,
}: VerificationFormProps) {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<VerificationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { secret, totp: "", password: "", userId },
  });

  const enableUrl = `${getBaseUrl()}/api/auth/2fa/enable`;

  const onSubmit = async (data: VerificationFormData) => {
    try {
      const result = await fetch(enableUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!result.ok) {
        const { error } = await APIErrorSchema.parseAsync(await result.json());

        if (error?.includes("Invalid password")) {
          form.setError("password", { message: error });
          return;
        }

        if (error?.includes("Invalid authentication code")) {
          form.setError("totp", { message: error });
          return;
        }

        throw new Error(error);
      }

      const { backupCodes } = await TwoFactorEnabledResponseSchema.parseAsync(
        await result.json(),
      );

      onSuccess(backupCodes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    }
  };

  const submitDisabled = form.formState.isSubmitting || !form.formState.isValid;
  const cancelDisabled = form.formState.isSubmitting;

  return (
    <View className="gap-y-4">
      <DialogHeader>
        <Text className="text-xl font-bold">
          Set up two-factor authentication
        </Text>
      </DialogHeader>

      <Text className="text-sm">
        Enter your password and the code from your authenticator app.
      </Text>

      <Form {...form}>
        <View className="gap-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <VisiblePasswordInput
                {...field}
                label="Password"
                autoComplete="password"
                importantForAutofill="yes"
                textContentType="password"
              />
            )}
          />

          <FormField
            control={form.control}
            name="totp"
            render={({ field }) => (
              <FormInput
                {...field}
                label="Authentication Code"
                autoComplete="one-time-code"
                importantForAutofill="yes"
                keyboardType="number-pad"
                maxLength={6}
                textContentType="oneTimeCode"
              />
            )}
          />

          {error && <Text className="text-sm text-destructive">{error}</Text>}

          <View className="flex-row justify-between gap-x-4">
            <Button
              size="sm"
              variant="outline"
              onPress={onBack}
              disabled={cancelDisabled}
            >
              <Text>Back</Text>
            </Button>
            <Button
              size="sm"
              onPress={form.handleSubmit(onSubmit)}
              disabled={submitDisabled}
            >
              {form.formState.isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text>Submit</Text>
              )}
            </Button>
          </View>
        </View>
      </Form>
    </View>
  );
}
