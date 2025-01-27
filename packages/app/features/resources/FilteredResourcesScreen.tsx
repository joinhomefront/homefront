"use client";

import { SafeAreaView, ScrollView, View } from "react-native";
import {
  ArrowBigDown,
  ArrowBigUp,
  BookmarkIcon,
  LibrarySquare,
} from "lucide-react-native";

import { H2, Text } from "@homefront/ui";

import { ResourcesList } from "./ResourcesList";
import { ResourceFilter } from "./types";

interface ResourceScreenProps {
  filter: ResourceFilter;
}

const FILTER_TITLES = {
  saved: "Saved",
  upvoted: "Upvoted",
  downvoted: "Downvoted",
};

export function FilteredResourcesScreen({ filter }: ResourceScreenProps) {
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <View className="mx-auto w-full max-w-screen-xl flex-1 justify-center px-0 py-4 sm:px-2">
            <View className="max-w-prose space-y-2">
              <View className="flex-row items-center gap-2 px-3">
                <LibrarySquare size={30} className="-mt-[6px] text-primary" />
                <H2 className="font-header text-2xl font-bold uppercase text-primary">
                  Resources
                </H2>
              </View>
              <View className="flex-row items-center gap-1 px-3 py-1">
                {filter === "saved" && (
                  <BookmarkIcon
                    size={24}
                    className="text-amber-600"
                    fill="currentColor"
                  />
                )}
                {filter === "upvoted" && (
                  <ArrowBigUp
                    size={24}
                    className="text-primary"
                    fill="currentColor"
                  />
                )}
                {filter === "downvoted" && (
                  <ArrowBigDown
                    size={24}
                    className="text-destructive"
                    fill="currentColor"
                  />
                )}
                <Text className="text-sm font-bold">
                  {FILTER_TITLES[filter]}
                </Text>
              </View>
              <ResourcesList filter={filter} />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
