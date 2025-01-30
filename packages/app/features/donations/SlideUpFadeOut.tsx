import React from "react";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";

export const SlideUpFadeOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <Animated.View
      entering={FadeInLeft.duration(200)}
      exiting={FadeOutLeft.duration(200)}
    >
      {children}
    </Animated.View>
  );
};
