import { useCallback, useState } from "react";
import {
  getCurrentPositionAsync,
  LocationAccuracy,
  PermissionStatus,
  requestForegroundPermissionsAsync,
} from "expo-location";
import type { LatLng } from "./types";

export interface LocationError {
  code: 'PERMISSION_DENIED' | 'POSITION_UNAVAILABLE' | 'TIMEOUT' | 'UNKNOWN';
  message: string;
};

export interface LocationResult {
  coords: LatLng | null;
  error: LocationError | null;
}

const getLocationError = (error: GeolocationPositionError): LocationError => {

  switch (error.code) {
    case GeolocationPositionError.PERMISSION_DENIED:
      return { code: 'PERMISSION_DENIED', message: 'Location permission denied' };
    case GeolocationPositionError.POSITION_UNAVAILABLE:
      return { code: 'POSITION_UNAVAILABLE', message: 'Location unavailable' };
    case GeolocationPositionError.TIMEOUT:
      return { code: 'TIMEOUT', message: 'Location request timed out' };
    default:
      return { code: 'UNKNOWN', message: 'Unknown error occurred' };
  }
}
  

export interface LocationPermissionStatus {
  status: PermissionStatus;
  canAccessLocation: boolean;
}

export const useUserLocation = () => {
  const [error, setError] = useState<LocationError | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>(
    PermissionStatus.UNDETERMINED
  );
  const [coordinates, setCoordinates] = useState<LatLng | null>(null);

  const requestPermissions = useCallback(async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync();
      
      if (status === PermissionStatus.GRANTED) {
        const result = await getCurrentPositionAsync({
          accuracy: LocationAccuracy.High
        });
        
        const coords = {
          lat: result.coords.latitude,
          lng: result.coords.longitude
        };
        setCoordinates(coords);
        setPermissionStatus(PermissionStatus.GRANTED);
        setError(null);
        return { coords, error: null };
      }
      
      const permissionError = {
        code: 'PERMISSION_DENIED' as const,
        message: 'Location permission denied'
      };
      setPermissionStatus(PermissionStatus.DENIED);
      setError(permissionError);
      return { coords: null, error: permissionError };
      
    } catch (err) {
      const locationError = err instanceof GeolocationPositionError
        ? getLocationError(err)
        : { code: 'UNKNOWN' as const, message: 'Unknown error occurred' };
      
        setPermissionStatus(PermissionStatus.DENIED);
      setError(locationError);
      return { coords: null, error: locationError };
    }
  }, []);

  return {
    coordinates,
    error,
    permissionStatus,
    requestPermissions,
    isGranted: permissionStatus === PermissionStatus.GRANTED
  };
};