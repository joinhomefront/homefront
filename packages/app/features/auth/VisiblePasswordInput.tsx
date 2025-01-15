"use client";

import React, { useState } from "react";
import { Platform, Pressable } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

import type { FormInputProps, FormItemProps } from "@homefront/ui";
import { useSafeArea } from "@homefront/app/provider/safe-area/useSafeArea";
import {
  FormInput,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@homefront/ui";

type VisiblePasswordInputProps = FormItemProps<typeof FormInput, string> &
  FormInputProps & {
    ref?: React.ForwardedRef<React.ElementRef<typeof FormInput>>;
  };

const VisiblePasswordInput = React.forwardRef<
  React.ElementRef<typeof FormInput>,
  VisiblePasswordInputProps
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const insets = useSafeArea();

  return (
    <FormInput
      ref={ref}
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={!showPassword}
      spellCheck={false}
      inputIcon={
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Pressable
              className="-m-2 p-2 text-gray-400 hover:text-gray-800"
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </Pressable>
          </TooltipTrigger>
          <TooltipContent
            side={Platform.OS === "web" ? "right" : "top"}
            insets={insets}
          >
            <Text>{showPassword ? "Hide" : "Show"} password</Text>
          </TooltipContent>
        </Tooltip>
      }
      {...props}
    />
  );
});

VisiblePasswordInput.displayName = "VisiblePasswordInput";

export { VisiblePasswordInput };
