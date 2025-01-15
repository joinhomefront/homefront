"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { cellArea, UNITS } from "h3-js";

import type {
  Hex,
  HexWithPopulation,
  LatLng,
} from "@homefront/app/features/location/types";
import { generateHexes } from "@homefront/app/features/location/utils";
import { api } from "@homefront/app/utils/trpc";

export function useRecommendHex(activeLocation: LatLng | null) {
  const [generatedHexes, setGeneratedHexes] = useState<Hex[]>([]);
  const [hexes, setHexes] = useState<HexWithPopulation[]>([]);
  const [recommendedHex, setRecommendedHex] = useState<HexWithPopulation>();
  const [error, setError] = useState<string | null>(null);

  const populationsFromHex = api.mapping.populationsFromHex.useMutation({
    onSuccess: (populationData) => {
      const hexWithPopulation = generatedHexes.map((h) => ({
        ...h,
        population:
          populationData.find((p) => p.hex === h.hex)?.population ?? 0,
      }));

      const recommended =
        hexWithPopulation
          .sort((a, b) => b.resolution - a.resolution)
          .find((h) => h.population >= 1000) ?? hexWithPopulation[0];

      setHexes(hexWithPopulation);
      setRecommendedHex(recommended);
    },
    onError: (err) => {
      setError(err.message || "An error occurred");
    },
  });

  const calculateHexesMutation = useMutation({
    mutationFn: async (location: LatLng) => {
      const generatedHexes = generateHexes(location.lat, location.lng);

      const res4Hex = generatedHexes.find((h) => h.resolution === 4)?.hex;
      if (!res4Hex) throw new Error("Failed to calculate resolution 4 hex.");

      setGeneratedHexes(generatedHexes);
      return Promise.resolve(res4Hex);
    },
    onSuccess: async (res4Hex) => {
      await populationsFromHex.mutateAsync({
        hex: res4Hex,
      });
    },
    onError: (err: Error) => {
      setError(err.message || "An error occurred");
    },
  });

  const calculateHexes = useCallback(
    (location: LatLng) => {
      calculateHexesMutation.mutate(location);
    },
    [calculateHexesMutation],
  );

  const squareKm = recommendedHex
    ? cellArea(recommendedHex.hex, UNITS.km2).toFixed(1).toString()
    : "";

  const prevLocationRef = useRef<LatLng | null>(null);

  useEffect(() => {
    if (activeLocation) {
      const prevLocation = prevLocationRef.current;

      if (
        !prevLocation ||
        activeLocation.lat !== prevLocation.lat ||
        activeLocation.lng !== prevLocation.lng
      ) {
        prevLocationRef.current = activeLocation;
        calculateHexes(activeLocation);
      }
    }
  }, [activeLocation, calculateHexes]);

  return {
    hexes,
    recommendedHex,
    error,
    isLoading: calculateHexesMutation.isPending || populationsFromHex.isPending,
    squareKm,
  };
}
