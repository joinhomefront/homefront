import { Platform } from "react-native";
import Constants from "expo-constants";

/**
 * Sets the base URL for the API.
 * - In Expo development, it attempts to use the local machine's IP address.
 * - In web (Next.js), defaults to the current domain or localhost for development.
 */
export const getBaseUrl = () => {
  // Check if running in a web environment (Next.js)
  if (Platform.OS === "web") {
    // In web, use the current domain in production or localhost in development
    if (process.env.NODE_ENV === "production") {
      return process.env.NEXT_PUBLIC_BASE_URL; // Replace with your production URL
    }

    if (typeof window !== "undefined") {
      if (window.location.port !== "3000") {
        return window.location.origin;
      }
    }

    return "http://localhost:3000"; // Local API URL for development
  }

  // For native (Expo Go or Dev Client), attempt to use local machine's IP
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(":")[0];

  if (!localhost || localhost === "undefined") {
    throw new Error(
      "Failed to auto-detect localhost. Please manually specify the IP address for your development environment.",
    );
  }

  return `http://${localhost}:3000`; // Replace port if your API runs on a different port
};
