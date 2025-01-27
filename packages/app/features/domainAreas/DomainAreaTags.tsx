import { useId } from "react";
import { View, ViewProps } from "react-native";

import type { DomainArea } from "@homefront/db";
import {
  cn,
  DomainArea as DomainAreaIcon,
  DomainAreaProps,
  Text,
} from "@homefront/ui";

interface DomainAreaTagsProps {
  domainAreas: DomainArea[];
}

export function DomainAreaTags({
  domainAreas,
  className,
  ...props
}: DomainAreaTagsProps & ViewProps) {
  if (!domainAreas.length) return null;

  return (
    <View className={cn("flex-row flex-wrap gap-1", className)} {...props}>
      {domainAreas.map((area) => (
        <View
          key={`${area.slug}-${useId()}`}
          className="select-none flex-row items-center gap-1 rounded-full border border-gray-200 px-2 py-1"
        >
          <DomainAreaIcon
            size={16}
            domainArea={area.slug as DomainAreaProps["domainArea"]}
            className="text-gray-500"
          />
          <Text className="hidden text-xs text-gray-500 sm:block">
            {area.title}
          </Text>
        </View>
      ))}
    </View>
  );
}
