import { FlashList } from "@shopify/flash-list";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator } from "@homefront/ui";

import { AdminActionItem } from "./AdminActionItem";

export function AdminActionsList() {
  const { data: actions, isLoading } = api.actions.getAllActions.useQuery();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <FlashList
      data={actions}
      renderItem={({ item: action }) => <AdminActionItem action={action} />}
      estimatedItemSize={100}
    />
  );
}
