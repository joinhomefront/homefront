"use client";

import type { BouncyCheckboxHandle } from "react-native-bouncy-checkbox";
import { createRef, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ArrowRight, Check } from "lucide-react-native";
import { Link } from "solito/link";

import type { Action, DomainArea, UserAction } from "@homefront/db";
import { api } from "@homefront/app/utils/trpc";
import { cn, Text } from "@homefront/ui";
import colors from "@homefront/ui/colors";

import { ActionDomainAreasList } from "./ActionDomainAreasList";
import { ActionTypeIcon } from "./ActionTypeIcon";
import { getLabelForActionType } from "./utils";

interface UserActionItemProps {
  action: Action & { domainAreas: DomainArea[] };
  userAction: UserAction;
}

export function UserActionItem({ action, userAction }: UserActionItemProps) {
  const bouncyCheckboxRef: React.RefObject<BouncyCheckboxHandle> = createRef();

  const [isCompleted, setIsCompleted] = useState<boolean>(userAction.completed);

  const utils = api.useUtils();

  useEffect(() => {
    if (userAction.completed !== isCompleted) {
      setIsCompleted(userAction.completed);
    }
  }, [userAction.completed]);

  const updateUserAction = api.actions.updateUserAction.useMutation({
    onError: () => {
      setIsCompleted(!isCompleted);
    },
    onSettled: () => {
      void utils.actions.getUserActions.invalidate();
    },
  });

  const handleCheckboxPress = (checked: boolean) => {
    updateUserAction.mutate({ actionId: action.id, completed: checked });
    setIsCompleted(checked);
  };

  const isLoading = updateUserAction.isPending;
  const isDisabled = isLoading;

  return (
    <View
      className={cn(
        "flex-row items-start gap-2 border-b border-gray-200 py-4",
        isDisabled && "opacity-80",
      )}
    >
      <BouncyCheckbox
        ref={bouncyCheckboxRef}
        disabled={isDisabled}
        disableText
        style={{ opacity: 4 }}
        fillColor={colors.primary[600]}
        size={24}
        useBuiltInState
        isChecked={isCompleted}
        iconComponent={<Check size={16} strokeWidth={4} color="white" />}
        onPress={handleCheckboxPress}
      />

      <View className="flex-1">
        <Pressable
          disabled={isDisabled}
          onPress={() => bouncyCheckboxRef.current?.onCheckboxPress()}
        >
          <View className="flex-1">
            <Text className={cn("font-bold", isCompleted && "line-through")}>
              {action.title}
            </Text>
            <Text
              className={cn(
                "max-w-prose pt-1 text-sm text-gray-500",
                isCompleted && "line-through",
              )}
            >
              {action.description}
            </Text>
          </View>
        </Pressable>
        <View className="flex-row items-center gap-x-4 pt-1">
          <View className="flex-row items-center gap-x-2">
            <ActionTypeIcon type={action.type} className="text-gray-500" />
            <Text className="text-sm text-gray-500">
              {getLabelForActionType(action.type)}
            </Text>
          </View>
          <ActionDomainAreasList domainAreas={action.domainAreas} />
          {action.body && (
            <Link href={`/actions/${action.id}`}>
              <View className="flex-row items-center gap-x-1 text-primary">
                <Text className="text-sm text-primary">Read more</Text>
                <ArrowRight size={16} />
              </View>
            </Link>
          )}
        </View>
      </View>
    </View>
  );
}
