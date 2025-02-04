"use client";

import { useEffect, useState } from "react";
import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  ActivityIndicator,
  Button,
  Form,
  FormField,
  FormInput,
  Text,
} from "@homefront/ui";
import {
  APIErrorSchema,
  RecoveryPhraseResponseSchema,
} from "@homefront/validators";

interface RecoveryPhraseGeneratorProps {
  onGenerated: (recoveryPhrase: string) => void;
}

export const RecoveryPhraseGenerator = ({
  onGenerated,
}: RecoveryPhraseGeneratorProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const formSchema = z.object({
    password: z.string().min(8),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const generateRecoveryPhrase = async (values: z.infer<typeof formSchema>) => {
    const { password } = values;
    setIsGenerating(true);
    try {
      const res = await fetch("/api/auth/generate-recovery-phrase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Required for cookies
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const data = RecoveryPhraseResponseSchema.parse(await res.json());
        if (data.recoveryPhrase) {
          onGenerated(data.recoveryPhrase);
        }
      } else {
        const result = APIErrorSchema.parse(await res.json());
        form.setError(
          "password",
          { type: "server", message: result.error },
          { shouldFocus: true },
        );
      }

      setIsGenerating(false);
    } catch (error) {
      setIsGenerating(false);
      console.error("Recovery phrase generation failed:", error);
    }
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <View
      key="recovery-phrase-generator"
      className="gap-y-4 rounded-md border border-border bg-primary-foreground p-4"
    >
      <Text className="text-sm text-primary sm:text-base">
        <Text className="text-sm font-bold text-primary sm:text-base">
          For security purposes, you can only see your recovery phrase once.
        </Text>{" "}
        If you forgot to store it, you can generate a new one.
      </Text>
      <Form {...form}>
        <View className="gap-y-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormInput
                label="Password"
                placeholder="Enter your password"
                description="You need to enter your password to generate a new recovery phrase."
                secureTextEntry
                {...field}
              />
            )}
          />
          <Button
            className="flex-row gap-x-2"
            onPress={form.handleSubmit(generateRecoveryPhrase)}
            disabled={isGenerating || !form.formState.isValid}
          >
            {isGenerating ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <Text>
                  <RefreshCcw size={24} />
                </Text>
                <Text>Regenerate recovery phrase</Text>
              </>
            )}
          </Button>
        </View>
      </Form>
    </View>
  );
};
