"use client";

import { useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { Check, Plus, X } from "lucide-react-native";

import { api } from "@homefront/app/utils/trpc";
import { cn, Text } from "@homefront/ui";

export interface UserOccupationProps {
  occupation: {
    id: string;
    title: string;
    occupationId: string;
  };
}

export const UserOccupation = ({ occupation }: UserOccupationProps) => {
  const [hasOccupation, setHasOccupation] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createUserOccupation = api.occupations.createUserOccupation.useMutation(
    {
      onError: () => {
        setHasOccupation(false);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    },
  );

  const deleteUserOccupation = api.occupations.deleteUserOccupation.useMutation(
    {
      onSuccess: (isDeleted) => {
        if (!isDeleted) {
          setHasOccupation(true);
        }
      },
      onError: () => {
        setHasOccupation(true);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    },
  );

  const handlePress = async () => {
    setIsLoading(true);

    if (hasOccupation) {
      setHasOccupation(false);
      await deleteUserOccupation.mutateAsync({
        occupationId: occupation.occupationId,
      });
    } else {
      setHasOccupation(true);
      await createUserOccupation.mutateAsync({
        occupationId: occupation.occupationId,
        title: occupation.title,
      });
    }
  };

  const disabled = isLoading;

  return (
    <Pressable
      className={cn(
        "group rounded-md border outline outline-transparent hover:cursor-pointer",
        hasOccupation &&
          !isLoading &&
          "hover:bg-destructive-100 border-primary outline-primary-foreground hover:border-destructive hover:outline-destructive-foreground",
        !hasOccupation &&
          !isLoading &&
          "border-gray-200 outline-transparent hover:bg-gray-100",
        isLoading && "outline-gray-200 hover:bg-gray-100",
        disabled && "opacity-50",
      )}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onPress={handlePress}
      disabled={disabled}
    >
      <View className="flex-1 gap-2 px-3 py-2">
        <View className="flex-row items-center gap-2">
          <View className="flex-1 flex-row items-center justify-between gap-2">
            <Text
              className={cn(
                "text-base font-bold",
                hasOccupation
                  ? isLoading
                    ? ""
                    : "text-primary group-hover:text-destructive"
                  : "text-gray-800",
              )}
            >
              {occupation.title}
            </Text>
            {isLoading && <ActivityIndicator size="small" />}
            {!isLoading && hasOccupation && isHovered && (
              <X size={16} className="text-destructive" />
            )}
            {!isLoading && hasOccupation && !isHovered && (
              <Check size={16} className="text-primary" />
            )}
            {!isLoading && !hasOccupation && (
              <Plus size={16} className="text-gray-400" />
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};
