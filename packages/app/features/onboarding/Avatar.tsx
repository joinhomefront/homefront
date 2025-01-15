"use client";

import { SafeAreaView, ScrollView, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUser } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUser } from "@homefront/app/hooks/useUser";
import { ActivityIndicator, Text } from "@homefront/ui";

import { AvatarPicker } from "../avatars/AvatarPicker";
import { BottomNavigation } from "./BottomNavigation";
import { OnboardingStep } from "./data";
import { Header } from "./Header";
import { OnboardingHeader } from "./OnboardingHeader";

const CURRENT_STEP = OnboardingStep.Avatar;

export function Avatar() {
  const formSchema = z.object({});

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const { user, isLoading } = useUser();

  return (
    <SafeAreaView className="flex-1">
      <View className="h-screen-without-header w-full flex-1">
        <ScrollView className="w-full flex-1">
          <OnboardingHeader />
          <View className="mx-auto w-full max-w-screen-sm flex-1 justify-center px-4">
            <View className="flex-1">
              <Header
                currentStep={CURRENT_STEP}
                icon={CircleUser}
                title="Your avatar"
              >
                <Text className="text-base">
                  Step into the fight with an avatar that inspires you.
                </Text>
                <Text className="text-sm text-gray-500">
                  We picked a random one for you, but you can change it at any
                  time.
                </Text>
              </Header>
              <View className="py-4">
                {isLoading || !user ? (
                  <View className="w-full flex-1 items-center justify-center">
                    <ActivityIndicator size="small" />
                  </View>
                ) : (
                  <View className="w-full flex-1 items-center justify-center">
                    <AvatarPicker
                      centered
                      size="lg"
                      currentImage={user.image}
                      username={user.username}
                    />
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
