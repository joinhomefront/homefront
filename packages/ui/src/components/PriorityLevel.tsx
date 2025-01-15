import { View } from "react-native";

import { Priority } from "./icons";
import { Text } from "./text";

const getPriorityText = (priority: PriorityValue) => {
  switch (priority) {
    case "critical":
      return "Critical";
    case "major":
      return "Major";
    case "highest":
      return "Highest";
    case "high":
      return "High";
    case "medium":
      return "Medium";
    case "low":
      return "Low";
    case "lowest":
      return "Lowest";
    case "minor":
      return "Minor";
    case "trivial":
      return "Trivial";
    default:
      return "Unknown";
  }
};

type PriorityValue =
  | "blocker"
  | "critical"
  | "major"
  | "highest"
  | "high"
  | "medium"
  | "low"
  | "lowest"
  | "minor"
  | "trivial";

interface PriorityLevelProps {
  priority: PriorityValue;
}

export const PriorityLevel = ({ priority }: PriorityLevelProps) => {
  return (
    <View className="flex-row items-center gap-1">
      <Priority priority={priority} size={16} />
      <Text className="hidden text-xs font-bold text-gray-400 group-hover:text-white">
        {getPriorityText(priority)}
      </Text>
    </View>
  );
};
