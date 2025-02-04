"use client";

import { useState } from "react";
import { View } from "react-native";
import { Bookmark as BookmarkIcon, Check, Plus } from "lucide-react-native";
import { MotiView } from "moti";
import { MotiPressable, useMotiPressable } from "moti/interactions";

import { cn } from "../lib/utils";

interface BookmarkAnimatedIconProps {
  bookmarked: boolean;
}

const BookmarkAnimatedIcon = ({ bookmarked }: BookmarkAnimatedIconProps) => {
  const state = useMotiPressable(
    ({ pressed }) => {
      "worklet";

      return {
        transform:
          !bookmarked && pressed
            ? [{ scale: 1.8 }, { rotate: "15deg" }]
            : [{ scale: 1 }, { rotate: "0deg" }],
      };
    },
    [bookmarked],
  );

  return (
    <MotiView state={state}>
      <BookmarkIcon
        size={20}
        className={cn(
          "transition-colors duration-200",
          bookmarked ? "text-white" : "fill",
        )}
        fill={bookmarked ? "currentColor" : "none"}
      />
    </MotiView>
  );
};

interface BookmarkProps {
  isBookmarked?: boolean;
  onBookmark: (isBookmarked: boolean) => void;
}

export function Bookmark({ isBookmarked = false, onBookmark }: BookmarkProps) {
  const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked);
  const handlePress = () => {
    setBookmarked(!bookmarked);
    onBookmark(!bookmarked);
  };

  return (
    <View
      className={cn(
        "pointer-events-auto h-fit w-fit flex-row items-center rounded-full bg-gray-400 hover:bg-gray-300",
        bookmarked && "bg-amber-600 hover:bg-amber-500",
      )}
    >
      <MotiPressable onPress={handlePress}>
        <View className="flex-row items-center gap-1 rounded-full px-3 py-1.5 text-white">
          <BookmarkAnimatedIcon bookmarked={bookmarked} />
          {bookmarked ? (
            <Check size={16} className="text-white" />
          ) : (
            <Plus size={16} className="text-white" />
          )}
        </View>
      </MotiPressable>
    </View>
  );
}
