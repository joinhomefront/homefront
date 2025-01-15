import { Platform, View } from "react-native";

import type { DomainArea as DomainAreaType } from "@homefront/db";
import type { DomainAreaProps } from "@homefront/ui";
import { useSafeArea } from "@homefront/app/provider/safe-area/useSafeArea";
import {
  DomainArea,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@homefront/ui";

interface ActionDomainAreasListProps {
  domainAreas: DomainAreaType[];
}

export function ActionDomainAreasList({
  domainAreas,
}: ActionDomainAreasListProps) {
  const insets = useSafeArea();

  // const filteredDomainAreas = domainAreas.filter(
  //   (domainArea) => domainArea.hasDomainArea,
  // );
  return (
    <View>
      <View className="flex-row flex-wrap gap-1">
        {domainAreas.map((domainArea) => (
          <View key={domainArea.id} className="group">
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <View>
                  <DomainArea
                    size={16}
                    className="text-gray-500 group-hover:text-gray-700"
                    domainArea={
                      domainArea.slug as DomainAreaProps["domainArea"]
                    }
                  />
                </View>
              </TooltipTrigger>

              <TooltipContent
                side={Platform.OS === "web" ? "bottom" : "bottom"}
                insets={insets}
              >
                <Text className="text-xs font-semibold">
                  {domainArea.title}
                </Text>
              </TooltipContent>
            </Tooltip>
          </View>
        ))}
      </View>
    </View>
  );
}
