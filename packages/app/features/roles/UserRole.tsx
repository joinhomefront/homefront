"use client";

import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { Check, Plus, X } from "lucide-react-native";

import type { DomainAreaProps, PriorityProps } from "@homefront/ui";
import { api } from "@homefront/app/utils/trpc";
import { cn, DomainArea, Priority, PriorityLevel, Text } from "@homefront/ui";

interface UserRoleProps {
  role: {
    id: string;
    userRoleId: string | null;
    title: string;
    priority: string | null;
    domainAreas: string[];
    hasRole: boolean;
  };
}

export const UserRole = ({ role }: UserRoleProps) => {
  const utils = api.useUtils();

  const [hasRole, setHasRole] = useState<boolean>(role.hasRole);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createUserRole = api.roles.createUserRole.useMutation({
    onError: () => {
      setHasRole(false);
    },
    onSettled: () => {
      setIsLoading(false);
      void utils.roles.getPopularRoles.invalidate();
      void utils.roles.getUserRoles.invalidate();
      void utils.roles.recommendedRoles.invalidate();
    },
  });

  const deleteUserRole = api.roles.deleteUserRole.useMutation({
    onError: () => {
      setHasRole(true);
    },
    onSettled: () => {
      setIsLoading(false);
      void utils.roles.getPopularRoles.invalidate();
      void utils.roles.getUserRoles.invalidate();
      void utils.roles.recommendedRoles.invalidate();
    },
  });

  const handlePress = async () => {
    setIsLoading(true);

    if (hasRole) {
      setHasRole(false);
      await deleteUserRole.mutateAsync({
        roleId: role.id,
      });
    } else {
      setHasRole(true);
      await createUserRole.mutateAsync({
        roleId: role.id,
      });
    }
  };

  useEffect(() => {
    setHasRole(role.hasRole);
  }, [role.hasRole]);

  const disabled = isLoading;

  return (
    <Pressable
      key={`user-role-${role.userRoleId ?? role.id}`}
      className={cn(
        "web:hover:cursor-pointer group rounded-md border outline outline-transparent",
        hasRole &&
          !isLoading &&
          "web:hover:border-destructive web:hover:bg-destructive-100 web:hover:outline-destructive-foreground border-primary outline-primary-foreground",
        !hasRole &&
          !isLoading &&
          "web:hover:bg-gray-100 border-gray-200 outline-transparent",
        isLoading && "web:hover:bg-gray-100 outline-gray-200",
        disabled && "opacity-50",
      )}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onPress={handlePress}
      disabled={disabled}
    >
      <View className="flex-1 gap-y-1">
        <View className="flex-1 flex-row items-center justify-between gap-3 px-3 pb-2 pt-2">
          <Priority
            priority={role.priority as PriorityProps["priority"]}
            size={16}
          />
          <Text
            className={cn(
              "text-base font-bold",
              hasRole &&
                !isLoading &&
                "web:group-hover:text-destructive text-primary",
              !hasRole && "text-gray-800",
            )}
          >
            {role.title}
          </Text>
          {isLoading && <ActivityIndicator size="small" />}
          {!isLoading && hasRole && isHovered && (
            <X size={16} className="text-destructive" />
          )}
          {!isLoading && hasRole && !isHovered && (
            <Check size={16} className="text-primary" />
          )}
          {!isLoading && !hasRole && (
            <Plus size={16} className="text-gray-400" />
          )}
        </View>
        <View className="hidden flex-row items-center gap-3 px-3 pb-2 pt-1">
          <PriorityLevel
            priority={role.priority as PriorityProps["priority"]}
          />

          <View className="hidden flex-row items-center gap-1">
            {role.domainAreas.map((domainArea) => (
              <DomainArea
                key={`${role.id}-domain-area-${domainArea}`}
                size={16}
                className="text-gray-400"
                domainArea={domainArea as DomainAreaProps["domainArea"]}
              />
            ))}
          </View>
        </View>
      </View>
    </Pressable>
  );
};
