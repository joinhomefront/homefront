"use client";

import type { TextProps } from "react-native";
import * as React from "react";
import { Platform, Text, View } from "react-native";
import * as MenubarPrimitive from "@rn-primitives/menubar";

import { cn } from "@homefront/ui";

import { Check } from "../lib/icons/Check";
import { ChevronDown } from "../lib/icons/ChevronDown";
import { ChevronRight } from "../lib/icons/ChevronRight";
import { ChevronUp } from "../lib/icons/ChevronUp";
import { TextClassContext } from "./text";

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<
  MenubarPrimitive.RootRef,
  MenubarPrimitive.RootProps
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "native:h-12 flex h-10 flex-row items-center space-x-1 rounded-md border border-border bg-background p-1",
      className,
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  MenubarPrimitive.TriggerRef,
  MenubarPrimitive.TriggerProps
>(({ className, ...props }, ref) => {
  const { value } = MenubarPrimitive.useRootContext();
  const { value: itemValue } = MenubarPrimitive.useMenuContext();

  return (
    <MenubarPrimitive.Trigger
      ref={ref}
      className={cn(
        "web:cursor-default web:select-none native:h-10 native:px-5 native:py-0 web:outline-none web:focus:bg-accent web:focus:text-accent-foreground flex flex-row items-center rounded-sm px-3 py-1.5 text-sm font-medium active:bg-accent",
        value === itemValue && "bg-accent text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
});
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  MenubarPrimitive.SubTriggerRef,
  MenubarPrimitive.SubTriggerProps & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => {
  const { open } = MenubarPrimitive.useSubContext();
  const Icon =
    Platform.OS === "web" ? ChevronRight : open ? ChevronUp : ChevronDown;
  return (
    <TextClassContext.Provider
      value={cn(
        "native:text-lg select-none text-sm text-primary",
        open && "native:text-accent-foreground",
      )}
    >
      <MenubarPrimitive.SubTrigger
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
      </MenubarPrimitive.SubTrigger>
    </TextClassContext.Provider>
  );
});
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  MenubarPrimitive.SubContentRef,
  MenubarPrimitive.SubContentProps
>(({ className, ...props }, ref) => {
  const { open } = MenubarPrimitive.useSubContext();
  return (
    <MenubarPrimitive.SubContent
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
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  MenubarPrimitive.ContentRef,
  MenubarPrimitive.ContentProps & { portalHost?: string }
>(({ className, portalHost, ...props }, ref) => {
  const { value } = MenubarPrimitive.useRootContext();
  const { value: itemValue } = MenubarPrimitive.useMenuContext();
  return (
    <MenubarPrimitive.Portal hostName={portalHost}>
      <MenubarPrimitive.Content
        ref={ref}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 shadow-md shadow-foreground/5",
          value === itemValue
            ? "web:animate-in web:fade-in-0 web:zoom-in-95"
            : "web:animate-out web:fade-out-0 web:zoom-out-95",
          className,
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  );
});
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  MenubarPrimitive.ItemRef,
  MenubarPrimitive.ItemProps & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <TextClassContext.Provider value="select-none text-sm native:text-lg text-popover-foreground web:group-focus:text-accent-foreground">
    <MenubarPrimitive.Item
      ref={ref}
      className={cn(
        "web:cursor-default native:py-2 web:outline-none web:focus:bg-accent web:hover:bg-accent group relative flex flex-row items-center gap-2 rounded-sm px-2 py-1.5 active:bg-accent",
        inset && "pl-8",
        props.disabled && "web:pointer-events-none opacity-50",
        className,
      )}
      {...props}
    />
  </TextClassContext.Provider>
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  MenubarPrimitive.CheckboxItemRef,
  MenubarPrimitive.CheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
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
      <MenubarPrimitive.ItemIndicator>
        <Check size={14} strokeWidth={3} className="text-foreground" />
      </MenubarPrimitive.ItemIndicator>
    </View>
    {/* biome-ignore lint/complexity/noUselessFragments: <Fragment is necessary for unknown children> */}
    <>{children}</>
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  MenubarPrimitive.RadioItemRef,
  MenubarPrimitive.RadioItemProps
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "web:cursor-default web:group native:py-2 web:outline-none web:focus:bg-accent relative flex flex-row items-center rounded-sm py-1.5 pl-8 pr-2 active:bg-accent",
      props.disabled && "web:pointer-events-none opacity-50",
      className,
    )}
    {...props}
  >
    <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <View className="h-2 w-2 rounded-full bg-foreground" />
      </MenubarPrimitive.ItemIndicator>
    </View>
    {/* biome-ignore lint/complexity/noUselessFragments: <Fragment is necessary for unknown children> */}
    <>{children}</>
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  MenubarPrimitive.LabelRef,
  MenubarPrimitive.LabelProps & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "native:text-base web:cursor-default px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  MenubarPrimitive.SeparatorRef,
  MenubarPrimitive.SeparatorProps
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({ className, ...props }: TextProps) => {
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
MenubarShortcut.displayName = "MenubarShortcut";

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};
