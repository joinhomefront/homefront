import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { verifyInstallation } from "nativewind";

import { SplashScreen } from "@homefront/app/features/splash/SplashScreen";
import { Text } from "@homefront/ui";

export default function Index() {
  verifyInstallation();
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: "Home Page",
        }}
      />

      <View className="flex-column flex-1 items-center justify-center px-4">
        <Text className="w-full flex-1 text-center text-5xl font-bold text-foreground">
          Create <Text className="text-primary">T3</Text> Turbo
        </Text>

        {/* Debug component to verify styles */}
        <View className="mt-4 h-20 w-20 bg-red-700" />
        <SplashScreen />
      </View>
    </SafeAreaView>
  );
}
