import { SafeAreaView, ScrollView, View } from "react-native";
import { useParams } from "solito/navigation";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator } from "@homefront/ui";

interface Params extends Record<string, string> {
  id: string;
}

export function RelationshipScreen() {
  const { id } = useParams<Params>();
  const { isLoading } = api.relationships.getRelationship.useQuery(id);

  return (
    <SafeAreaView className="w-full flex-1" style={{ flex: 1 }}>
      <ScrollView
        className="w-full flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="mx-auto h-auto w-full max-w-screen-sm flex-1 items-center justify-center p-4">
          {isLoading && <ActivityIndicator />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
