"use client";

import { useState } from "react";
import { Pressable, View } from "react-native";

import type { Action } from "@homefront/db";
import type { DomainAreaProps } from "@homefront/ui";
import { api } from "@homefront/app/utils/trpc";
import { cn, DomainArea, Text } from "@homefront/ui";

export interface ActionDomainAreaProps {
  action: Action;
  domainArea: {
    id: string;
    title: string;
    description: string | null;
    slug: string | null;
    hasDomainArea: boolean;
  };
}

export const ActionDomainArea = ({
  action,
  domainArea,
}: ActionDomainAreaProps) => {
  const [hasDomainArea, setHasDomainArea] = useState(domainArea.hasDomainArea);

  const createActionDomainArea = api.actions.createActionDomainArea.useMutation(
    {
      onError: () => {
        setHasDomainArea(false);
      },
    },
  );

  const deleteActionDomainArea = api.actions.deleteActionDomainArea.useMutation(
    {
      onError: () => {
        setHasDomainArea(true);
      },
    },
  );

  const handlePress = async () => {
    if (hasDomainArea) {
      setHasDomainArea(false);
      await deleteActionDomainArea.mutateAsync({
        actionId: action.id,
        domainAreaId: domainArea.id,
      });
    } else {
      setHasDomainArea(true);
      await createActionDomainArea.mutateAsync({
        actionId: action.id,
        domainAreaId: domainArea.id,
      });
    }
  };

  return (
    <Pressable
      className={cn(
        "group h-full flex-1 rounded-md border outline hover:cursor-pointer",
        hasDomainArea
          ? "border-primary outline-primary-foreground hover:bg-primary-100"
          : "border-gray-200 outline-transparent hover:bg-gray-100",
      )}
      onPress={handlePress}
    >
      <View className="h-full gap-2 px-3 py-2">
        <View className="flex-row items-center gap-2">
          <DomainArea
            size={24}
            className={cn(hasDomainArea ? "text-primary" : "text-gray-500")}
            domainArea={domainArea.slug as DomainAreaProps["domainArea"]}
          />
          <View className="flex-1 flex-row justify-between">
            <Text
              className={cn(
                "text-sm",
                hasDomainArea ? "text-primary" : "text-gray-500",
              )}
            >
              {domainArea.title}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
