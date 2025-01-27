import {
  FlatList,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

import { api } from "@homefront/app/utils/trpc";
import { DomainArea } from "@homefront/db";
import {
  ActivityIndicator,
  cn,
  DomainArea as DomainAreaIcon,
  DomainAreaProps,
  Text,
} from "@homefront/ui";

function getRows(domainAreas: DomainArea[]) {
  // Calculate total chars and target per row
  const totalChars = domainAreas.reduce(
    (sum, area) => sum + area.title.length,
    0,
  );
  const targetCharsPerRow = totalChars / 3;

  // Find split points
  let currentChars = 0;
  let firstSplit = 0;
  let secondSplit = 0;

  for (let i = 0; i < domainAreas.length; i++) {
    if (domainAreas[i]?.title) {
      currentChars += domainAreas[i]?.title.length ?? 0;
    }
    if (!firstSplit && currentChars >= targetCharsPerRow) {
      firstSplit = i;
    }
    if (!secondSplit && currentChars >= targetCharsPerRow * 2) {
      secondSplit = i;
      break;
    }
  }

  const rows = [
    domainAreas.slice(0, firstSplit),
    domainAreas.slice(firstSplit, secondSplit),
    domainAreas.slice(secondSplit),
  ];

  return rows;
}

function DomainAreaButton({
  domainArea,
  selectedIds,
  onChange,
}: {
  domainArea: DomainArea;
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}) {
  const isSelected = selectedIds.includes(domainArea.id);

  return (
    <View key={domainArea.id} className="gap-1">
      <Pressable
        className={cn(
          "group h-full flex-1 rounded-md border outline hover:cursor-pointer",
          isSelected
            ? "border-primary outline-primary-foreground hover:bg-primary-100"
            : "border-gray-200 outline-transparent hover:bg-gray-100",
        )}
        onPress={() => {
          const newIds = isSelected
            ? selectedIds.filter((id) => id !== domainArea.id)
            : [...selectedIds, domainArea.id];
          onChange(newIds);
        }}
      >
        <View className="h-full w-full gap-2 px-2 py-2">
          <View className="flex-row items-center gap-2">
            <DomainAreaIcon
              size={16}
              className={cn(isSelected ? "text-primary" : "text-gray-500")}
              domainArea={domainArea.slug as DomainAreaProps["domainArea"]}
            />
            <View className="flex-1 flex-row justify-between">
              <Text
                className={cn(
                  "text-xs",
                  isSelected ? "text-primary" : "text-gray-500",
                )}
              >
                {domainArea.title}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

interface DomainAreaSelectorProps {
  label?: string;
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export function DomainAreaSelector({
  label,
  selectedIds,
  onChange,
}: DomainAreaSelectorProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { data: domainAreas, isLoading } =
    api.domainAreas.getDomainAreas.useQuery();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      {label && <Text className="mb-2 text-sm font-medium">{label}</Text>}
      {isMobile ? (
        <ScrollView horizontal showsHorizontalScrollIndicator>
          <View className="flex-col gap-1 pb-2">
            {getRows(domainAreas ?? []).map((row, i) => (
              <View key={`row-${i}`} className="flex-row gap-1">
                {row?.map((domainArea) => (
                  <DomainAreaButton
                    key={domainArea.id}
                    domainArea={domainArea}
                    selectedIds={selectedIds}
                    onChange={onChange}
                  />
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row flex-wrap gap-1">
          {domainAreas?.map((domainArea) => (
            <DomainAreaButton
              key={domainArea.id}
              domainArea={domainArea}
              selectedIds={selectedIds}
              onChange={onChange}
            />
          ))}
        </View>
      )}
    </View>
  );
}
