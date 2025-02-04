"use client";

import { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  Brain,
  Copy,
  CopyCheck,
  Download,
  Key,
  KeyRound,
  NotepadText,
} from "lucide-react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  deleteRecoveryPhrase,
  getRecoveryPhrase,
} from "@homefront/app/utils/recovery-phrase-store";
import {
  ActivityIndicator,
  Button,
  cn,
  Form,
  FormCheckbox,
  FormField,
  H4,
  Text,
} from "@homefront/ui";

import { OnboardingStep } from "./data";
import { Header } from "./Header";
import { useOnboardingNavigation } from "./hooks/useOnboardingNavigation";
import { OnboardingHeader } from "./OnboardingHeader";
import { RecoveryPhraseGenerator } from "./RecoveryPhraseGenerator";

export function RecoveryPhrase() {
  const [copied, setCopied] = useState(false);
  const [_deletionError, setDeletionError] = useState<string | null>(null);
  const { navigateNext } = useOnboardingNavigation({
    currentStep: OnboardingStep.RecoveryPhrase,
  });

  const {
    data: storedRecoveryPhrase,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recovery-phrase"],
    queryFn: getRecoveryPhrase,
  });

  const [recoveryPhrase, setRecoveryPhrase] = useState<
    string | null | undefined
  >(storedRecoveryPhrase);

  useEffect(() => {
    if (!recoveryPhrase && storedRecoveryPhrase) {
      setRecoveryPhrase(storedRecoveryPhrase);
      deleteRecoveryPhrase()
        .then(() => console.log("Recovery phrase successfully deleted"))
        .catch((err: unknown) => {
          if (err instanceof Error && typeof err.message === "string") {
            setDeletionError(err.message);
          } else {
            setDeletionError("An error occurred");
          }
        });
    }
  }, [recoveryPhrase, storedRecoveryPhrase]);

  const formSchema = z.object({
    recoveryPhraseConfirmation: z.boolean().refine(
      (value) => {
        // If there is no recovery phrase, the checkbox is not required
        if (!recoveryPhrase) {
          return true;
        }
        // If there is a recovery phrase, the checkbox must be checked
        return value === true;
      },
      {
        message:
          "You must confirm that you have written down your recovery phrase.",
      },
    ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recoveryPhraseConfirmation: false,
    },
  });

  const copyToClipboard = async () => {
    if (recoveryPhrase) await Clipboard.setStringAsync(recoveryPhrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  const handleDownload = async () => {
    if (recoveryPhrase) {
      if (Platform.OS === "web") {
        const uri = `data:text/plain;charset=utf-8,${encodeURIComponent(
          recoveryPhrase,
        )}`;
        const downloadLink = document.createElement("a");
        downloadLink.href = uri;
        downloadLink.download = "recovery-phrase.txt";
        downloadLink.click();
      } else {
        const fileUri = `${FileSystem.documentDirectory}recovery-phrase.txt`;
        await FileSystem.writeAsStringAsync(fileUri, recoveryPhrase, {
          encoding: FileSystem.EncodingType.UTF8,
        });

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri);
        } else {
          alert("Sharing is not available on this device.");
        }
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!recoveryPhrase) {
      await navigateNext();
    }

    if (values.recoveryPhraseConfirmation) {
      deleteRecoveryPhrase()
        .then(async () => {
          await navigateNext();
        })
        .catch((err: unknown) => {
          if (err instanceof Error && typeof err.message === "string") {
            setDeletionError(err.message);
          } else {
            setDeletionError("An error occurred");
          }
        });
    }
  };

  const handleGenerated = (recoveryPhrase: string) => {
    setRecoveryPhrase(recoveryPhrase);
    return;
  };

  const hasRecoveryPhrase = !!recoveryPhrase;
  const submitDisabled = hasRecoveryPhrase
    ? !form.watch("recoveryPhraseConfirmation")
    : false;

  return (
    <View className="flex w-full">
      <View className="mx-auto w-full max-w-screen-sm flex-1 justify-center">
        <OnboardingHeader />
        <View className="mx-auto px-4">
          <Header
            currentStep={OnboardingStep.RecoveryPhrase}
            icon={KeyRound}
            title="Your recovery phrase"
          >
            <Text className="text-base">
              Your recovery phrase is a series of 12 words in a specific order.
            </Text>
          </Header>
          <View className="flex-row items-start gap-x-2 rounded-md border border-amber-600 bg-amber-100 p-4">
            <AlertCircle className="text-amber-800" size={24} />
            <Text className="flex-1 text-sm text-amber-800 sm:text-base">
              <Text className="text-sm font-bold text-amber-800 sm:text-base">
                Please keep it safe.
              </Text>{" "}
              You'll need it to recover your account if you forget your
              password.
            </Text>
          </View>
          <View className="gap-y-2 py-4 pl-2">
            <Text className="text-sm font-bold">Tips:</Text>
            <View className="flex-row items-center gap-x-2">
              <Key size={16} />
              <Text className="flex-1 text-sm">
                Store this phrase in a password manager like 1Password or Proton
                Pass.
              </Text>
            </View>
            <View className="flex-row items-center gap-x-2">
              <NotepadText size={16} />
              <Text className="flex-1 text-sm">
                Write this phrase down on a piece of paper and store it in a
                secure location.
              </Text>
            </View>
            <View className="flex-row items-center gap-x-2">
              <Brain size={16} />
              <Text className="flex-1 text-sm">Memorize this phrase.</Text>
            </View>
            <View className="flex-row items-center gap-x-2">
              <Download size={16} />
              <View className="inline flex-1 flex-wrap items-center gap-x-1">
                {recoveryPhrase ? (
                  <Button size="inline" variant="link" onPress={handleDownload}>
                    <Text className="text-sm">Download this phrase</Text>
                  </Button>
                ) : (
                  <Text className="text-sm">Download this phrase</Text>
                )}
                <Text className="text-sm">
                  and store it on an external encrypted storage device.
                </Text>
              </View>
            </View>
          </View>

          <View className="gap-y-2 py-4">
            <H4>Recovery phrase</H4>
            {isLoading && (
              <View className="items-center justify-center">
                <ActivityIndicator size="small" />
              </View>
            )}
            {error && <Text>Error loading recovery phrase.</Text>}
            {recoveryPhrase ? (
              <View className="flex-row rounded-md border border-border p-4">
                <Text className="font-mono">{recoveryPhrase}</Text>
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={copyToClipboard}
                  className="h-12"
                >
                  {copied ? <CopyCheck size={24} /> : <Copy size={24} />}
                </Button>
              </View>
            ) : (
              <RecoveryPhraseGenerator onGenerated={handleGenerated} />
            )}
            {copied && (
              <Text className="text-right text-sm font-bold text-primary">
                Copied to clipboard!
              </Text>
            )}
          </View>
          <Form {...form}>
            {recoveryPhrase && (
              <FormField
                control={form.control}
                name="recoveryPhraseConfirmation"
                render={({ field }) => (
                  <View className="flex-wrap">
                    <FormCheckbox
                      label="I have saved my recovery phrase somewhere safe."
                      {...field}
                    />
                  </View>
                )}
              />
            )}

            <View
              className={cn(
                "flex-row py-4",
                recoveryPhrase ? "justify-between" : "justify-end",
              )}
            >
              {recoveryPhrase && (
                <Button
                  className="max-w-fit"
                  variant="outline"
                  onPress={handleDownload}
                >
                  <Text>Download</Text>
                </Button>
              )}
              <Button
                className="max-w-fit"
                disabled={submitDisabled}
                onPress={form.handleSubmit(onSubmit)}
              >
                <Text>Continue</Text>
              </Button>
            </View>
          </Form>
        </View>
      </View>
    </View>
  );
}
