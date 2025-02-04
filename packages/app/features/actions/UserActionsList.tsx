import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Text } from "@homefront/ui";

import { UserActionItem } from "./UserActionItem";

export function UserActionsList() {
  const {
    data: userActions,
    isLoading,
    isRefetching,
  } = api.actions.getUserActions.useQuery();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlashList
      data={userActions}
      refreshing={isRefetching}
      renderItem={({ item: userAction }) => (
        <UserActionItem action={userAction.action} userAction={userAction} />
      )}
      ListEmptyComponent={() => (
        <View className="gap-y-2 py-4">
          <Text className="text-left text-gray-500">
            You haven't added have any actions yet.
          </Text>
        </View>
      )}
      keyExtractor={(userAction) => userAction.id}
      estimatedItemSize={110}
    />
  );
}
