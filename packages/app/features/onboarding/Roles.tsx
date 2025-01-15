"use client";

import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlashList } from "@shopify/flash-list";
import { Plus, Puzzle, XCircle } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";
import { z } from "zod";

import { UserRole } from "@homefront/app/features/roles/UserRole";
import { api } from "@homefront/app/utils/trpc";
import {
  ActivityIndicator,
  H4,
  Input,
  PriorityLevel,
  Text,
} from "@homefront/ui";

import { BottomNavigation } from "./BottomNavigation";
import { OnboardingStep } from "./data";
import { Header } from "./Header";
import { OnboardingHeader } from "./OnboardingHeader";

const CURRENT_STEP = OnboardingStep.Roles;

export function Roles() {
  const utils = api.useUtils();
  const formSchema = z.object({});

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [queryString, setQueryString] = useState("");
  const [debouncedQueryString] = useDebounceValue(queryString, 500);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (debouncedQueryString.length >= 2) {
      setQuery(debouncedQueryString);
    } else {
      setQuery("");
    }
  }, [debouncedQueryString]);

  const { data: roles, isLoading } = api.roles.searchRoles.useQuery(
    {
      query,
    },
    {
      enabled: !!query,
    },
  );

  const handleClear = () => {
    setQueryString("");
    setQuery("");
  };

  const createUserRolesMutation = api.roles.createUserRole.useMutation({
    onSuccess: () => {
      void utils.roles.getPopularRoles.invalidate();
      void utils.roles.recommendedRoles.invalidate();
      void utils.roles.getUserRoles.invalidate();
    },
  });

  const handlePress = (item: { roleId: string }) => {
    createUserRolesMutation.mutate({
      roleId: item.roleId,
    });
    handleClear();
  };

  const { data: recommendedRoles, isLoading: isLoadingRecommendedRoles } =
    api.roles.recommendedRoles.useQuery();

  const { data: popularRoles, isLoading: isLoadingPopularRoles } =
    api.roles.getPopularRoles.useQuery();

  const { data: userRoles, isLoading: isLoadingUserRoles } =
    api.roles.getUserRoles.useQuery();

  const otherRoles = userRoles?.filter((role) => {
    const isNotInPopular = !popularRoles?.find(
      (popularRole) => popularRole.id === role.id,
    );
    const isNotInRecommended = !recommendedRoles?.find(
      (recommendedRole) => recommendedRole.id === role.id,
    );
    return isNotInPopular && isNotInRecommended;
  });

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <OnboardingHeader />
          <View className="mx-auto w-full max-w-screen-sm flex-1 justify-center px-4">
            <View className="flex-1">
              <Header
                currentStep={CURRENT_STEP}
                icon={Puzzle}
                title="How can you help?"
              >
                <Text className="text-base">
                  What roles are you interested in?
                </Text>
                <Text className="text-sm text-gray-500">
                  Select all that apply to you.
                </Text>
              </Header>
              <View className="py-4">
                <View className="relative">
                  <Input
                    value={queryString}
                    onChangeText={(value) => {
                      setQueryString(value);
                    }}
                    placeholder="Search by role name or keyword"
                  />

                  {isLoading && (
                    <ActivityIndicator
                      className="absolute bottom-0 right-3 top-0"
                      size="small"
                    />
                  )}

                  {!isLoading && query.length !== 0 && (
                    <Pressable
                      className="group absolute bottom-0 right-0 top-0 p-2 hover:cursor-pointer"
                      onPress={handleClear}
                    >
                      <XCircle
                        size={24}
                        className="text-gray-500 group-hover:text-primary"
                      />
                    </Pressable>
                  )}
                </View>

                <View className="py-1">
                  <FlashList
                    data={roles}
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() => handlePress({ roleId: item.id })}
                      >
                        <View className="group px-3 py-2 hover:cursor-pointer hover:bg-primary">
                          <View className="flex-1 flex-row items-center justify-between">
                            <View className="flex-1 gap-y-1">
                              <Text className="text-base font-bold group-hover:text-background">
                                {item.title}
                              </Text>
                              {item.priority && (
                                <PriorityLevel priority={item.priority} />
                              )}
                            </View>
                            <View>
                              <Text>
                                <Plus
                                  size={16}
                                  className="text-gray-400 group-hover:text-primary-foreground"
                                />
                              </Text>
                            </View>
                          </View>
                        </View>
                      </Pressable>
                    )}
                    ItemSeparatorComponent={() => (
                      <View className="h-px bg-gray-200" />
                    )}
                    estimatedItemSize={60}
                    keyExtractor={(item) => `roles-search-result-${item.id}`}
                  />
                </View>
              </View>
              <View className="gap-4 py-4">
                <View className="space-y-2">
                  <H4>Popular roles</H4>
                  <Text className="text-sm text-gray-500">
                    Some of the most important roles in our community.
                  </Text>
                </View>
                {isLoadingPopularRoles && (
                  <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="small" />
                  </View>
                )}
                <View className="flex-row flex-wrap gap-2">
                  {popularRoles?.map((item) => (
                    <UserRole key={`popular-${item.id}`} role={item} />
                  ))}
                </View>
              </View>

              <View className="gap-4 py-4">
                <View className="space-y-2">
                  <H4>Recommended roles</H4>
                  <Text className="text-sm text-gray-500">
                    We recommended some roles based on your interests,
                    occupation, and skills.
                  </Text>
                </View>
                {isLoadingRecommendedRoles && (
                  <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="small" />
                  </View>
                )}
                <View className="flex-row flex-wrap gap-2">
                  {recommendedRoles?.map((item) => (
                    <UserRole
                      key={`recommended-roles-${item.id}`}
                      role={item}
                    />
                  ))}
                </View>
              </View>

              {otherRoles && otherRoles.length > 0 && (
                <View className="gap-4 py-4">
                  <View className="space-y-2">
                    <H4>Other roles</H4>
                    <Text className="text-sm text-gray-500">
                      Other roles you have added.
                    </Text>
                  </View>
                  {isLoadingUserRoles &&
                  isLoadingPopularRoles &&
                  isLoadingRecommendedRoles ? (
                    <View className="flex-1 items-center justify-center">
                      <ActivityIndicator size="small" />
                    </View>
                  ) : (
                    <View className="flex-row flex-wrap gap-2">
                      {otherRoles.map((item) => (
                        <UserRole key={`other-${item.id}`} role={item} />
                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
          <BottomNavigation<z.infer<typeof formSchema>>
            currentStep={CURRENT_STEP}
            form={form}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
