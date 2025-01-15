import type { ActivityIndicatorProps } from "react-native";
import { ActivityIndicator as RNActivityIndicator } from "react-native";

import colors from "@homefront/ui/colors";

export const ActivityIndicator = (props: ActivityIndicatorProps) => {
  return (
    <RNActivityIndicator
      className="h-fit w-fit"
      size="small"
      color={colors.primary[600]}
      {...props}
    />
  );
};
