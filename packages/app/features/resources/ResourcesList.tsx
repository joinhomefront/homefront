import { FlashList } from "@shopify/flash-list";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator } from "@homefront/ui";

import { ResourceItem } from "./ResourceItem";

export function ResourcesList() {
  const {
    data: resources,
    isLoading,
    isRefetching,
  } = api.resources.getResources.useQuery();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <FlashList
      data={resources}
      refreshing={isLoading || isRefetching}
      renderItem={({ item: resource }) => <ResourceItem resource={resource} />}
      estimatedItemSize={161}
      keyExtractor={(resource) => resource.id}
    />
  );
}
