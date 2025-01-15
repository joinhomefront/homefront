import type { LngLatBoundsLike } from "maplibre-gl";
import * as Location from "expo-location";
import { cellToBoundary, latLngToCell } from "h3-js";

import type { Hex, HexWithPopulation, LatLng } from "./types";

export const cellToBoundingRect = (h3Hex: string): LngLatBoundsLike => {
  const boundary = cellToBoundary(h3Hex);

  if (boundary.length === 0 || !boundary[0]) {
    throw new Error("Invalid H3 hex: no boundary coordinates");
  }

  let [minLat, minLng] = boundary[0];
  let [maxLat, maxLng] = boundary[0];

  for (let i = 1; i < boundary.length; i++) {
    const coord = boundary[i];
    if (coord) {
      const [lat, lng] = coord;
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
    }
  }

  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
};

export const getHexGeoJSON = (hex?: HexWithPopulation) => {
  const boundary = hex ? cellToBoundary(hex.hex, true) : null;
  const coordinates = boundary ? [...boundary, boundary[0]] : [];

  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [coordinates],
    },
  };
};

export const primaryColor = "hsl(205 88% 39%)";

export const getUserLocation = async (): Promise<{
  lat: number;
  lng: number;
}> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== Location.PermissionStatus.GRANTED) {
    throw new Error("Permission to access location was denied.");
  }

  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  return { lat: latitude, lng: longitude };
};

export const isSameLocation = (
  a: LatLng | null | undefined,
  b: LatLng | null | undefined,
): boolean => {
  if (!a || !b) return false;
  return a.lat === b.lat && a.lng === b.lng;
};

export const generateHexes = (lat: number, lng: number): Hex[] => {
  return Array.from({ length: 5 }, (_, i) => {
    const resolution = 4 + i;
    return {
      resolution,
      hex: latLngToCell(lat, lng, resolution),
    };
  });
};
