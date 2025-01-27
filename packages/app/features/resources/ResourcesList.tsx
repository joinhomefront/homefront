import { ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSearchParams } from "solito/navigation";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator } from "@homefront/ui";

import { ResourceItem } from "./ResourceItem";
import { ResourceFilter, ResourceSort } from "./types";

const LIMIT = 20;

export function ResourcesList({ filter }: { filter?: ResourceFilter }) {
  const searchParams = useSearchParams();
  const sort = (searchParams?.get("sort") as ResourceSort) ?? "hot";

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

  const resources = data?.pages.flatMap((page) => page.items) ?? [];

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
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={LoadingIndicator}
    />
  );
}
