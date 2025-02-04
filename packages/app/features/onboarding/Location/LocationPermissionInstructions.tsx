import { Platform, View } from "react-native";
import * as Device from "expo-device";
import { AlertCircle } from "lucide-react-native";
import { Link } from "solito/link";

import { useDeviceInfo } from "@homefront/app/hooks/useDeviceInfo";
import { Text } from "@homefront/ui";

export const LocationPermissionInstructions = () => {
  const { deviceType, browser } = useDeviceInfo();

  const renderInstructions = () => {
    if (Platform.OS === "ios") {
      return (
        <>
          <Text className="mb-2 text-lg font-bold">
            How to enable location on iOS:
          </Text>
          <View className="gap-y-2">
            <Text>1. Open Settings</Text>
            <Text>2. Go to Privacy & Security</Text>
            <Text>3. Tap Location Services</Text>
            <Text>4. Find your browser and tap it</Text>
            <Text>5. Select "Allow"</Text>
          </View>
          <Link
            href="https://support.apple.com/en-us/102647"
            className="mt-4 text-primary hover:underline"
          >
            Learn more about iOS Location Services
          </Link>
        </>
      );
    }

    if (Platform.OS === "android") {
      return (
        <>
          <Text className="mb-2 text-lg font-bold">
            How to enable location on Android:
          </Text>
          <View className="gap-y-2">
            <Text>1. Open Settings</Text>
            <Text>2. Tap Location</Text>
            <Text>3. Go to App Permissions</Text>
            <Text>4. Find your browser</Text>
            <Text>5. Select "Allow"</Text>
          </View>
        </>
      );
    }

    if (deviceType === Device.DeviceType.DESKTOP && browser.isChrome) {
      return (
        <>
          <Text className="mb-2 text-lg font-bold">
            How to enable location in Chrome:
          </Text>
          <View className="gap-y-2">
            <Text>1. Click the lock icon in address bar</Text>
            <Text>2. Find "Location"</Text>
            <Text>3. Select "Allow"</Text>
          </View>
        </>
      );
    }

    if (
      (deviceType === Device.DeviceType.PHONE ||
        deviceType === Device.DeviceType.TABLET) &&
      browser.isChrome &&
      browser.isBrowserOniOS
    ) {
      return (
        <>
          <Text className="mb-2 text-lg font-bold">
            How to enable location in Chrome on iOS:
          </Text>
          <View className="gap-y-2">
            <Text>1. Open Settings</Text>
            <Text>2. Tap Privacy & Security</Text>
            <Text>3. Tap Location Services (ensure toggle is green)</Text>
            <Text>4. Find "Chrome"</Text>
            <Text>5. Select "While Using the App" or "Ask Next Time"</Text>
            <Text className="text-sm text-gray-700">
              These settings affect all websites, so "Ask Next Time" is the more
              privacy-conscious choice.
            </Text>
            <Text>6. Enable "Precise Location" for better accuracy</Text>
          </View>
        </>
      );
    }

    if (
      (deviceType === Device.DeviceType.PHONE ||
        deviceType === Device.DeviceType.TABLET) &&
      browser.isFirefox
    ) {
      return (
        <>
          <Text className="mb-2 text-lg font-bold">
            How to enable location in Firefox on iOS:
          </Text>
          <View className="gap-y-4">
            <View className="gap-y-2">
              <Text className="font-semibold">Step 1: Settings App</Text>
              <View className="gap-y-2 pl-4">
                <Text>1. Open Settings</Text>
                <Text>2. Tap Privacy & Security</Text>
                <Text>3. Tap Location Services (ensure toggle is green)</Text>
                <Text>4. Find "Firefox"</Text>
                <Text>5. Select "While Using the App" or "Ask Next Time"</Text>
                <Text className="text-sm text-gray-700">
                  These settings affect all websites, so "Ask Next Time" is the
                  more privacy-conscious choice.
                </Text>
                <Text>6. Enable "Precise Location" for better accuracy</Text>
              </View>
            </View>

            <View className="gap-y-2">
              <Text className="font-semibold">Step 2: Firefox Browser</Text>
              <View className="gap-y-2 pl-4">
                <Text>1. Tap Allow</Text>
                <Text>2. Tap Allow again when prompted</Text>
              </View>
            </View>

            <View className="flex-row gap-x-2 rounded-md border border-amber-600 bg-amber-50 p-3">
              <Text className="flex-1 text-amber-800">
                <AlertCircle size={24} />
              </Text>
              <Text className="text-sm text-amber-800">
                If you select "Don't Allow" when prompted, you'll need to return
                to Settings to re-enable location access
              </Text>
            </View>

            <Text className="text-sm text-gray-600">
              You may need to refresh the page after enabling location services
            </Text>
          </View>
        </>
      );
    }

    if (
      (deviceType === Device.DeviceType.PHONE ||
        deviceType === Device.DeviceType.TABLET) &&
      browser.isSafari
    ) {
      return (
        <>
          <Text className="mb-4 text-lg font-bold">
            How to enable location in Safari on iOS:
          </Text>

          <View className="mb-6 gap-y-4">
            <View className="gap-y-2">
              <Text className="font-semibold">Step 1: Settings App</Text>
              <View className="gap-y-2 pl-4">
                <Text>1. Open Settings</Text>
                <Text>2. Tap Privacy & Security</Text>
                <Text>3. Tap Location Services (ensure toggle is green)</Text>
                <Text>4. Find "Safari Websites"</Text>
                <Text>5. Select "While Using the App" or "Ask Next Time"</Text>
                <Text className="text-sm text-gray-700">
                  These settings affect all websites, so "Ask Next Time" is the
                  more privacy-conscious choice.
                </Text>
                <Text>6. Enable "Precise Location" for better accuracy</Text>
              </View>
            </View>

            <View className="gap-y-2">
              <Text className="font-semibold">Step 2: Safari Browser</Text>
              <View className="gap-y-2 pl-4">
                <Text>
                  1. Tap{" "}
                  <Text className="font-bold">
                    <Text className="text-xs font-bold">A</Text>A
                  </Text>{" "}
                  in address bar
                </Text>
                <Text>2. Select Website Settings</Text>
                <Text>3. Under Location, choose Allow</Text>
              </View>
            </View>

            <View className="flex-row gap-x-2 rounded-md border border-amber-600 bg-amber-50 p-3">
              <Text className="flex-1 text-amber-800">
                <AlertCircle size={24} />
              </Text>
              <Text className="text-sm text-amber-800">
                If you select "Never" when prompted, you'll need to return to
                Settings to re-enable location access
              </Text>
            </View>

            <Text className="text-sm text-gray-600">
              You may need to refresh the page after enabling location services
            </Text>
          </View>

          <Link href="https://support.apple.com/en-us/102647">
            <Text className="text-primary underline">
              View Apple's guide on location services for more
            </Text>
          </Link>
        </>
      );
    }

    if (deviceType === Device.DeviceType.DESKTOP && browser.isSafari) {
      return (
        <>
          <Text className="mb-2 text-lg font-bold">
            How to enable location in Safari:
          </Text>
          <View className="gap-y-2">
            <Text>1. Choose Safari &gt; Settings in the top menu</Text>
            <Text>2. Click Websites</Text>
            <Text>3. Find Location on the left and select it</Text>
            <Text>4. Find the website under Currently Open Websites</Text>
            <Text>5. Select Allow</Text>
          </View>
        </>
      );
    }

    if (browser.isFirefox) {
      return (
        <>
          <Text className="mb-2 text-lg font-bold">
            How to enable location in Firefox:
          </Text>
          <View className="gap-y-2">
            <Text>1. Click the map pin icon in the address bar</Text>
            <Text>
              2. Find and click the X button to clear the permission setting
            </Text>
            <Text>3. Click Retry and select Allow when prompted</Text>
            <Text className="text-sm text-gray-700">
              Check "Remember this decision" to prevent being prompted
              repeatedly to allow
            </Text>
          </View>
        </>
      );
    }
  };

  return (
    <View className="rounded-lg border border-gray-200 p-4">
      {renderInstructions()}
    </View>
  );
};
