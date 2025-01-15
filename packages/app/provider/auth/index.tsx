// index.tsx
import { View } from "react-native";

import { useAuthStore } from "@homefront/app/utils/auth";
import { ActivityIndicator, Text } from "@homefront/ui";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isSigningOut = useAuthStore((state) => state.isSigningOut);
  return (
    <>
      {children}
      {isSigningOut && (
        <View
          className="absolute inset-0 z-50 flex-1 items-center justify-center space-y-4 bg-black/50"
          style={{ elevation: 999 }}
        >
          <Text className="text-white">Signing out...</Text>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </>
  );
};
