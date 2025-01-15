import type { LayoutChangeEvent } from "react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";

import { useScrollState } from "@homefront/app/hooks/useScrollState";
import { cn, H4, Text } from "@homefront/ui";

interface Skill {
  id: string;
  title: string;
  description: string | null;
  hasSkill: boolean;
  userLevel: string | null;
}

export function SkillsSection({
  title,
  description,
  skills,
  renderSkill,
}: {
  title: string;
  description?: string;
  skills: Skill[];
  renderSkill: (skill: Skill, isScrolling: boolean) => React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const { isScrolling, handleScrollBegin, handleScrollEnd } = useScrollState();

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    setContainerHeight(event.nativeEvent.layout.height);
  };

  const handleContentLayout = (event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  };

  useEffect(() => {
    if (hasOverflow) {
      // No need to check for overflow if we already know it exists
      // Prevents unnecessary re-renders and UI flickering
      return;
    }
    const hasNewOverflow = contentHeight > containerHeight;
    if (hasNewOverflow !== hasOverflow) {
      setHasOverflow(hasNewOverflow);
    }
  }, [containerHeight, contentHeight]);

  return (
    <View className="space-y-4">
      <View className="space-y-2">
        <H4>{title}</H4>
        {description && (
          <Text className="text-sm text-gray-500">{description}</Text>
        )}
      </View>

      <View
        className={cn(
          "overflow-hidden rounded-lg border border-gray-200",
          isExpanded ? "" : "max-h-48",
        )}
        onLayout={handleContainerLayout}
      >
        <ScrollView
          onScrollBeginDrag={handleScrollBegin}
          onScrollEndDrag={handleScrollEnd}
          onMomentumScrollBegin={handleScrollBegin}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
        >
          <View
            className="w-full flex-row flex-wrap gap-1 p-4"
            onLayout={handleContentLayout}
          >
            {skills.map((skill) => renderSkill(skill, isScrolling))}
          </View>
        </ScrollView>
      </View>

      <View className="h-6 items-center justify-center">
        {(hasOverflow || isExpanded) && (
          <Pressable
            onPress={() => setIsExpanded(!isExpanded)}
            className="flex-row items-center justify-start space-x-2"
          >
            <Text className="text-sm font-medium text-primary">
              {isExpanded ? "Collapse" : "Expand"}
            </Text>
            {isExpanded ? (
              <ChevronUp size={16} className="text-primary" />
            ) : (
              <ChevronDown size={16} className="text-primary" />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}
