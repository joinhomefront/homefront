import {
  Flag,
  Globe,
  Map,
  MapPin,
  UserRound,
  UsersRound,
} from "lucide-react-native";

import type { ActionType } from "@homefront/db";
import { cn } from "@homefront/ui";

interface ActionTypeIconProps {
  className?: string;
  type: ActionType;
  size?: number;
}

export function ActionTypeIcon({
  className,
  type,
  size = 16,
}: ActionTypeIconProps) {
  switch (type) {
    case "personal":
      return <UserRound className={cn(className)} size={size} />;
    case "group":
      return <UsersRound className={cn(className)} size={size} />;
    case "local":
      return <MapPin className={cn(className)} size={size} />;
    case "regional":
      return <Map className={cn(className)} size={size} />;
    case "national":
      return <Flag className={cn(className)} size={size} />;
    case "global":
      return <Globe className={cn(className)} size={size} />;
  }
}
