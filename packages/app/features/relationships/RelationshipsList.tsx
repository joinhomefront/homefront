import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Text } from "@homefront/ui";

import { Relationship } from "./Relationship";

export function RelationshipsList() {
  const { data: relationships, isLoading } =
    api.relationships.getRelationships.useQuery();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlashList
      data={relationships}
      renderItem={({ item: relationship }) => {
        const friend = {
          id: relationship.friendId,
          username: relationship.friendUsername,
          image: relationship.friendImage,
        };
        return (
          <Relationship
            key={relationship.id}
            relationship={relationship}
            friend={friend}
          />
        );
      }}
      ListEmptyComponent={() => (
        <View className="gap-y-2 py-4">
          <Text className="text-left text-gray-500">
            You don't have any connections yet.
          </Text>
          <Text className="text-left text-sm text-gray-500">
            Invite some people you trust to join you on Homefront.
          </Text>
        </View>
      )}
      keyExtractor={(item) => `relationship-${item.id}`}
      estimatedItemSize={82}
    />
  );
}
