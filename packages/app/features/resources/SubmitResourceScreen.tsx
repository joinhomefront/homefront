"use client";

import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import { H3 } from "@homefront/ui";

import { LinkForm } from "./LinkForm";
import { Tabs } from "./Tabs";
import { Tab } from "./types";

export function SubmitResourceScreen() {
  const [activeTab, setActiveTab] = useState<Tab["key"]>("link");

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <View className="mx-auto w-full max-w-screen-xl flex-1 justify-center p-4">
            <View className="max-w-prose space-y-8">
              <H3 className="font-header uppercase text-primary">
                Submit a resource
              </H3>

              <Tabs activeTab={activeTab} onChange={setActiveTab} />

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
