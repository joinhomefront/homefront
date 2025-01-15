"use client";

import { useState } from "react";
import { Pressable, View } from "react-native";
import { Check } from "lucide-react-native";

import type { DomainAreaProps } from "@homefront/ui";
import { api } from "@homefront/app/utils/trpc";
import { cn, DomainArea, Text } from "@homefront/ui";

export interface UserDomainAreaProps {
  domainArea: {
    id: string;
    title: string;
    description: string | null;
    slug: string | null;
    hasDomainArea: boolean;
  };
}

export const UserDomainArea = ({ domainArea }: UserDomainAreaProps) => {
  const [hasDomainArea, setHasDomainArea] = useState(domainArea.hasDomainArea);

  const createUserDomainArea = api.domainAreas.createUserDomainArea.useMutation(
    {
      onError: () => {
        setHasDomainArea(false);
      },
    },
  );

  const deleteUserDomainArea = api.domainAreas.deleteUserDomainArea.useMutation(
    {
      onError: () => {
        setHasDomainArea(true);
      },
    },
  );

  const handlePress = async () => {
    if (hasDomainArea) {
      setHasDomainArea(false);
      await deleteUserDomainArea.mutateAsync({
        domainAreaId: domainArea.id,
      });
    } else {
      setHasDomainArea(true);
      await createUserDomainArea.mutateAsync({
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
            className={cn(hasDomainArea ? "text-primary" : "text-gray-800")}
            domainArea={domainArea.slug as DomainAreaProps["domainArea"]}
          />
          <View className="flex-1 flex-row justify-between">
            <Text
              className={cn(
                "text-base font-bold",
                hasDomainArea ? "text-primary" : "text-gray-800",
              )}
            >
              {domainArea.title}
            </Text>
            {hasDomainArea && <Check size={16} className="text-primary" />}
          </View>
        </View>
        <Text className="text-sm text-gray-500">{domainArea.description}</Text>
      </View>
    </Pressable>
  );
};
