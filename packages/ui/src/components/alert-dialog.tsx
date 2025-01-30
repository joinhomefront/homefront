"use client";

import type {
  ActionProps,
  ActionRef,
  CancelProps,
  CancelRef,
  ContentProps,
  ContentRef,
  DescriptionProps,
  DescriptionRef,
  OverlayProps,
  OverlayRef,
  TitleProps,
  TitleRef,
} from "@rn-primitives/alert-dialog";
import type { ViewProps } from "react-native";
import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
// import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
  useRootContext,
} from "@rn-primitives/alert-dialog";

import { cn } from "../lib/utils";
import { buttonTextVariants, buttonVariants } from "./button";
import { TextClassContext } from "./text";

const AlertDialog = Root;

const AlertDialogTrigger = Trigger;

const AlertDialogPortal = Portal;

const AlertDialogOverlayWeb = React.forwardRef<OverlayRef, OverlayProps>(
  ({ className, ...props }, ref) => {
    const { open } = useRootContext();
    return (
      <Overlay
        className={cn(
          "absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/80 p-2",
          open
            ? "web:animate-in web:fade-in-0"
            : "web:animate-out web:fade-out-0",
          className,
        )}
        {...props}
        ref={ref}
      />
    );
  },
);

AlertDialogOverlayWeb.displayName = "AlertDialogOverlayWeb";

const AlertDialogOverlayNative = React.forwardRef<OverlayRef, OverlayProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Overlay
        style={StyleSheet.absoluteFill}
        className={cn(
          "z-50 flex items-center justify-center bg-black/80 p-2",
          className,
        )}
        {...props}
        ref={ref}
        asChild
      >
        <View
        // entering={FadeIn.duration(150)}
        // exiting={FadeOut.duration(150)}
        >
          {children}
        </View>
      </Overlay>
    );
  },
);

AlertDialogOverlayNative.displayName = "AlertDialogOverlayNative";

const AlertDialogOverlay = Platform.select({
  web: AlertDialogOverlayWeb,
  default: AlertDialogOverlayNative,
});

const AlertDialogContent = React.forwardRef<
  ContentRef,
  ContentProps & { portalHost?: string }
>(({ className, portalHost, ...props }, ref) => {
  const { open } = useRootContext();

  return (
    <AlertDialogPortal hostName={portalHost}>
      <AlertDialogOverlay>
        <Content
          ref={ref}
          className={cn(
            "web:duration-200 z-50 max-w-lg gap-4 rounded-lg border border-border bg-background p-6 shadow-lg shadow-foreground/10",
            open
              ? "web:animate-in web:fade-in-0 web:zoom-in-95"
              : "web:animate-out web:fade-out-0 web:zoom-out-95",
            className,
          )}
          {...props}
        />
      </AlertDialogOverlay>
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = Content.displayName;

const AlertDialogHeader = ({ className, ...props }: ViewProps) => (
  <View className={cn("flex flex-col gap-2", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: ViewProps) => (
  <View
    className={cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<TitleRef, TitleProps>(
  ({ className, ...props }, ref) => (
    <Title
      ref={ref}
      className={cn(
        "native:text-xl text-lg font-semibold text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
AlertDialogTitle.displayName = Title.displayName;

const AlertDialogDescription = React.forwardRef<
  DescriptionRef,
  DescriptionProps
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={cn("native:text-base text-sm text-muted-foreground", className)}
    {...props}
  />
));
AlertDialogDescription.displayName = Description.displayName;

const AlertDialogAction = React.forwardRef<ActionRef, ActionProps>(
  ({ className, ...props }, ref) => (
    <TextClassContext.Provider value={buttonTextVariants({ className })}>
      <Action
        ref={ref}
        className={cn(buttonVariants(), className)}
        {...props}
      />
    </TextClassContext.Provider>
  ),
);
AlertDialogAction.displayName = Action.displayName;

const AlertDialogCancel = React.forwardRef<CancelRef, CancelProps>(
  ({ className, ...props }, ref) => (
    <TextClassContext.Provider
      value={buttonTextVariants({ className, variant: "outline" })}
    >
      <Cancel
        ref={ref}
        className={cn(buttonVariants({ variant: "outline", className }))}
        {...props}
      />
    </TextClassContext.Provider>
  ),
);
AlertDialogCancel.displayName = Cancel.displayName;

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
