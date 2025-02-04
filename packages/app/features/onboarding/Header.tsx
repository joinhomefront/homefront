import type { LucideIcon } from "lucide-react-native";
import { createElement } from "react";
import { Platform, View } from "react-native";

import { H3 } from "@homefront/ui";

import type { OnboardingStep } from "./data";
import { OnboardingProgress } from "./OnboardingProgress";
import { TopNavigation } from "./TopNavigation";

interface HeaderProps {
  currentStep: OnboardingStep;
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

export const Header = ({ currentStep, icon, title, children }: HeaderProps) => {
  return (
    <View>
      <TopNavigation currentStep={currentStep} />
      <OnboardingProgress currentStep={currentStep} />
      <View className="flex-col items-center py-2 sm:flex-row sm:gap-x-4 md:py-6">
        <View className="justify-start text-primary">
          {createElement(icon, {
            size: Platform.select({ web: 92, default: 36 }),
            strokeWidth: 1,
            className: "text-sm",
          })}
        </View>
        <View className="flex-1 items-center justify-center gap-y-4 sm:items-start">
          <H3 className="text-xl sm:text-2xl">{title}</H3>
          <View className="gap-2 text-left">{children}</View>
        </View>
      </View>
    </View>
  );
};
