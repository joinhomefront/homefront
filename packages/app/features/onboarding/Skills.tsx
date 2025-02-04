"use client";

import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlashList } from "@shopify/flash-list";
import { Plus, XCircle } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";
import { z } from "zod";

import { UserSkill } from "@homefront/app/features/skills/UserSkill";
import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Chevron3, Input, Text } from "@homefront/ui";

import { BottomNavigation } from "./BottomNavigation";
import { OnboardingStep } from "./data";
import { Header } from "./Header";
import { OnboardingHeader } from "./OnboardingHeader";
import { SkillsSection } from "./SkillsSection";

const CURRENT_STEP = OnboardingStep.Skills;

export const Skills = () => {
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

  const { data: skills, isLoading } = api.skills.search.useQuery(
    {
      query,
    },
    {
      enabled: !!query,
    },
  );

  const createUserSkillMutation = api.skills.createUserSkill.useMutation({
    onSuccess: () => {
      void utils.skills.getUserSkills.invalidate();
      void utils.skills.recommendedForUser.invalidate();
    },
  });

  const handleClear = () => {
    setQueryString("");
    setQuery("");
  };

  const handlePress = (item: { id: string }) => {
    createUserSkillMutation.mutate({
      skillId: item.id,
      level: null,
    });
    handleClear();
  };

  const { data: userSkills, isLoading: isLoadingUserSkills } =
    api.skills.getUserSkills.useQuery();

  const { data: recommendedSkills, isLoading: isLoadingRecommendedSkills } =
    api.skills.recommendedForUser.useQuery();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex w-full">
        <ScrollView className="w-full flex-1">
          <OnboardingHeader />
          <View className="mx-auto w-full max-w-screen-sm flex-1 justify-center px-4">
            <View className="mx-auto">
              <Header
                currentStep={CURRENT_STEP}
                icon={Chevron3}
                title="Your skills"
              >
                <Text className="text-base">
                  Add your skills&mdash;and your experience level&mdash;to find
                  better volunteer roles, resources, and relevant actions.
                </Text>
              </Header>

              <View className="py-4">
                <View className="relative">
                  <Input
                    value={queryString}
                    onChangeText={setQueryString}
                    placeholder="Search by skill name or keyword"
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
                    data={skills}
                    renderItem={({ item }) => (
                      <Pressable onPress={() => handlePress(item)}>
                        <View className="group px-3 py-2 hover:cursor-pointer hover:bg-primary">
                          <View className="flex-1 flex-row items-center justify-between gap-x-2">
                            <View className="flex-1">
                              <Text className="text-base font-bold group-hover:text-background">
                                {item.title}
                              </Text>
                              <Text
                                className="text-sm text-gray-500 group-hover:text-primary-100"
                                numberOfLines={2}
                              >
                                {item.description}
                              </Text>
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
                    estimatedItemSize={81}
                    keyExtractor={(item) => `skills-search-result-${item.id}`}
                  />
                </View>
              </View>

              <View className="py-4">
                {isLoadingUserSkills ? (
                  <View className="flex-row items-center justify-center">
                    <ActivityIndicator size="small" />
                  </View>
                ) : (
                  <>
                    {userSkills && (
                      <SkillsSection
                        title="Your skills"
                        description="If you added an occupation, some core skills may already be added for you."
                        skills={userSkills}
                        renderSkill={(skill, isScrolling) => (
                          <UserSkill
                            key={skill.id}
                            skill={skill}
                            isScrolling={isScrolling}
                          />
                        )}
                      />
                    )}
                  </>
                )}
              </View>

              <View className="py-4">
                {isLoadingRecommendedSkills && (
                  <View className="flex-row items-center justify-center">
                    <ActivityIndicator size="small" />
                  </View>
                )}
                {recommendedSkills && recommendedSkills.length > 0 && (
                  <SkillsSection
                    title="Suggested skills based on your profile"
                    description="Choose more specific skills to get better recommendations."
                    skills={recommendedSkills}
                    renderSkill={(skill, isScrolling) => (
                      <UserSkill
                        key={skill.id}
                        skill={skill}
                        isScrolling={isScrolling}
                      />
                    )}
                  />
                )}
              </View>
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
};
