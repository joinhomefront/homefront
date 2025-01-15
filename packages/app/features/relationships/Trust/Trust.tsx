import { Platform, View } from "react-native";

import { useSafeArea } from "@homefront/app/provider/safe-area/useSafeArea";
import { Text, Tooltip, TooltipContent, TooltipTrigger } from "@homefront/ui";

import type { RelationshipStatus, TrustLevel } from "../types";
import { TrustIcon } from "./TrustIcon";
import { getTrustText } from "./utils";

interface TrustProps {
  trustLevel: TrustLevel | null;
  relationshipStatus: RelationshipStatus;
}

export function Trust({ trustLevel, relationshipStatus }: TrustProps) {
  const insets = useSafeArea();

  return (
    <View>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <View>
            <TrustIcon
              trustLevel={trustLevel}
              relationshipStatus={relationshipStatus}
            />
          </View>
        </TooltipTrigger>

        <TooltipContent
          side={Platform.OS === "web" ? "right" : "top"}
          insets={insets}
        >
          <Text className="text-xs font-semibold">
            {getTrustText({ trustLevel, relationshipStatus })}
          </Text>
        </TooltipContent>
      </Tooltip>
    </View>
  );
}
