import type { MapRef } from "react-map-gl/maplibre";
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Map, { Layer, Source } from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";

import type { HexWithPopulation } from "./types";
import {
  cellToBoundingRect,
  getHexGeoJSON,
  primaryColor,
} from "../../location/utils";
import { CurrentLocationMarker } from "./CurrentLocationMarker";

export const LocationMap = ({
  lat,
  lng,
  recommendedHex,
}: {
  lat: number;
  lng: number;
  recommendedHex: HexWithPopulation;
}) => {
  const mapRef = useRef<MapRef | null>(null);

  const bounds = cellToBoundingRect(recommendedHex.hex);
  const viewport = {
    bounds,
    fitBoundsOptions: {
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
    },
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        duration: 1000,
      });
    }
  }, [bounds]);

  return (
    <Map
      ref={mapRef}
      initialViewState={viewport}
      style={{ width: "100%", height: "300px" }}
      attributionControl={false}
      mapStyle={`https://api.protomaps.com/styles/v4/grayscale/en.json?key=${process.env.NEXT_PUBLIC_PROTOMAPS_API_KEY}`}
      mapLib={maplibregl}
      scrollZoom={false}
      dragRotate={false}
      dragPan={false}
      touchZoomRotate={false}
      doubleClickZoom={false}
      keyboard={false}
    >
      <Source id="hex" type="geojson" data={getHexGeoJSON(recommendedHex)}>
        <Layer
          id="hex-fill-layer"
          type="fill"
          paint={{
            "fill-color": primaryColor,
            "fill-opacity": 0.3,
          }}
        />
        <Layer
          id="hex-line-layer"
          type="line"
          paint={{
            "line-color": primaryColor,
            "line-width": 2,
          }}
        />
      </Source>

      <Source
        id="protomaps"
        type="vector"
        tiles={[
          `https://api.protomaps.com/tiles/v4/{z}/{x}/{y}.mvt?key=${process.env.NEXT_PUBLIC_PROTOMAPS_API_KEY}`,
        ]}
        maxzoom={14}
      />

      <CurrentLocationMarker lat={lat} lng={lng} />
    </Map>
  );
};
