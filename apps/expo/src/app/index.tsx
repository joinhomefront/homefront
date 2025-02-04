import { Stack } from "expo-router";

import { SignInScreen } from "@homefront/app/features/auth/SignInScreen";
import { SplashScreen } from "@homefront/app/features/splash/SplashScreen";

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Home Page",
          headerShown: false,
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "white",
        }}
      />

      {/* <SplashScreen /> */}
      <SignInScreen />
    </>
  );
}
