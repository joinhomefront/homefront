"use client";

import { SafeAreaView, ScrollView, View } from "react-native";

import { CuratedActionsList } from "@homefront/app/features/actions/curated/CuratedActionsList";
import { Text } from "@homefront/ui";

export function AdminCuratedActionsScreen() {
  return (
    <SafeAreaView className="w-full flex-1" style={{ flex: 1 }}>
      <ScrollView className="w-full flex-1">
        <View className="mx-auto h-auto w-full max-w-screen-sm flex-1 p-4">
          <View className="flex-row items-center justify-between pb-4">
            <Text className="text-xl font-bold">Actions</Text>
            {/* <AdminActionCreateDialog /> */}
          </View>
          <CuratedActionsList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
