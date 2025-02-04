import "@bacons/text-decoder/install";

import { StrictMode, useEffect, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

import { Provider } from "@homefront/app/provider";
import colors from "@homefront/ui/colors";

import { loadFonts } from "~/utils/loadFonts";

import "../globals.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const { colorScheme } = useColorScheme();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load fonts and hide the splash screen when ready.
  useEffect(() => {
    async function prepare() {
      try {
        const success = await loadFonts();
        setFontsLoaded(success);
      } catch (e) {
        console.error("Font loading error:", e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  // Wait for fonts to load before rendering the app.
  if (!fontsLoaded) {
    return null;
  }

  return (
    <StrictMode>
      <NavigationContainer>
        <Provider>
          <Stack
            screenOptions={{
              header: () => null,
              contentStyle: {
                backgroundColor:
                  colorScheme === "dark" ? colors.gray[950] : "white",
              },
            }}
          />
          <StatusBar translucent backgroundColor="transparent" />
        </Provider>
      </NavigationContainer>
    </StrictMode>
  );
}
