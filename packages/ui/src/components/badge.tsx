import type { SlottableViewProps } from "@rn-primitives/types";
import type { VariantProps } from "class-variance-authority";
import { View } from "react-native";
import * as Slot from "@rn-primitives/slot";
import { cva } from "class-variance-authority";

import { cn } from "@homefront/ui";

import { TextClassContext } from "./text";

const badgeVariants = cva(
  "web:inline-flex web:transition-colors web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2 items-center rounded-md border border-border px-2.5 py-0.5",
  {
    variants: {
      variant: {
        default:
          "web:hover:opacity-80 border-transparent bg-primary active:opacity-80",
        secondary:
          "web:hover:opacity-80 border-transparent bg-secondary active:opacity-80",
        destructive:
          "web:hover:opacity-80 border-transparent bg-destructive active:opacity-80",
        neutral: "border-gray-400 bg-gray-50 ring-gray-500/10",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const badgeTextVariants = cva("text-xs font-semibold", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive-foreground",
      neutral: "text-gray-500",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BadgeProps = SlottableViewProps & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, asChild, ...props }: BadgeProps) {
  const Component = asChild ? Slot.View : View;
  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant })}>
      <Component
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Badge, badgeTextVariants, badgeVariants };
export type { BadgeProps };
