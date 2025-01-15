"use client";

import * as React from "react";
import * as LabelPrimitive from "@rn-primitives/label";

import { cn } from "@homefront/ui";

const Label = React.forwardRef<
  LabelPrimitive.TextRef,
  LabelPrimitive.TextProps
>(
  (
    { className, onPress, onLongPress, onPressIn, onPressOut, ...props },
    ref,
  ) => (
    <LabelPrimitive.Root
      className="web:cursor-default flex-1"
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <LabelPrimitive.Text
        ref={ref}
        className={cn(
          "native:text-base web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70 font-sans text-sm font-medium leading-none text-foreground",
          className,
        )}
        {...props}
      />
    </LabelPrimitive.Root>
  ),
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
