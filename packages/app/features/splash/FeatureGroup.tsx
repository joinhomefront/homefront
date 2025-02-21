import { ReactNode } from "react";
import { View } from "react-native";

import { Text } from "@homefront/ui";

interface FeatureGroupProps {
  title: string;
  children: ReactNode;
}

export function FeatureGroup({ title, children }: FeatureGroupProps) {
  return (
    <View className="gap-y-6">
      <Text className="font-header-bold text-4xl font-bold uppercase text-primary-900">
        {title}
      </Text>
      <View className="gap-y-8">{children}</View>
    </View>
  );
}
