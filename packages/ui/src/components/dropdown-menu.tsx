"use client";

import type { TriggerRef } from "@rn-primitives/dropdown-menu";
import type { VariantProps } from "class-variance-authority";
import type { StyleProp, TextProps, ViewStyle } from "react-native";
import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import * as DropdownMenuPrimitive from "@rn-primitives/dropdown-menu";
import { cva } from "class-variance-authority";

import { cn } from "@homefront/ui";

import { Check } from "../lib/icons/Check";
import { ChevronDown } from "../lib/icons/ChevronDown";
import { ChevronRight } from "../lib/icons/ChevronRight";
import { ChevronUp } from "../lib/icons/ChevronUp";
import { TextClassContext } from "./text";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  DropdownMenuPrimitive.SubTriggerRef,
  DropdownMenuPrimitive.SubTriggerProps & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => {
  const { open } = DropdownMenuPrimitive.useSubContext();
  const Icon =
    Platform.OS === "web" ? ChevronRight : open ? ChevronUp : ChevronDown;
  return (
    <TextClassContext.Provider
      value={cn(
        "native:text-lg select-none text-sm text-primary",
        open && "native:text-accent-foreground",
      )}
    >
      <DropdownMenuPrimitive.SubTrigger
        ref={ref}
        className={cn(
          "web:cursor-default web:select-none web:focus:bg-accent web:hover:bg-accent native:py-2 web:outline-none flex flex-row items-center gap-2 rounded-sm px-2 py-1.5 active:bg-accent",
          open && "bg-accent",
          inset && "pl-8",
          className,
        )}
        {...props}
      >
        {/* biome-ignore lint/complexity/noUselessFragments: <Fragment is necessary for unknown children> */}
        <>{children}</>
        <Icon size={18} className="ml-auto text-foreground" />
      </DropdownMenuPrimitive.SubTrigger>
    </TextClassContext.Provider>
  );
});
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  DropdownMenuPrimitive.SubContentRef,
  DropdownMenuPrimitive.SubContentProps
>(({ className, ...props }, ref) => {
  const { open } = DropdownMenuPrimitive.useSubContext();
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 shadow-md shadow-foreground/5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        open
          ? "web:animate-in web:fade-in-0 web:zoom-in-95"
          : "web:animate-out web:fade-out-0 web:zoom-out",
        className,
      )}
      {...props}
    />
  );
});
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  DropdownMenuPrimitive.ContentRef,
  DropdownMenuPrimitive.ContentProps & {
    overlayStyle?: StyleProp<ViewStyle>;
    overlayClassName?: string;
    portalHost?: string;
  }
>(
  (
    { className, overlayClassName, overlayStyle, portalHost, ...props },
    ref,
  ) => {
    const { open } = DropdownMenuPrimitive.useRootContext();
    return (
      <DropdownMenuPrimitive.Portal hostName={portalHost}>
        <DropdownMenuPrimitive.Overlay
          style={
            overlayStyle
              ? StyleSheet.flatten([
                  Platform.OS !== "web" ? StyleSheet.absoluteFill : undefined,
                  overlayStyle,
                ] as unknown as ViewStyle)
              : Platform.OS !== "web"
                ? StyleSheet.absoluteFill
                : undefined
          }
          className={overlayClassName}
        >
          <DropdownMenuPrimitive.Content
            ref={ref}
            className={cn(
              "web:data-[side=bottom]:slide-in-from-top-2 web:data-[side=left]:slide-in-from-right-2 web:data-[side=right]:slide-in-from-left-2 web:data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 shadow-md shadow-foreground/5",
              open
                ? "web:animate-in web:fade-in-0 web:zoom-in-95"
                : "web:animate-out web:fade-out-0 web:zoom-out-95",
              className,
            )}
            {...props}
          />
        </DropdownMenuPrimitive.Overlay>
      </DropdownMenuPrimitive.Portal>
    );
  },
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const dropdownMenuItemVariants = cva(
  "web:cursor-pointer web:outline-none group relative flex flex-row items-center gap-2 rounded-sm px-2 py-1.5 active:bg-accent",
  {
    variants: {
      variant: {
        default: "web:focus:bg-accent web:hover:bg-accent",
        destructive:
          "web:focus:bg-destructive-foreground web:hover:bg-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const dropdownMenuItemTextVariants = cva("native:text-lg select-none text-sm", {
  variants: {
    variant: {
      default: "web:group-focus:text-accent-foreground text-popover-foreground",
      destructive: "web:group-focus:text-destructive text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type DropdownMenuItemProps = DropdownMenuPrimitive.ItemProps & {
  inset?: boolean;
} & VariantProps<typeof dropdownMenuItemVariants>;

const DropdownMenuItem = React.forwardRef<
  DropdownMenuPrimitive.ItemRef,
  DropdownMenuItemProps
>(({ className, inset, variant, ...props }, ref) => (
  <TextClassContext.Provider value={dropdownMenuItemTextVariants({ variant })}>
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        inset && "pl-8",
        props.disabled && "web:pointer-events-none opacity-50",
        dropdownMenuItemVariants({ variant, className }),
      )}
      {...props}
    />
  </TextClassContext.Provider>
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  DropdownMenuPrimitive.CheckboxItemRef,
  DropdownMenuPrimitive.CheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "web:cursor-default web:group native:py-2 web:outline-none web:focus:bg-accent relative flex flex-row items-center rounded-sm py-1.5 pl-8 pr-2 active:bg-accent",
      props.disabled && "web:pointer-events-none opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check size={14} strokeWidth={3} className="text-foreground" />
      </DropdownMenuPrimitive.ItemIndicator>
    </View>
    {/* biome-ignore lint/complexity/noUselessFragments: <Fragment is necessary for unknown children> */}
    <>{children}</>
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  DropdownMenuPrimitive.RadioItemRef,
  DropdownMenuPrimitive.RadioItemProps
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "web:cursor-default web:group native:py-2 web:outline-none web:focus:bg-accent relative flex flex-row items-center rounded-sm py-1.5 pl-8 pr-2 active:bg-accent",
      props.disabled && "web:pointer-events-none opacity-50",
      className,
    )}
    {...props}
  >
    <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <View className="h-2 w-2 rounded-full bg-foreground" />
      </DropdownMenuPrimitive.ItemIndicator>
    </View>
    {/* biome-ignore lint/complexity/noUselessFragments: <Fragment is necessary for unknown children> */}
    <>{children}</>
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  DropdownMenuPrimitive.LabelRef,
  DropdownMenuPrimitive.LabelProps & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "native:text-base web:cursor-default px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  DropdownMenuPrimitive.SeparatorRef,
  DropdownMenuPrimitive.SeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: TextProps) => {
  return (
    <Text
      className={cn(
        "native:text-sm ml-auto text-xs tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export type { TriggerRef };
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
