"use client";

import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useRouter, useSearchParams } from "solito/navigation";

import { H3 } from "@homefront/ui";

import type { Tab } from "./types";
import { LinkForm } from "./LinkForm";
import { Tabs } from "./Tabs";

export function SubmitResourceScreen() {
  const { push, replace } = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams?.get("type") as Tab["key"] | undefined;
  const [activeTab, setActiveTab] = useState<Tab["key"]>(typeParam ?? "link");

  useEffect(() => {
    if (!typeParam) {
      replace(`?type=link`);
    }
  }, [typeParam]);

  const handleTabChange = (tab: Tab["key"]) => {
    setActiveTab(tab);
    push(`?type=${tab}`);
  };

  if (!typeParam) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <View className="mx-auto w-full max-w-screen-xl flex-1 justify-center p-4">
            <View className="max-w-prose gap-y-8">
              <H3 className="font-header-bold uppercase text-primary">
                Submit a resource
              </H3>

              <Tabs activeTab={activeTab} onChange={handleTabChange} />

              {activeTab === "link" && <LinkForm />}
              {/* {activeTab === "text" && <TextForm />}
              {activeTab === "media" && <MediaForm />} */}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
