"use client";

import { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Link } from "solito/link";
import { useRouter, useSearchParams } from "solito/navigation";
import { z } from "zod";

import { InviteInfo } from "@homefront/app/features/auth/InviteInfo";
import { signInWithHomefront } from "@homefront/app/utils/auth";
import {
  ActivityIndicator,
  Button,
  cn,
  Form,
  FormField,
  FormInput,
  FormOtpInput,
  FormWrapper,
  Text,
} from "@homefront/ui";

import { AvatarInfo } from "../avatars/AvatarInfo";
import { AuthHeader } from "./AuthHeader";
import { RequestSignUtil } from "./RequestSignUtil";
import { VisiblePasswordInput } from "./VisiblePasswordInput";

interface Params extends Record<string, string> {
  redirect: string;
}

export function SignIn() {
  const searchParams = useSearchParams<Params>();
  const redirect = searchParams?.get("redirect");

  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isTotpRequired, setIsTotpRequired] = useState(false);
  const [isRecoveryCode, setIsRecoveryCode] = useState(false);

  const baseSignUpUrl = "/signup";
  const signUpUrl = redirect
    ? `${baseSignUpUrl}?redirect=${redirect}`
    : baseSignUpUrl;

  const handleLogin = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      setIsLoading(true);
      const { username, password } = values;
      try {
        const response = await RequestSignUtil.initiateSession({
          username,
          password,
        });

        const otpError = RequestSignUtil.handleNeedOtp(response);
        if (otpError) {
          setIsTotpRequired(true);
          form.setValue("miniSession", otpError.miniSession);
          return;
        }

        await signInWithHomefront();
        await getSession();

        if (redirect?.startsWith("/invites/")) {
          replace(redirect);
        } else {
          replace("/home");
        }
      } catch (err) {
        console.error("Login failed:", err);
        const message = "An error occurred. Please try again.";
        form.setError("root", { message });
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  async function handleSecondFactor(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { totp, miniSession } = values;

    try {
      const verifiedUser = await RequestSignUtil.submitOtp(totp, miniSession);
      if ("success" in verifiedUser && verifiedUser.success !== true) {
        throw new Error("2FA verification failed");
      }

      // On success, proceed with sign-in flow
      await signInWithHomefront();
      await getSession();

      if (redirect?.startsWith("/invites/")) {
        replace(redirect);
      } else {
        replace("/home");
      }
    } catch (err) {
      console.error("Login failed:", err);
      const message = "An error occurred. Please try again.";
      form.setError("root", { message });
    } finally {
      setIsLoading(false);
    }
  }

  const usernameSchema = z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(20, "Username cannot exceed 20 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores.",
    )
    .regex(/^[a-zA-Z]/, "Username must start with a letter.");

  const formSchema = z.object({
    username: usernameSchema,
    password: z.string().min(8, "Password must be at least 8 characters long."),
    totp: z.string().refine(
      (value) => {
        if (isTotpRequired && !isRecoveryCode) {
          return value.trim().length === 6; // Ensure TOTP is provided when required
        }
        return true; // Allow empty TOTP when not required
      },
      {
        message: "Two-factor code is required.",
      },
    ),
    recoveryCode: z.string().refine(
      (value) => {
        if (isTotpRequired && isRecoveryCode) {
          return value.trim().length === 8; // Ensure recovery code is provided when required
        }
        return true; // Allow empty recovery code when not required
      },
      {
        message: "Recovery code is required.",
      },
    ),
    miniSession: z.string().refine(
      (value) => {
        if (isTotpRequired || isRecoveryCode) {
          if (!value) return false;
        }
        return true; // Allow empty miniSession when not required
      },
      {
        message: "Session is required.",
      },
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totp: "",
      recoveryCode: "",
      miniSession: "",
    },
  });

  const {
    formState: { isDirty, isSubmitting, isValid, errors },
  } = form;

  const submitDisabled = isSubmitting || !isDirty || !isValid;

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <AuthHeader />
          <View className="mx-auto w-full max-w-md flex-1 p-4 pt-10">
            <View className="w-full rounded-md bg-white p-4 shadow-md shadow-gray-300 sm:p-10">
              {redirect && <InviteInfo redirect={redirect} />}
              <KeyboardAvoidingView>
                <Form {...form} handleSubmit={form.handleSubmit}>
                  <FormWrapper className="flex flex-1 flex-col gap-y-6">
                    {isTotpRequired && (
                      <View className={cn("space-y-6")}>
                        <Text className="text-left font-sans text-2xl font-bold">
                          Two-factor authentication
                        </Text>

                        {isRecoveryCode ? (
                          <FormField
                            control={form.control}
                            name="recoveryCode"
                            render={({ field }) => (
                              <FormInput
                                {...field}
                                label="Each code can only be used once"
                                autoCapitalize="none"
                                autoComplete="off"
                              />
                            )}
                          />
                        ) : (
                          <FormField
                            control={form.control}
                            name="totp"
                            render={({ field }) => (
                              <FormOtpInput
                                {...field}
                                autoFocus
                                onTextChange={(text: string) => {
                                  field.onChange(text);
                                  if (text.trim().length >= 1) {
                                    form.clearErrors("totp");
                                  }
                                }}
                                onFilled={async () => {
                                  if (!form.formState.isSubmitting) {
                                    await form.handleSubmit(
                                      handleSecondFactor,
                                    )();
                                  }
                                }}
                              />
                            )}
                          />
                        )}
                      </View>
                    )}
                    <View
                      className={cn("space-y-6", isTotpRequired && "hidden")}
                    >
                      <Text className="text-left font-sans text-2xl font-bold">
                        Sign in to your account
                      </Text>

                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormInput
                            {...field}
                            label="Username"
                            autoCapitalize="none"
                            autoComplete="username"
                          />
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <VisiblePasswordInput
                            {...field}
                            label="Password"
                            autoComplete="password"
                          />
                        )}
                      />
                    </View>
                    <View>
                      {errors.root && (
                        <View className="mb-6 rounded-md border border-destructive bg-destructive-foreground p-3">
                          <Text className="text-sm text-destructive">
                            {errors.root.message}
                          </Text>
                        </View>
                      )}

                      <View className="gap-y-2">
                        <Button
                          key={isTotpRequired ? "submit-full" : "submit-new"}
                          size="lg"
                          onPress={form.handleSubmit(
                            isTotpRequired ? handleSecondFactor : handleLogin,
                          )}
                          disabled={submitDisabled}
                        >
                          {isLoading ? (
                            <ActivityIndicator color="white" />
                          ) : (
                            <Text>
                              {isTotpRequired ? "Authenticate" : "Sign in"}
                            </Text>
                          )}
                        </Button>
                        {isTotpRequired && (
                          <Button
                            size="lg"
                            variant="ghost"
                            onPress={() => setIsRecoveryCode(!isRecoveryCode)}
                          >
                            <Text className="text-primary">
                              {isRecoveryCode
                                ? "Use authentication code"
                                : "Use recovery code"}
                            </Text>
                          </Button>
                        )}
                      </View>
                    </View>
                  </FormWrapper>
                </Form>
              </KeyboardAvoidingView>
              <View>
                <Text className="mt-4 text-center text-sm">
                  New to Homefront?{" "}
                  <Link href={signUpUrl}>
                    <Text className="text-sm text-primary hover:underline">
                      Create account
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
