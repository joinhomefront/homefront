import type { VariantProps } from "class-variance-authority";
import type { LucideIcon, LucideProps } from "lucide-react-native";
import * as React from "react";
import { Pressable } from "react-native";
import { cva } from "class-variance-authority";

import { iconWithClassName } from "../lib/icons/iconWithClassName";
import { cn } from "../lib/utils";
import { Text, TextClassContext } from "./text";

const buttonVariants = cva(
  "web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 group flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        // Solid variants
        default: "bg-primary hover:opacity-90 active:opacity-80",
        destructive: "bg-destructive hover:opacity-90 active:opacity-80",
        success: "bg-emerald-600 hover:opacity-90 active:opacity-80",
        warning: "bg-amber-500 hover:opacity-90 active:opacity-80",
        secondary: "web:hover:opacity-80 bg-secondary active:opacity-80",

        // Outline variants
        "outline-neutral":
          "web:hover:border-border web:hover:bg-primary-100 border border-gray-300 bg-background active:bg-gray-200",
        "outline-primary":
          "web:hover:bg-primary-100 border border-primary bg-background active:bg-primary-200",
        "outline-destructive":
          "web:hover:bg-destructive-100 border border-destructive bg-background active:bg-destructive-200",
        "outline-success":
          "web:hover:bg-emerald-100 border border-emerald-600 bg-background active:bg-emerald-200",
        "outline-neutral-primary":
          "web:hover:border-border web:hover:bg-accent border border-gray-300 bg-background active:bg-accent",
        "outline-neutral-destructive":
          "web:hover:border-destructive web:hover:bg-destructive-100 border border-gray-300 bg-background active:bg-destructive-200",
        "outline-neutral-success":
          "web:hover:border-emerald-600 web:hover:bg-emerald-100 border border-gray-300 bg-background active:bg-emerald-200",
        outline:
          "web:hover:bg-accent web:hover:text-accent-foreground border border-border bg-background active:bg-accent",
        ghost:
          "web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        link: "web:underline-offset-4 web:hover:underline web:focus:underline decoration-primary",
        tab: "rounded-none border-b-4 border-transparent hover:border-primary/50 data-[state=active]:border-primary",
      },
      size: {
        default: "native:h-12 native:px-5 native:py-3 h-10 px-4 py-2",
        xs: "h-8 rounded-md px-2",
        sm: "h-9 rounded-md px-3",
        lg: "native:h-14 h-11 rounded-md px-8",
        icon: "h-10 w-10",
        inline: "inline-flex h-auto px-0 py-0",
      },
      hasIcon: {
        false: "",
        true: "flex flex-row items-center gap-x-2",
      },
      active: {
        false: "",
        true: "",
      },
    },
    compoundVariants: [
      {
        variant: "tab",
        active: true,
        className: "border-primary",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      hasIcon: false,
    },
  },
);

const buttonTextVariants = cva(
  "web:whitespace-nowrap native:text-base font-sans text-base text-foreground sm:transition-colors",
  {
    variants: {
      variant: {
        // Solid variants
        default: "text-primary-foreground",
        destructive: "text-destructive-foreground",
        success: "text-white",
        warning: "text-white",

        // Outline variants
        "outline-neutral": "text-gray-500 group-hover:text-primary",
        "outline-primary": "text-primary group-hover:text-primary",
        "outline-destructive": "text-destructive group-hover:text-destructive",
        "outline-success": "text-emerald-600 group-hover:text-emerald-600",
        "outline-neutral-primary": "text-gray-500 group-hover:text-primary",
        "outline-neutral-destructive":
          "text-gray-500 group-hover:text-destructive",
        "outline-neutral-success": "text-gray-500 group-hover:text-emerald-600",
        outline: "text-primary group-active:text-accent-foreground",

        secondary:
          "text-secondary-foreground group-active:text-secondary-foreground",
        ghost: "group-active:text-accent-foreground",
        link: "text-primary group-active:text-primary-background group-active:underline",
        tab: "text-foreground data-[state=active]:text-primary",
      },
      size: {
        default: "",
        xs: "native:text-sm text-sm",
        sm: "native:text-sm text-sm",
        lg: "native:text-lg",
        icon: "",
        inline: "",
      },
      hasIcon: {
        false: "",
        true: "",
      },
      active: {
        false: "",
        true: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hasIcon: false,
      active: false,
    },
  },
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants> & { active?: boolean };

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, hasIcon, active, ...props }, ref) => {
  return (
    <TextClassContext.Provider
      value={buttonTextVariants({
        variant,
        size,
        hasIcon,
        active,
        className: "web:pointer-events-none",
      })}
    >
      <Pressable
        className={cn(
          props.disabled && "web:pointer-events-none opacity-50",
          buttonVariants({ variant, size, hasIcon, active, className }),
        )}
        ref={ref}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  );
});
Button.displayName = "Button";

const ButtonIcon = ({
  icon,
  size = 16,
  ...props
}: { icon: LucideIcon } & LucideProps) => {
  const Icon = iconWithClassName(icon);
  return (
    <Text>
      <Icon size={size} {...props} />
    </Text>
  );
};

const ButtonInnerIcon = ({
  icon,
  size = 16,
  className,
  ...props
}: LucideProps & {
  icon: LucideIcon;
}) => {
  const Icon = iconWithClassName(icon);
  const textClass = React.useContext(TextClassContext);

  return <Icon size={size} {...props} className={cn(textClass, className)} />;
};

// ...existing code...
export {
  Button,
  ButtonIcon,
  buttonTextVariants,
  buttonVariants,
  ButtonInnerIcon,
};
export type { ButtonProps };
