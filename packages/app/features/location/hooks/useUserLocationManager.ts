import { useState, useMemo } from "react";
import { isSameLocation } from "@homefront/app/features/location/utils";
import type { LatLng } from "../types";

export function useUserLocationManager(deviceLocation: LatLng | null) {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  const activeLocation = userLocation ?? deviceLocation;

  const canResetLocation = useMemo(
    () => userLocation && !isSameLocation(userLocation, deviceLocation),
    [userLocation, deviceLocation]
  );

  const resetLocation = () => setUserLocation(null);

  return {
    userLocation,
    activeLocation,
    canResetLocation,
    setUserLocation,
    resetLocation,
  };
}
