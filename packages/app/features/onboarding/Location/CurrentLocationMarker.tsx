import { View } from "react-native";
import { Marker } from "react-map-gl";

interface CurrentLocationMarkerProps {
  lat: number;
  lng: number;
}

export const CurrentLocationMarker = ({
  lat,
  lng,
}: CurrentLocationMarkerProps) => (
  <Marker latitude={lat} longitude={lng}>
    <View className="relative h-5 w-5 items-center justify-center">
      <View className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
      <View className="absolute inline-flex h-4 w-4 rounded-full bg-white" />
      <View className="relative inline-flex h-3 w-3 rounded-full bg-blue-500" />
    </View>
  </Marker>
);
