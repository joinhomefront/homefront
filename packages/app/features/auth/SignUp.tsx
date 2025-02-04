"use client";

import type { z } from "zod";
import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldAlert } from "lucide-react-native";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Link } from "solito/link";
import { useSearchParams } from "solito/navigation";

import { InviteInfo } from "@homefront/app/features/auth/InviteInfo";
import { setRecoveryPhrase } from "@homefront/app/utils/recovery-phrase-store";
import {
  ActivityIndicator,
  Button,
  Form,
  FormField,
  Text,
} from "@homefront/ui";
import {
  RecoveryPhraseResponseSchema,
  SignUpFormSchema,
  usernameSchema,
} from "@homefront/validators";

import { AvatarInfo } from "../avatars/AvatarInfo";
import { UsernameInput } from "../users/UsernameInput/UsernameInput";
import { AuthHeader } from "./AuthHeader";
import { getInviteCodeFromRedirect } from "./utils";
import { VisiblePasswordInput } from "./VisiblePasswordInput";

interface Params extends Record<string, string> {
  redirect: string;
}

export function SignUp() {
  const searchParams = useSearchParams<Params>();
  const redirect = searchParams?.get("redirect");

  const [isLoading, setIsLoading] = useState(false);

  const baseLoginUrl = "/login";
  const loginUrl = redirect
    ? `${baseLoginUrl}?redirect=${redirect}`
    : baseLoginUrl;

  const handleSignup = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { username, password } = values;
    const inviteCode = redirect ? getInviteCodeFromRedirect(redirect) : null;

    console.log("inviteCode", inviteCode);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, inviteCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle validation errors
        if (data.errors) {
          Object.entries(data.errors).forEach(([field, errors]) => {
            form.setError(field as any, {
              type: "server",
              message: Array.isArray(errors) ? errors[0] : errors,
            });
          });
          return;
        }

        // Handle other errors
        form.setError("root", {
          message: data.error || "Something went wrong",
        });
        return;
      }

      const parsedData = RecoveryPhraseResponseSchema.parse(data);
      if (parsedData.recoveryPhrase) {
        await signIn("homefront", {
          redirect: true,
          callbackUrl: "/onboarding/recovery-phrase",
        });
        await setRecoveryPhrase(parsedData.recoveryPhrase);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      form.setError("root", {
        message: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formSchema = SignUpFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleUsernameAvailableChange = async (isAvailable: boolean | null) => {
    const username = form.getValues("username");

    if (username === "") {
      form.clearErrors("username");
      return;
    }

    const isValid = usernameSchema.safeParse(username).success;

    if (!isValid) {
      await form.trigger("username"); // Let zod validation handle the error.
      return;
    }

    if (!isAvailable) {
      form.setError("username", {
        type: "manual",
        message: "This username isn't available. Please try another.",
      });
      return;
    }

    form.clearErrors("username");
  };

  const {
    formState: { isDirty, isSubmitting, errors },
  } = form;

  const submitDisabled = isSubmitting || !isDirty;

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <AuthHeader />
          <View className="mx-auto w-full max-w-md flex-1 p-4 pt-10">
            <View className="w-full rounded-md bg-white p-4 shadow-md shadow-gray-300 sm:p-10">
              {redirect && <InviteInfo redirect={redirect} />}
              <Form {...form}>
                <View className="gap-y-6">
                  <Text className="font-sans-bold text-left text-2xl font-bold">
                    Sign up for Homefront
                  </Text>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <UsernameInput
                        field={field}
                        invalid={form.getFieldState("username").invalid}
                        onAvailableChange={handleUsernameAvailableChange}
                      />
                    )}
                  />
                  <View className="rounded-md border border-amber-600 bg-amber-200 p-2">
                    <View className="flex-row items-start gap-x-2">
                      <View>
                        <ShieldAlert size={24} className="text-amber-800" />
                      </View>
                      <Text className="text-sm text-amber-800">
                        Be careful not to use your real name or usernames you
                        use on other sites.
                      </Text>
                    </View>
                  </View>

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <VisiblePasswordInput {...field} label="Password" />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <VisiblePasswordInput
                        {...field}
                        label="Confirm Password"
                      />
                    )}
                  />

                  {errors.root && (
                    <View className="mb-6 rounded-md border border-destructive bg-destructive-foreground p-3">
                      <Text className="text-sm text-destructive">
                        {errors.root.message}
                      </Text>
                    </View>
                  )}

                  <Button
                    size="lg"
                    disabled={submitDisabled}
                    onPress={form.handleSubmit(handleSignup)}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text>Sign up</Text>
                    )}
                  </Button>
                </View>
              </Form>
              <View>
                <Text className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link href={loginUrl}>
                    <Text className="text-sm text-primary hover:underline">
                      Sign in
                    </Text>
                  </Link>
                </Text>
              </View>
            </View>
            <AvatarInfo />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
