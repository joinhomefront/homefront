import React, { useState } from "react";
import { Easing, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutUp,
  StretchOutY,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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
