"use client";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Layout } from "@homefront/app/components/Layout";

import { AuthProvider } from "./auth";
import { SafeAreaProvider } from "./safe-area";
import { SessionProvider } from "./session";
import { StylesProvider } from "./styles-provider";
import { TRPCProvider } from "./trpc";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <StylesProvider>
      <AuthProvider>
        <TRPCProvider>
          <SessionProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SafeAreaProvider>
                <Layout>{children}</Layout>
              </SafeAreaProvider>
            </GestureHandlerRootView>
          </SessionProvider>
        </TRPCProvider>
      </AuthProvider>
    </StylesProvider>
  );
}
