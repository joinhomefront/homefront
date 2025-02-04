import type { ConfigContext, ExpoConfig } from "expo/config";

const backgroundColor = "#0C72BD";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Homefront",
  slug: "homefront",
  scheme: "homefront",
  version: "0.1.0",
  platforms: ["ios", "android"],
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor,
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "org.joinhomefront.ios",
    supportsTablet: true,
    icon: "./assets/icon.png",
  },
  android: {
    package: "org.joinhomefront.android",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor,
    },
  },
  // extra: {
  //   eas: {
  //     projectId: "your-eas-project-id",
  //   },
  // },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: ["expo-router", "expo-secure-store"],
});
