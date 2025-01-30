import "@bacons/text-decoder/install";

import { StrictMode } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

import { Provider } from "@homefront/app/provider";
import colors from "@homefront/ui/colors";

import "../globals.css";

export default function Layout() {
  const { colorScheme } = useColorScheme();
  return (
    <StrictMode>
      <NavigationContainer>
        <Provider>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.primary[500],
              },
              contentStyle: {
                backgroundColor: colorScheme === "dark" ? "#09090B" : "#FFFFFF",
              },
            }}
          />
          <StatusBar />
        </Provider>
      </NavigationContainer>
    </StrictMode>
  );
}
