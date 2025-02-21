import { View } from "react-native";
import { Map, Rocket, TerminalSquare } from "lucide-react-native";

import { cn, Text } from "@homefront/ui";

import { FeatureStatusType } from "./types";

interface FeatureStatusProps {
  status: FeatureStatusType;
}

export function FeatureStatus({ status }: FeatureStatusProps) {
  const getStatusConfig = (status: FeatureStatusType) => {
    switch (status) {
      case "live":
        return {
          icon: Rocket,
          backgroundColor: "bg-emerald-200",
          iconColor: "text-emerald-800",
          textColor: "text-emerald-700",
        };
      case "in_progress":
        return {
          icon: TerminalSquare,
          backgroundColor: "bg-primary-200",
          iconColor: "text-primary-800",
          textColor: "text-primary-700",
        };
      case "roadmap":
        return {
          icon: Map,
          backgroundColor: "bg-indigo-200",
          iconColor: "text-indigo-800",
          textColor: "text-indigo-700",
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <View
      className={cn(
        "flex-row items-center gap-x-1 rounded-sm px-1.5 py-0.5",
        config.backgroundColor,
      )}
    >
      <Icon size={16} className={cn(config.iconColor)} strokeWidth={1.5} />
      <Text
        className={cn("text-[11px] font-semibold uppercase", config.textColor)}
      >
        {status.replace("_", " ")}
      </Text>
    </View>
  );
}
