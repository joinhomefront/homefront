import { useState } from "react";
import { View } from "react-native";
import { Edit2, Star, StarOff } from "lucide-react-native";
import { Link } from "solito/link";

import type { Action, DomainArea } from "@homefront/db";
import { ActionTypeIcon } from "@homefront/app/features/actions/ActionTypeIcon";
import { getLabelForActionType } from "@homefront/app/features/actions/utils";
import { api } from "@homefront/app/utils/trpc";
import { Button, Text } from "@homefront/ui";

import { ActionDomainAreasList } from "../../actions/ActionDomainAreasList";

interface AdminActionItemProps {
  action: Action & {
    creatorUsername: string | null;
    curatedActionId: string | null;
    position: string | null;
    domainAreas: DomainArea[];
  };
}

export function AdminActionItem({ action }: AdminActionItemProps) {
  const [isCurated, setIsCurated] = useState(!!action.curatedActionId);

  const utils = api.useUtils();
  const createCuratedAction = api.actions.createCuratedAction.useMutation({
    onError: () => {
      setIsCurated(false);
    },
    onSettled: async () => {
      await utils.actions.getAllActions.invalidate();
    },
  });
  const deleteCuratedAction = api.actions.deleteCuratedAction.useMutation();

  const handleCreateCuratedAction = async () => {
    setIsCurated(true);
    await createCuratedAction.mutateAsync({
      actionId: action.id,
    });
  };

  const handleRemoveCuratedAction = async () => {
    if (!action.curatedActionId) return;
    await deleteCuratedAction.mutateAsync(action.curatedActionId);
  };

  const isCurateDisabled =
    createCuratedAction.isPending || deleteCuratedAction.isPending;

  return (
    <View className="flex-row items-center justify-between border-b border-gray-200 py-4">
      <View className="flex-1">
        <Text className="font-bold">{action.title}</Text>
        <Text
          className="max-w-prose pt-1 text-sm text-gray-500"
          numberOfLines={1}
        >
          {action.description}
        </Text>
        <View className="flex-row items-center space-x-4 pt-2">
          <View className="flex-row items-center space-x-2">
            <ActionTypeIcon type={action.type} className="text-gray-500" />
            <Text className="text-sm text-gray-500">
              {getLabelForActionType(action.type)}
            </Text>
          </View>
          <ActionDomainAreasList domainAreas={action.domainAreas} />
        </View>
        <View className="flex-row items-center space-x-2 pt-4">
          <Text className="text-sm text-gray-500">
            Created by @{action.creatorUsername}
          </Text>
          {isCurated ? (
            <Button
              variant="ghost"
              size="sm"
              hasIcon
              onPress={handleRemoveCuratedAction}
              disabled={isCurateDisabled}
            >
              <StarOff size={16} />
              <Text>Remove from curated</Text>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              hasIcon
              onPress={handleCreateCuratedAction}
              disabled={isCurateDisabled}
            >
              <Star size={16} />
              <Text>Add to curated</Text>
            </Button>
          )}
        </View>
        {action.status && (
          <Text className="text-sm text-gray-500">Status: {action.status}</Text>
        )}
      </View>
      <Link href={`/admin/actions/${action.id}`}>
        <View className="flex-row items-center space-x-2">
          <Edit2 size={20} className="text-gray-500" />
        </View>
      </Link>
    </View>
  );
}
