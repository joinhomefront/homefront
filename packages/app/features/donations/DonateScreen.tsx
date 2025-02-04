"use client";

import { SafeAreaView, ScrollView, View } from "react-native";

import { DonationForm } from "@homefront/app/features/donations/DonationForm";
import { H2, Text } from "@homefront/ui";

export function DonateScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <View className="mx-auto w-full max-w-screen-xl flex-1 px-4 pt-4 md:pt-8">
            <View>
              <View className="flex-1 items-center">
                <H2 className="font-header-bold text-center text-4xl text-primary-800 md:text-5xl">
                  Join the fight for democracy
                </H2>
                <Text className="max-w-prose pt-1 text-center text-sm text-gray-500">
                  There are no megadonors or corporate sponsors here – our
                  members support us. Choose to join today.{" "}
                  <Text className="text-sm font-bold text-gray-500">
                    Cancel anytime.
                  </Text>
                </Text>
                <DonationForm />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
