"use client";

import type { z } from "zod";
import { SafeAreaView, ScrollView, View } from "react-native";
import { MapPinned, RotateCcw } from "lucide-react-native";

import { useLocationForm } from "@homefront/app/features/location/hooks/useLocationForm";
import { useUserLocationManager } from "@homefront/app/features/location/hooks/useUserLocationManager";
import { ActivityIndicator, Button, Text } from "@homefront/ui";

import { useRecommendHex } from "../location/hooks/useRecommendHex";
import { BottomNavigation } from "./BottomNavigation";
import { OnboardingStep } from "./data";
import { Header } from "./Header";
import { ChangeLatLng } from "./Location/ChangeLatLng";
import { useUserLocation } from "./Location/hooks";
import { LocationMap } from "./Location/LocationMap";
import { LocationPermission } from "./Location/LocationPermission";
import { OnboardingHeader } from "./OnboardingHeader";

const CURRENT_STEP = OnboardingStep.Location;

export function Location() {
  const {
    coordinates: deviceLocation,
    error: locationError,
    permissionStatus,
    isGranted,
    requestPermissions,
  } = useUserLocation();

  const {
    userLocation,
    setUserLocation,
    activeLocation,
    canResetLocation,
    resetLocation,
  } = useUserLocationManager(deviceLocation);

  const { hexes, recommendedHex, error, isLoading, squareKm } =
    useRecommendHex(activeLocation);

  const {
    form,
    isValid,
    handleSaveLocation,
    selectedHex,
    formSchema: _formSchema,
  } = useLocationForm(hexes, recommendedHex);

  const location = userLocation ?? deviceLocation;
  const canDisplayMap =
    !isLoading && !error && !!location && !!selectedHex && !!activeLocation;

  return (
    <SafeAreaView className="w-full flex-1" style={{ flex: 1 }}>
      <ScrollView
        className="w-full flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <OnboardingHeader />
        <View className="mx-auto h-auto w-full max-w-screen-sm flex-1">
          {isGranted ? (
            <>
              <View className="flex-1">
                <View className="px-4 sm:px-0">
                  <Header
                    currentStep={CURRENT_STEP}
                    icon={MapPinned}
                    title="Your location"
                  >
                    <Text className="text-base">
                      Get connected to your community and learn what's happening
                      near you.
                    </Text>
                  </Header>
                </View>

                <View className="space-y-2 py-4">
                  {isLoading && (
                    <>
                      <View className="h-8" />
                      <View className="relative mx-auto h-auto w-full max-w-screen-sm overflow-hidden rounded-none bg-gray-50 sm:rounded-md">
                        <View className="h-[300px] items-center justify-center sm:h-[400px]">
                          <ActivityIndicator />
                        </View>
                      </View>
                    </>
                  )}
                  {canDisplayMap && (
                    <>
                      <View className="flex flex-row items-center justify-end space-x-1 px-4 sm:px-0">
                        {canResetLocation && (
                          <View className="flex flex-row items-center justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="xs"
                              className="flex-row items-center space-x-2 text-sm"
                              onPress={resetLocation}
                            >
                              <Text className="text-primary">
                                <RotateCcw size={16} />
                              </Text>
                              <Text>Reset</Text>
                            </Button>
                          </View>
                        )}
                        <ChangeLatLng
                          lat={location.lat}
                          lng={location.lng}
                          onChanged={(lat, lng) => {
                            setUserLocation({ lat, lng });
                          }}
                        />
                      </View>
                      <View className="relative mx-auto h-auto w-full max-w-screen-sm overflow-hidden rounded-none bg-gray-50 sm:rounded-md">
                        <LocationMap
                          lat={location.lat}
                          lng={location.lng}
                          recommendedHex={selectedHex}
                        />
                      </View>
                      <View className="space-y-4 px-4 sm:px-0">
                        <Text className="text-sm">
                          Your location will be approximated to the hex shown
                          above. There are an estimated{" "}
                          <Text className="text-sm font-bold">
                            {selectedHex.population.toLocaleString()}
                          </Text>{" "}
                          people in this{" "}
                          <Text className="text-sm font-bold">
                            &#8776; {squareKm} km&sup2;
                          </Text>{" "}
                          area, which should give you a good balance of security
                          and useful location data.
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              </View>
            </>
          ) : (
            <View className="flex-1">
              <LocationPermission
                status={permissionStatus}
                error={locationError}
                explanation="Your location is used to connect you to people nearby. Your exact location is never shared. We approximate your stored location to increase your privacy and security."
                onRequestPermissions={requestPermissions}
              />
            </View>
          )}
        </View>
        <BottomNavigation<z.infer<typeof _formSchema>>
          currentStep={CURRENT_STEP}
          form={form}
          continueDisabled={!isValid}
          onContinue={handleSaveLocation}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
