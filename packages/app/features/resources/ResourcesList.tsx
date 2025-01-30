import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Library } from "lucide-react-native";
import { useSearchParams } from "solito/navigation";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Text } from "@homefront/ui";

import type { ResourceFilter, ResourceSort } from "./types";
import { ResourceItem } from "./ResourceItem";

const LIMIT = 20;

export function ResourcesList({ filter }: { filter?: ResourceFilter }) {
  const searchParams = useSearchParams();
  const sort = searchParams?.get("sort") as ResourceSort;

  const {
    data,
    isLoading,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = api.resources.getResources.useInfiniteQuery(
    {
      limit: LIMIT,
      sort,
      filter,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const resources = useMemo(() => {
    const resourceItems = data?.pages.flatMap((page) => page.items) ?? [];
    return [...new Map(resourceItems.map((item) => [item.id, item])).values()];
  }, [data?.pages]);

  if (isLoading) {
    return (
      <ScrollView className="flex-1 items-center justify-center p-4">
        <ActivityIndicator />
      </ScrollView>
    );
  }

  const LoadingIndicator = () =>
    isFetchingNextPage ? <ActivityIndicator className="py-4" /> : null;

  return (
    <FlashList
      data={resources}
      refreshing={isFetchingNextPage || isRefetching}
      renderItem={({ item: resource }) => <ResourceItem resource={resource} />}
      estimatedItemSize={232}
      keyExtractor={(resource) => `${sort}-${resource.id}`}
      onEndReached={async () => {
        if (hasNextPage) {
          await fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={LoadingIndicator}
      ListEmptyComponent={
        <View className="my-3 flex-1 items-center justify-center space-y-2 rounded-md border-2 border-dashed border-gray-200 px-3 py-8">
          <Library size={24} className="text-gray-500" />
          <Text className="text-sm text-gray-500">No resources found</Text>
        </View>
      }
    />
  );
}
