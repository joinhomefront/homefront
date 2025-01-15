"use client";

import { SafeAreaView, ScrollView, View } from "react-native";
import { useParams } from "solito/navigation";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Text } from "@homefront/ui";

import { EditAction } from "./EditAction";

interface Params {
  id: string;
  [key: string]: string | number | boolean;
}

export function AdminActionScreen() {
  const { id } = useParams<Params>();

  const { data: action, isLoading } = api.actions.getActionById.useQuery({
    id,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!action) {
    return <Text>No action found</Text>;
  }

  return (
    <SafeAreaView className="w-full flex-1" style={{ flex: 1 }}>
      <ScrollView className="w-full flex-1">
        <View className="mx-auto h-auto w-full max-w-screen-sm flex-1 p-4">
          <EditAction action={action} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
