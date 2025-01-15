import React from "react";
import { View } from "react-native";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <View id="layout" className="flex h-screen flex-col">
      {children}
    </View>
  );
};
