"use client";

import { SafeAreaView, ScrollView, View } from "react-native";
import { Compass } from "lucide-react-native";

import { H2 } from "@homefront/ui";

import { RecommendedActionsList } from "./RecommendedActionsList";

export function RecommendedActionsScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <View className="mx-auto w-full max-w-screen-xl flex-1 justify-center px-0 py-4 sm:px-2">
            <View className="max-w-prose">
              <View className="gap-y-2">
                <View className="flex-row items-center gap-2 px-3">
                  <Compass size={30} className="-mt-[6px] text-primary" />
                  <H2 className="font-header-bold text-2xl font-bold uppercase text-primary">
                    Recommended Actions
                  </H2>
                </View>
              </View>

              <View className="px-4">
                <RecommendedActionsList />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
