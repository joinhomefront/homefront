import { useState } from "react";
import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  ActivityIndicator,
  Button,
  DialogHeader,
  Form,
  FormField,
  FormInput,
  Text,
} from "@homefront/ui";
import { APIErrorSchema } from "@homefront/validators";

import { VisiblePasswordInput } from "../auth/VisiblePasswordInput";

const formSchema = z.object({
  password: z.string().min(1, "Password is required"),
  totp: z.string().length(6, "Code must be 6 digits"),
  userId: z.string().uuid(),
});

interface DisableVerificationFormProps {
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function DisableVerificationForm({
  userId,
  onSuccess,
  onCancel,
}: DisableVerificationFormProps) {
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { userId, password: "", totp: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const result = await fetch("/api/auth/2fa/disable", {
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

        throw new Error(error ?? "Verification failed");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    }
  };

  const submitDisabled = form.formState.isSubmitting || !form.formState.isValid;
  const cancelDisabled = form.formState.isSubmitting;

  return (
    <View className="space-y-4">
      <DialogHeader>
        <Text className="text-xl font-bold">
          Disable two-factor authentication
        </Text>
      </DialogHeader>

      <Text className="text-sm">
        Enter your password and authentication code to disable two-factor
        authentication.
      </Text>

      <Form {...form}>
        <View className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <VisiblePasswordInput
                {...field}
                label="Password"
                autoComplete="current-password"
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

          <View className="flex-row justify-between space-x-4">
            <Button
              size="sm"
              variant="outline"
              onPress={onCancel}
              disabled={cancelDisabled}
            >
              <Text>Cancel</Text>
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onPress={form.handleSubmit(onSubmit)}
              disabled={submitDisabled}
            >
              {form.formState.isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text>Disable</Text>
              )}
            </Button>
          </View>
        </View>
      </Form>
    </View>
  );
}
