import { SafeAreaProvider as RNSafeAreaProvider } from "react-native-safe-area-context";

export const SafeAreaProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <RNSafeAreaProvider>{children}</RNSafeAreaProvider>;
};
