"use client";

import { Suspense, useCallback } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { skipToken } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react-native";
import { useRouter, useSearchParams } from "solito/navigation";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Button, H2, P, Text } from "@homefront/ui";

import { BillingPortalLink } from "./BillingPortalLink";
import { Receipt } from "./Receipt";
import { formatAmount } from "./utils";

interface Params extends Record<string, string> {
  payment_intent: string;
  payment_intent_client_secret: string;
  redirect_status: string;
}

const getRecurringText = (type: string, amount: number) => {
  const formattedAmount = formatAmount(amount);
  switch (type) {
    case "month":
      return `monthly donation of ${formattedAmount}`;
    case "year":
      return `yearly donation of ${formattedAmount}`;
    default:
      return `one-time donation of ${formattedAmount}`;
  }
};

function ThankYou() {
  const { push } = useRouter();
  const searchParams = useSearchParams<Params>();
  const payment_intent = searchParams?.get("payment_intent");
  const payment_intent_client_secret = searchParams?.get(
    "payment_intent_client_secret",
  );
  const redirect_status = searchParams?.get("redirect_status");

  const { data: paymentDetails, isLoading } =
    api.donations.getPaymentDetails.useQuery(
      payment_intent && payment_intent_client_secret
        ? {
            paymentIntentId: payment_intent,
            clientSecret: payment_intent_client_secret,
          }
        : skipToken,
      {
        enabled: !!payment_intent && !!payment_intent_client_secret,
      },
    );

  const handleGoHome = useCallback(() => {
    push("/home");
  }, [push]);

  if (isLoading) {
    return (
      <SafeAreaView className="w-full flex-1" style={{ flex: 1 }}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  if (redirect_status !== "succeeded" || !paymentDetails) {
    return (
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1">
          <View className="mx-auto w-full max-w-md space-y-4 p-4">
            <H2>Payment Failed</H2>
            <P>Your payment was not successful. Please try again.</P>
            <Button onPress={handleGoHome}>
              <Text>Return Home</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const { amount } = paymentDetails;

  let frequency = "";

  if (
    paymentDetails.invoice &&
    typeof paymentDetails.invoice !== "string" &&
    paymentDetails.invoice.subscription &&
    typeof paymentDetails.invoice.subscription !== "string"
  ) {
    const subscription = paymentDetails.invoice.subscription;
    const interval = subscription.items?.data[0]?.price?.recurring?.interval;
    if (interval) {
      frequency = getRecurringText(interval, amount);
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <View className="mx-auto w-full max-w-md space-y-6 p-4">
          <View className="space-y-2">
            <H2 className="font-header text-center text-5xl text-primary-800">
              Thank you!
            </H2>
            <View className="items-center justify-center">
              <View className="h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Check size={24} strokeWidth={3} className="text-white" />
              </View>
            </View>
            <Text className="text-center text-base font-bold">
              Payment succeeded
            </Text>
            <Text className="max-w-prose pt-1 text-center text-sm text-gray-500">
              Your {frequency} will go a long way towards our fight for
              democracy.
            </Text>
          </View>

          <Receipt amount={amount} />

          <Text className="max-w-72 self-center text-center text-xs text-gray-500">
            Please note your statement will show{" "}
            <Text className="font-mono text-xs font-bold text-gray-500">
              HOMEFRONT
            </Text>{" "}
            on the charge for this transaction.
          </Text>

          <Text className="max-w-prose text-center text-xs text-gray-500"></Text>

          <BillingPortalLink />

          <Button onPress={handleGoHome} hasIcon className="w-full">
            <Text className="font-bold">Go home</Text>
            <ArrowRight size={16} className="text-white" />
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function ThankYouScreen() {
  return (
    <Suspense fallback={<ActivityIndicator size="small" />}>
      <ThankYou />
    </Suspense>
  );
}
