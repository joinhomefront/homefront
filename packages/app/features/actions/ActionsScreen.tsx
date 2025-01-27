"use client";

import { SafeAreaView, ScrollView, View } from "react-native";
import { ListTodo } from "lucide-react-native";

import { H2 } from "@homefront/ui";

import { UserActionsList } from "./UserActionsList";

export function ActionsScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <View className="mx-auto w-full max-w-screen-xl flex-1 justify-center px-0 py-4 sm:px-2">
            <View className="max-w-prose">
              <View className="space-y-2">
                <View className="flex-row items-center gap-2 px-3">
                  <ListTodo size={30} className="-mt-[6px] text-primary" />
                  <H2 className="font-header text-2xl font-bold uppercase text-primary">
                    My Actions
                  </H2>
                </View>
              </View>

              <View className="px-4">
                <UserActionsList />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
