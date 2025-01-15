import type { LocationPermissionResponse } from "expo-location";
import type { ReactNode } from "react";
import { useState } from "react";
import { Platform, View } from "react-native";
import { PermissionStatus } from "expo-location";
import { AlertCircle, MapPinned } from "lucide-react-native";

import { ActivityIndicator, Button, H3, Text } from "@homefront/ui";

import type { LocationError, LocationResult } from "./hooks";
import { OnboardingStep } from "../data";
import { Header } from "../Header";
import { LocationPermissionInstructions } from "./LocationPermissionInstructions";

interface LocationPermissionProps {
  error: LocationError | null;
  explanation: string;
  status: PermissionStatus;
  onRequestPermissions: () => Promise<LocationResult>;
  children?: ReactNode;
}

export interface LocationPermissionResponseWithError
  extends LocationPermissionResponse {
  locationError?: LocationError | null;
}

export const LocationPermission = ({
  error,
  explanation,
  status,
  onRequestPermissions,
  children,
}: LocationPermissionProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const errorMessage = error?.message;

  const handleRequestPermissions = async () => {
    setIsLoading(true);
    try {
      await onRequestPermissions();
    } catch (error) {
      console.error("Permission request failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const reload = () => {
    if (Platform.OS === "web") {
      window.location.reload();
    }
  };

  if (status === PermissionStatus.GRANTED) {
    return null;
  }

  if (status === PermissionStatus.DENIED) {
    return (
      <View className="space-y-4 p-4">
        <H3 className="font-bold">Location access denied</H3>
        <View className="flex-row space-x-2 rounded-md border border-amber-600 bg-amber-50 p-3">
          <Text className="flex-1 text-amber-800">
            <AlertCircle size={24} />
          </Text>
          <Text className="text-sm text-amber-800">
            Your location was denied. To enable location access, you'll need to
            change your settings.
          </Text>
        </View>
        <Text className="text-sm text-gray-700">{explanation}</Text>
        <LocationPermissionInstructions />
        {children}
        <View className="space-y-2">
          <Button onPress={handleRequestPermissions} disabled={isLoading}>
            <Text>Retry</Text>
          </Button>
          <Button variant="outline" onPress={reload}>
            <Text>Reload</Text>
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View className="max-w-screen-sm flex-1 p-4">
      <Header
        currentStep={OnboardingStep.Location}
        icon={MapPinned}
        title="Your location"
      >
        <Text className="max-w-prose text-center text-gray-700">
          {explanation}
        </Text>
      </Header>
      <View className="flex-1 items-center justify-center space-y-4">
        {errorMessage && (
          <Text className="text-center text-destructive">{errorMessage}</Text>
        )}
        <View className="py-4">
          <Button onPress={handleRequestPermissions} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Allow</Text>
            )}
          </Button>
        </View>
      </View>
    </View>
  );
};
