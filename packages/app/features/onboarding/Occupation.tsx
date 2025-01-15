"use client";

import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlashList } from "@shopify/flash-list";
import { BriefcaseBusiness, Plus, XCircle } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";
import { z } from "zod";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Input, Text } from "@homefront/ui";

import { UserOccupation } from "../occupations/UserOccupation";
import { BottomNavigation } from "./BottomNavigation";
import { OnboardingStep } from "./data";
import { Header } from "./Header";
import { OnboardingHeader } from "./OnboardingHeader";

const CURRENT_STEP = OnboardingStep.Occupation;

export function Occupation() {
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

  const { data: occupations, isLoading } = api.occupations.search.useQuery(
    {
      query,
    },
    {
      enabled: !!query,
    },
  );

  const createUserOccupationMutation =
    api.occupations.createUserOccupation.useMutation({
      onSuccess: () => {
        void utils.occupations.getUserOccupations.invalidate();
      },
    });

  const handleClear = () => {
    setQueryString("");
    setQuery("");
  };

  const handlePress = (item: { occupationId: string; title: string }) => {
    createUserOccupationMutation.mutate({
      occupationId: item.occupationId,
      title: item.title,
    });
    handleClear();
  };

  const { data: userOccupations } =
    api.occupations.getUserOccupations.useQuery();

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <OnboardingHeader />
          <View className="mx-auto w-full max-w-screen-sm flex-1 justify-center px-4">
            <View className="mx-auto">
              <Header
                currentStep={CURRENT_STEP}
                icon={BriefcaseBusiness}
                title="Your work experience"
              >
                <Text className="text-base">
                  Your work experience can help us match you to volunteer roles
                  that make the most of your skills.
                </Text>
              </Header>

              <View className="py-4">
                <View className="relative">
                  <Input
                    value={queryString}
                    onChangeText={(value) => {
                      setQueryString(value);
                    }}
                    placeholder="Search by job title or keyword"
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
                    data={occupations}
                    renderItem={({ item }) => (
                      <Pressable onPress={() => handlePress(item)}>
                        <View className="group px-3 py-2 hover:cursor-pointer hover:bg-primary">
                          <View className="flex-1 flex-row items-center justify-between">
                            <Text className="text-base font-bold group-hover:text-background">
                              {item.title}
                            </Text>
                            <Text>
                              <Plus
                                size={16}
                                className="text-gray-400 group-hover:text-primary-foreground"
                              />
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    )}
                    ItemSeparatorComponent={() => (
                      <View className="h-px bg-gray-200" />
                    )}
                    estimatedItemSize={100}
                    keyExtractor={(item) =>
                      `occupation-search-result-${item.id}`
                    }
                  />
                </View>
              </View>
              {userOccupations && (
                <View className="py-4">
                  <View className="flex-row flex-wrap gap-2">
                    {userOccupations.map((occupation) => (
                      <UserOccupation
                        key={occupation.id}
                        occupation={occupation}
                      />
                    ))}
                  </View>
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
