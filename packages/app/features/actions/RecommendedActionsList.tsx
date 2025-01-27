import { useEffect, useState } from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Text } from "@homefront/ui";

import { RecommendedActionItem } from "./RecommendedActionItem";

export function RecommendedActionsList() {
  const [hasAttemptedGeneration, setHasAttemptedGeneration] = useState(false);

  const {
    data: recommendedActions,
    isLoading,
    isRefetching,
  } = api.actions.getRecommendedActions.useQuery();

  const generateRecommendedActions =
    api.actions.generateRecommendedActions.useMutation({
      onSettled: () => {
        void utils.actions.getRecommendedActions.invalidate();
      },
    });

  const utils = api.useUtils();

  useEffect(() => {
    if (
      !isLoading &&
      !hasAttemptedGeneration &&
      (!recommendedActions || recommendedActions.length === 0)
    ) {
      generateRecommendedActions.mutate();
      setHasAttemptedGeneration(true);
    }
  }, [isLoading, recommendedActions, hasAttemptedGeneration]);

  if (isLoading || generateRecommendedActions.isPending) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlashList
      data={recommendedActions}
      refreshing={isRefetching}
      renderItem={({ item: recommendedAction }) => (
        <RecommendedActionItem action={recommendedAction.action} />
      )}
      ListEmptyComponent={() => (
        <Text className="py-4 text-left text-gray-500">
          You don't have any recommended actions right now.
        </Text>
      )}
      keyExtractor={(recommendedAction) =>
        `recommended-action-${recommendedAction.id}`
      }
      estimatedItemSize={185}
    />
  );
}
