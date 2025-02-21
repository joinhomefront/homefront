import { View } from "react-native";
import { LucideIcon } from "lucide-react-native";

import { Text } from "@homefront/ui";

import { FeatureStatus } from "./FeatureStatus";
import { FeatureStatusType } from "./types";

interface FeatureTitleProps {
  icon: LucideIcon;
  title: string;
  status?: FeatureStatusType;
}

export function FeatureTitle({ icon: Icon, title, status }: FeatureTitleProps) {
  return (
    <View className="flex-row items-center gap-x-2">
      <Icon size={24} className="text-primary" />
      <View className="flex-1 gap-y-2 py-2">
        <View className="flex-row items-center gap-x-5">
          <Text className="text-xl font-bold text-primary-950">{title}</Text>
          {status && <FeatureStatus status={status} />}
        </View>
      </View>
    </View>
  );
}
