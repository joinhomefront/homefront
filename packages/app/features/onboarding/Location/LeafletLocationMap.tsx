"use client";

import type { CoordPair } from "h3-js";
import { useEffect, useState } from "react";
import { cellToBoundary } from "h3-js";
import {
  CircleMarker,
  MapContainer,
  Polygon,
  TileLayer,
  useMap,
} from "react-leaflet";

import colors from "@homefront/ui/colors";

import type { HexWithPopulation } from "./types";

import "leaflet/dist/leaflet.css";

interface FitBoundsProps {
  selectedHex: HexWithPopulation | undefined;
}

const FitBounds = ({ selectedHex }: FitBoundsProps) => {
  const map = useMap();
  const [currentHex, setCurrentHex] = useState<HexWithPopulation | undefined>();

  useEffect(() => {
    if (selectedHex) {
      setCurrentHex(selectedHex);
    }
  }, [selectedHex]);

  useEffect(() => {
    if (currentHex) {
      const boundary = cellToBoundary(currentHex.hex).map(
        ([lat, lng]) => [lat, lng] as [number, number],
      );
      map.fitBounds(boundary, {
        padding: [20, 20],
      });
    }
  }, [currentHex, map]);

  return null;
};

interface MapProps {
  lat: number;
  lng: number;
  recommendedHex: HexWithPopulation | undefined;
}

const Hexagon = ({ hex }: { hex: HexWithPopulation }) => {
  let coordinates: CoordPair[] = [];
  try {
    const boundary: CoordPair[] = cellToBoundary(hex.hex);
    if (Array.isArray(boundary)) {
      coordinates = boundary.map(([lat, lng]) => [lat, lng]);
    }
  } catch (error) {
    console.error(`Error converting hex to boundary: ${String(error)}`);
  }

  return (
    <Polygon
      key={hex.hex}
      positions={coordinates}
      pathOptions={{
        color: colors.green[600],
        weight: 1,
        fillOpacity: 0.5,
      }}
    />
  );
};

const LocationMap = ({ lat, lng, recommendedHex }: MapProps) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        crossOrigin
        tileSize={512}
      />
      <FitBounds selectedHex={recommendedHex} />
      <CircleMarker
        center={[lat, lng]}
        pathOptions={{ color: "blue" }}
        fillColor="blue"
        fill
        fillOpacity={1.0}
        radius={5}
      />
      {recommendedHex && <Hexagon hex={recommendedHex} />}
    </MapContainer>
  );
};

export default LocationMap;
