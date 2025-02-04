"use client";

import type Stripe from "stripe";
import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { ArrowRight, CreditCard } from "lucide-react-native";
import { Link } from "solito/link";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Button, H3, Text } from "@homefront/ui";

import { Status } from "./Status";
import { formatAmount, formatMonthDayMaybeYear } from "./utils";

export function DonationsScreen() {
  const { data: donationHistory, isLoading } =
    api.donations.getDonationHistory.useQuery();
  const createPortalSession =
    api.donations.createBillingPortalSession.useMutation();
  const [isCreatingSession, setIsCreatingSession] = useState(false);

  const handleManageSubscriptions = async () => {
    setIsCreatingSession(true);
    try {
      const { url } = await createPortalSession.mutateAsync();
      window.location.href = url;
    } catch (err) {
      console.error("Failed to create portal session:", err);
    } finally {
      setIsCreatingSession(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="small" className="text-primary" />
      </View>
    );
  }

  const subscriptions = donationHistory?.subscriptions.filter(
    (subscription) =>
      subscription.status === "active" ||
      subscription.status === "trialing" ||
      subscription.status === "past_due" ||
      subscription.status === "canceled" ||
      subscription.status === "unpaid" ||
      subscription.status === "paused",
  );

  if (!subscriptions?.length && !donationHistory?.oneTimeDonations.length) {
    return (
      <SafeAreaView className="flex-1">
        <View className="w-full flex-1">
          <ScrollView className="w-full flex-1">
            <View className="mx-auto w-full max-w-screen-xl flex-1 justify-center p-4">
              <View className="gap-y-8">
                <View className="flex-row items-center justify-between">
                  <H3 className="font-header-bold uppercase text-primary">
                    Your Donations
                  </H3>
                </View>

                <View className="items-center gap-y-4 rounded-lg border-2 border-dashed border-gray-300 p-4 py-8">
                  <View className="gap-y-2">
                    <Text className="text-gray-600">
                      You haven't made any donations yet.
                    </Text>
                  </View>

                  <View className="gap-y-2">
                    <Text className="font-header-bold text-lg font-bold uppercase text-primary">
                      Fund our fight for democracy
                    </Text>

                    <Link href="/donate">
                      <Button hasIcon className="h-8 rounded-full bg-amber-400">
                        <Text className="font-sans-bold text-sm font-bold text-primary-900">
                          Support us
                        </Text>
                        <ArrowRight size={16} className="text-primary-900" />
                      </Button>
                    </Link>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <View className="mx-auto w-full max-w-screen-xl flex-1 justify-center p-4">
            <View className="max-w-prose gap-y-8">
              <View className="flex-row items-center justify-between">
                <H3 className="font-header-bold uppercase text-primary">
                  Your Donations
                </H3>
                <Button
                  variant="outline"
                  size="sm"
                  hasIcon
                  onPress={handleManageSubscriptions}
                  disabled={isCreatingSession}
                >
                  <CreditCard size={16} className="text-primary" />
                  <Text>Manage donations</Text>
                </Button>
              </View>

              {subscriptions && subscriptions.length > 0 && (
                <View className="gap-y-4">
                  <View className="gap-y-2">
                    <Text className="font-header-bold text-lg font-bold uppercase text-primary">
                      Recurring
                    </Text>
                  </View>
                  <View className="gap-y-2">
                    {/* Table Header */}
                    <View className="flex-row justify-between rounded bg-gray-100 p-2">
                      <Text className="flex-1 text-xs font-bold text-gray-700">
                        Amount
                      </Text>
                      <Text className="flex-1 text-xs font-bold text-gray-700">
                        Status
                      </Text>
                      <Text className="flex-1 text-xs font-bold text-gray-700">
                        Frequency
                      </Text>
                      <Text className="flex-1 text-xs font-bold text-gray-700">
                        Next payment
                      </Text>
                    </View>
                    {/* Table Rows */}
                    {subscriptions.map((subscription) => (
                      <View
                        key={subscription.stripeSubscriptionId}
                        className="flex-row items-center justify-between border-b border-gray-300 p-2 pt-0"
                      >
                        <Text className="flex-1 text-sm font-bold text-gray-800">
                          {subscription.amount
                            ? formatAmount(subscription.amount)
                            : ""}
                        </Text>
                        <View className="flex-1 items-start">
                          <Status
                            status={
                              subscription.status as Stripe.Subscription.Status
                            }
                          />
                        </View>
                        <Text className="flex-1 text-sm text-gray-500">
                          Billing {subscription.type}
                        </Text>
                        <Text className="flex-1 text-sm text-gray-500">
                          {formatMonthDayMaybeYear(
                            subscription.currentPeriodEnd,
                          )}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {donationHistory &&
                donationHistory.oneTimeDonations.length > 0 && (
                  <View className="gap-y-4">
                    <View className="gap-y-2">
                      <Text className="font-header-bold text-lg font-bold uppercase text-primary">
                        One-time Donations
                      </Text>
                    </View>
                    <View className="gap-y-2">
                      {/* Table Header */}
                      <View className="flex-row justify-between rounded bg-gray-100 p-2">
                        <Text className="flex-1 text-xs font-bold text-gray-700">
                          Amount
                        </Text>
                        <Text className="flex-1 text-xs font-bold text-gray-700">
                          Status
                        </Text>
                        <Text className="flex-1 text-xs font-bold text-gray-700">
                          Date
                        </Text>
                      </View>
                      {/* Table Rows */}
                      {donationHistory.oneTimeDonations.map((payment) => (
                        <View
                          key={payment.id}
                          className="flex-row items-center justify-between border-b border-gray-300 p-2 pt-0"
                        >
                          {/* Amount */}
                          <Text className="flex-1 text-sm font-bold text-gray-800">
                            {payment.amount ? formatAmount(payment.amount) : ""}
                          </Text>

                          {/* Status */}
                          <View className="flex-1 items-start">
                            <Status status={payment.status} />
                          </View>

                          {/* Date */}
                          <Text className="flex-1 text-sm text-gray-500">
                            {formatMonthDayMaybeYear(payment.created)}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
