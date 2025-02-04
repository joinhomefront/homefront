import type { ReactNode } from "react";
import { Platform, View } from "react-native";

import { cn } from "../lib/utils";

export const FormWrapper: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return Platform.OS === "web" ? (
    <form className={cn(className)}>{children}</form>
  ) : (
    <View className={cn(className)}>{children}</View>
  );
};
