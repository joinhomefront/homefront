import type { LucideProps } from "lucide-react-native";

import {
  PriorityBlocker,
  PriorityCritical,
  PriorityHigh,
  PriorityHighest,
  PriorityLow,
  PriorityLowest,
  PriorityMajor,
  PriorityMedium,
  PriorityMinor,
  PriorityTrivial,
} from "./Priorities";

export interface PriorityProps extends LucideProps {
  priority:
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
}

export const Priority = ({
  priority,
  ...props
}: PriorityProps): React.ReactElement => {
  const getIconComponent = () => {
    switch (priority) {
      case "critical":
        return PriorityCritical;
      case "major":
        return PriorityMajor;
      case "highest":
        return PriorityHighest;
      case "high":
        return PriorityHigh;
      case "medium":
        return PriorityMedium;
      case "low":
        return PriorityLow;
      case "lowest":
        return PriorityLowest;
      case "minor":
        return PriorityMinor;
      case "blocker":
        return PriorityBlocker;
      default:
        return PriorityTrivial;
    }
  };

  const IconComponent = getIconComponent();
  return <IconComponent {...props} />;
};
