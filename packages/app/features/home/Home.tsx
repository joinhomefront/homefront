"use client";

import { SafeAreaView, ScrollView, View } from "react-native";

import { RecommendedActionsList } from "@homefront/app/features/actions/RecommendedActionsList";
import { UserActionsList } from "@homefront/app/features/actions/UserActionsList";
import { Invites } from "@homefront/app/features/invites/Invites";
import { OnboardingChecklist } from "@homefront/app/features/onboarding/OnboardingChecklist";
import { RelationshipsList } from "@homefront/app/features/relationships/RelationshipsList";
import { H3, H4 } from "@homefront/ui";

import { CallToAction } from "../donations/CallToAction";

export function Home() {
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <CallToAction />
          <View className="mx-auto w-full max-w-screen-xl flex-1 flex-col justify-center px-5 md:flex-row md:gap-4">
            <View className="gap-4 py-4 md:w-7/12 md:px-2">
              <OnboardingChecklist />
              <View>
                <H3 className="font-header-bold uppercase text-primary">
                  Your actions
                </H3>
                <UserActionsList />
              </View>
              <View>
                <H4 className="font-header-bold uppercase text-primary">
                  Recommended actions
                </H4>
                <RecommendedActionsList />
              </View>
            </View>
            <View className="gap-4 py-4 md:w-5/12 md:px-2">
              <View>
                <H3 className="font-header-bold uppercase text-primary">
                  Your connections
                </H3>
                <RelationshipsList />
              </View>
              <View>
                <H4 className="font-header-bold uppercase text-primary">
                  Invites
                </H4>
                <Invites />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
