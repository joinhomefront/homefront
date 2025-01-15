"use client";

import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import * as TooltipPrimitive from "@rn-primitives/tooltip";

import { cn } from "@homefront/ui";

import { TextClassContext } from "./text";

const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  TooltipPrimitive.ContentRef,
  TooltipPrimitive.ContentProps & { portalHost?: string }
>(({ className, sideOffset = 4, portalHost, ...props }, ref) => (
  <TooltipPrimitive.Portal hostName={portalHost}>
    <TooltipPrimitive.Overlay
      style={Platform.OS !== "web" ? StyleSheet.absoluteFill : undefined}
    >
      <Animated.View
        entering={Platform.select({ web: undefined, default: FadeIn })}
        exiting={Platform.select({ web: undefined, default: FadeOut })}
      >
        <TextClassContext.Provider value="text-sm native:text-base text-white">
          <TooltipPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
              "web:animate-in web:fade-in-0 web:zoom-in-95 z-50 overflow-hidden rounded-md border border-gray-900 bg-gray-900 px-3 py-1.5 shadow-md shadow-foreground/5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              className,
            )}
            {...props}
          />
        </TextClassContext.Provider>
      </Animated.View>
    </TooltipPrimitive.Overlay>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipTrigger };
