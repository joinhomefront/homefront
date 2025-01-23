"use client";

import { SafeAreaView, ScrollView, View } from "react-native";
import { LibrarySquare } from "lucide-react-native";

import { H2 } from "@homefront/ui";

import { ResourcesList } from "./ResourcesList";

export function ResourcesScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <View className="mx-auto w-full max-w-screen-xl flex-1 justify-center p-4">
            <View className="max-w-prose space-y-4">
              <View className="flex-row items-center gap-4 px-3">
                <LibrarySquare size={36} className="-mt-[5px] text-primary" />
                <H2 className="font-header text-4xl font-bold uppercase text-primary">
                  Resources
                </H2>
              </View>

              <ResourcesList />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
