"use client";

import { SafeAreaView, ScrollView, View } from "react-native";
import { LibrarySquare } from "lucide-react-native";

import { H2 } from "@homefront/ui";

import { ResourcesList } from "./ResourcesList";
import { ResourceSorts } from "./ResourceSorts";

export function ResourcesScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <View className="mx-auto w-full max-w-screen-xl flex-1 justify-center px-0 py-4 sm:px-2">
            <View className="max-w-prose">
              <View className="gap-y-2">
                <View className="flex-row items-center gap-2 px-3">
                  <LibrarySquare size={30} className="-mt-[6px] text-primary" />
                  <H2 className="font-header-bold text-2xl font-bold uppercase text-primary">
                    Resources
                  </H2>
                </View>

                <View className="flex-row">
                  <ResourceSorts />
                </View>
              </View>

              <ResourcesList />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
