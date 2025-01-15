"use client";

import { SafeAreaView, ScrollView, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeartHandshake } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { UserDomainArea } from "@homefront/app/features/domainAreas/UserDomainArea";
import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Text } from "@homefront/ui";

import { BottomNavigation } from "./BottomNavigation";
import { OnboardingStep } from "./data";
import { Header } from "./Header";
import { OnboardingHeader } from "./OnboardingHeader";

const CURRENT_STEP = OnboardingStep.DomainAreas;

export function DomainAreas() {
  const formSchema = z.object({});

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const { data: domainAreas, isLoading } =
    api.domainAreas.getAllDomainAreas.useQuery();

  return (
    <SafeAreaView className="flex-1" style={{ flex: 1 }}>
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <OnboardingHeader />
          <View className="mx-auto w-full max-w-screen-sm flex-1 px-4">
            <View>
              <Header
                currentStep={CURRENT_STEP}
                icon={HeartHandshake}
                title="Your interests"
              >
                <Text className="text-base">
                  How do you think you could help? What do you want to learn?
                </Text>
                <Text className="text-sm text-gray-500">
                  Select all that apply.
                </Text>
              </Header>

              <View className="py-4">
                {isLoading ? (
                  <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="small" />
                  </View>
                ) : (
                  <View className="-m-1 flex-row flex-wrap">
                    {domainAreas?.map((item) => (
                      <View key={item.id} className="w-full p-1 sm:w-1/2">
                        <UserDomainArea key={item.id} domainArea={item} />
                      </View>
                    ))}
                  </View>
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
}
