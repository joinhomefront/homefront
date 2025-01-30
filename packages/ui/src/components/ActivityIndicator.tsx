import type { ActivityIndicatorProps } from "react-native";
import { ActivityIndicator as RNActivityIndicator } from "react-native";

export const ActivityIndicator = (props: ActivityIndicatorProps) => {
  return (
    <RNActivityIndicator
      className="h-fit w-fit text-primary"
      size="small"
      {...props}
    />
  );
};
