import { View } from "react-native";

import { api } from "@homefront/app/utils/trpc";
import type { Action } from "@homefront/db";
import { ActivityIndicator } from "@homefront/ui";

import { ActionDomainArea } from "./ActionDomainArea";

interface ActionDomainAreasProps {
  action: Action;
}

export function ActionDomainAreas({ action }: ActionDomainAreasProps) {
  const { data: domainAreas, isLoading } =
    api.actions.getActionDomainAreas.useQuery({ actionId: action.id });

  return (
    <View className="py-4">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <View className="-m-1 flex-row flex-wrap gap-1">
          {domainAreas?.map((item) => (
            <View key={item.id} className="gap-1">
              <ActionDomainArea
                key={item.id}
                action={action}
                domainArea={item}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
