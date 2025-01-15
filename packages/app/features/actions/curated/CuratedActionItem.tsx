import { View } from "react-native";
import { GripHorizontal } from "lucide-react-native";

import type { Action, CuratedAction } from "@homefront/db";
import { ActionTypeIcon } from "@homefront/app/features/actions/ActionTypeIcon";
import { getLabelForActionType } from "@homefront/app/features/actions/utils";
import { Text } from "@homefront/ui";

interface CuratedActionItemProps {
  item: Action & CuratedAction;
}

export function CuratedActionItem({ item }: CuratedActionItemProps) {
  return (
    <View className="select-none flex-row items-center space-x-4 py-4">
      <View>
        <GripHorizontal size={24} />
      </View>

      <View className="flex-1">
        <Text className="font-bold">{item.title}</Text>
        <Text className="max-w-prose pt-1 text-sm text-gray-500">
          {item.description}
        </Text>
        <View className="flex-row items-center space-x-2 pt-2">
          <ActionTypeIcon type={item.type} className="text-gray-500" />
          <Text className="text-sm text-gray-500">
            {getLabelForActionType(item.type)}
          </Text>
        </View>
      </View>
    </View>
  );
}
