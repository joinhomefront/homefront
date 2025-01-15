import type { LucideProps } from "lucide-react-native";
import {
  Ambulance,
  Binoculars,
  BookOpen,
  Brush,
  Camera,
  Clipboard,
  Cpu,
  Factory,
  Flag,
  FlaskConical,
  HardHat,
  HeartPulse,
  ListChecks,
  Megaphone,
  Package,
  RadioTower,
  Receipt,
  Scale,
  Settings,
  Shield,
  UsersRound,
  Utensils,
  Wheat,
  Wrench,
  Zap,
} from "lucide-react-native";

import { Military } from "./Military";

export interface DomainAreaProps extends LucideProps {
  domainArea:
    | "activism"
    | "administrative"
    | "agriculture"
    | "communications"
    | "community"
    | "construction"
    | "creative"
    | "education"
    | "emergency"
    | "energy"
    | "engineering"
    | "finance"
    | "food"
    | "health"
    | "intelligence"
    | "leadership"
    | "legal"
    | "logistics"
    | "maintenance"
    | "manufacturing"
    | "media"
    | "military"
    | "policy"
    | "science"
    | "security"
    | "technology";
}

export const DomainArea = ({
  domainArea,
  ...props
}: DomainAreaProps): React.ReactElement => {
  const getIconComponent = () => {
    switch (domainArea) {
      case "activism":
        return Megaphone;
      case "administrative":
        return Clipboard;
      case "agriculture":
        return Wheat;
      case "communications":
        return RadioTower;
      case "community":
        return UsersRound;
      case "construction":
        return HardHat;
      case "creative":
        return Brush;
      case "education":
        return BookOpen;
      case "emergency":
        return Ambulance;
      case "energy":
        return Zap;
      case "engineering":
        return Wrench;
      case "finance":
        return Receipt;
      case "food":
        return Utensils;
      case "health":
        return HeartPulse;
      case "intelligence":
        return Binoculars;
      case "leadership":
        return Flag;
      case "legal":
        return Scale;
      case "logistics":
        return Package;
      case "maintenance":
        return Wrench;
      case "manufacturing":
        return Factory;
      case "media":
        return Camera;
      case "military":
        return Military;
      case "policy":
        return ListChecks;
      case "science":
        return FlaskConical;
      case "security":
        return Shield;
      case "technology":
        return Cpu;
      default:
        return Settings; // Default icon for undefined domain areas
    }
  };

  const IconComponent = getIconComponent();
  return <IconComponent {...props} />;
};
