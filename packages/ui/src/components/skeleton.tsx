"use client";

import * as React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { cn } from "../lib/utils";

const duration = 1000;

function Skeleton({
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Animated.View>, "style">) {
  const sv = useSharedValue(1);

  React.useEffect(() => {
    sv.value = withRepeat(
      withSequence(withTiming(0.5, { duration }), withTiming(1, { duration })),
      -1,
    );
  }, [sv]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: sv.value,
    }),
    [sv],
  );

  return (
    <Animated.View
      style={[animatedStyle]}
      className={cn("rounded-md bg-secondary dark:bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
