"use client";

import { View } from "react-native";

import { SplashHeader } from "@homefront/app/components/SplashHeader";

import { Footer } from "./Footer.web";

export function SplashLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <View className="fixed left-0 right-0 top-0 z-10">
        <SplashHeader />
      </View>

      <View className="grid pt-[57px]">
        <div className="mx-auto block w-full max-w-screen-xl flex-1 overflow-y-auto">
          {children}
        </div>
        <Footer />
      </View>
    </>
  );
}
