"use client";

import type { ViewProps } from "react-native";
import { View } from "react-native";

import type { SanitizedUser } from "@homefront/db";
import { Header } from "@homefront/app/components/Header";
import Sidebar from "@homefront/app/components/Sidebar.web";

export const AppLayoutInner: React.FC<{ user?: SanitizedUser } & ViewProps> = ({
  user,
  children,
}) => (
  <>
    <View className="fixed left-0 right-0 top-0 z-10">
      <Header user={user} />
    </View>

    <View className="grid pt-[57px] lg:grid-cols-[256px]">
      <div className="isolate z-50 order-first block w-64">
        <Sidebar className="h-screen-without-header w-64 bg-white" />
      </div>
      <div className="order-2 block w-full max-w-screen-xl flex-1 overflow-y-auto lg:col-start-2">
        {children}
      </div>
    </View>
  </>
);
