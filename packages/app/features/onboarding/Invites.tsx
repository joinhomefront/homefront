"use client";

import { SafeAreaView, ScrollView, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactRound } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Invites } from "@homefront/app/features/invites/Invites";
import { Text } from "@homefront/ui";

import { BottomNavigation } from "./BottomNavigation";
import { OnboardingStep } from "./data";
import { Header } from "./Header";
import { OnboardingHeader } from "./OnboardingHeader";

const CURRENT_STEP = OnboardingStep.Invites;

export function InvitesComponent() {
  const formSchema = z.object({});

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const {
    formState: { isValid },
  } = form;

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <OnboardingHeader />
          <View className="mx-auto w-full max-w-screen-sm flex-1 justify-center px-4">
            <Header
              currentStep={CURRENT_STEP}
              icon={ContactRound}
              title="Invite people you trust"
            >
              <Text className="text-base">
                Help build a trusted community ready to organize and take action
                when it matters most.
              </Text>
            </Header>

            {/* <ViralGrowthCalculator /> */}

            <Invites />
          </View>
          <BottomNavigation<z.infer<typeof formSchema>>
            currentStep={CURRENT_STEP}
            form={form}
            continueDisabled={!isValid}
            hideSkip
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
