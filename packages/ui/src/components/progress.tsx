"use client";

import * as React from "react";
import { Platform, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import * as ProgressPrimitive from "@rn-primitives/progress";

import { cn } from "@homefront/ui";

const Progress = React.forwardRef<
  ProgressPrimitive.RootRef,
  ProgressPrimitive.RootProps & {
    indicatorClassName?: string;
  }
>(({ className, value, indicatorClassName, max, ...props }, ref) => {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-primary-foreground",
        className,
      )}
      max={max}
      {...props}
    >
      <Indicator value={value} className={indicatorClassName} max={max} />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

function Indicator({
  value,
  max = 100,
  className,
}: {
  value: number | undefined | null;
  max: number | undefined;
  className?: string;
}) {
  const progress = useDerivedValue(() => value ?? 0);

  const indicator = useAnimatedStyle(() => {
    return {
      width: withSpring(
        `${interpolate(progress.value, [0, max], [1, 100], Extrapolation.CLAMP)}%`,
        { overshootClamping: true },
      ),
    };
  }, [progress]);

  if (Platform.OS === "web") {
    const percentage = ((value ?? 0) / max) * 100;
    return (
      <View
        className={cn(
          "web:transition-all h-full w-full flex-1 bg-primary",
          className,
        )}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      >
        <ProgressPrimitive.Indicator
          className={cn("h-full w-full", className)}
        />
      </View>
    );
  }

  return (
    <ProgressPrimitive.Indicator asChild>
      <Animated.View
        style={indicator}
        className={cn("h-full bg-foreground", className)}
      />
    </ProgressPrimitive.Indicator>
  );
}
