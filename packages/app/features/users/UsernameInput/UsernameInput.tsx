"use client";

import type { ControllerRenderProps } from "react-hook-form";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { CircleCheck, CircleX } from "lucide-react-native";

import { ActivityIndicator, FormInput } from "@homefront/ui";

import { useCheckUsernameAvailability } from "./hooks";

interface UsernameInputProps {
  field: ControllerRenderProps<
    {
      username: string;
      password: string;
      confirmPassword: string;
    },
    "username"
  >;
  invalid?: boolean;
  onAvailableChange?: (isAvailable: boolean | null) => void;
}

export const UsernameInput = ({
  field,
  invalid,
  onAvailableChange,
}: UsernameInputProps) => {
  const [username, setUsername] = useState<string>("");
  const { isAvailable, isChecking } = useCheckUsernameAvailability(username);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    if (isAvailable !== usernameAvailable) {
      setUsernameAvailable(isAvailable);
      onAvailableChange?.(isAvailable);
    }
  }, [isAvailable, onAvailableChange, usernameAvailable]);

  return (
    <View className="relative">
      <FormInput
        {...field}
        label="Username"
        autoCapitalize="none"
        onChangeText={(text: string) => {
          setUsername(text);
          field.onChange(text);
        }}
        inputClassName="pr-10"
        inputIcon={
          isChecking ? (
            <ActivityIndicator size="small" />
          ) : username ? (
            invalid ? (
              <CircleX className="text-destructive" />
            ) : (
              <CircleCheck className="text-primary" />
            )
          ) : null
        }
      />
    </View>
  );
};
