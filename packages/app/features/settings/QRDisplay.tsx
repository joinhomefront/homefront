import { useState } from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { useUser } from "@homefront/app/utils/auth";
import { Button, Text } from "@homefront/ui";

interface QRDisplayProps {
  secret: string;
  onNext: () => void;
  onCancel: () => void;
}

export function QRDisplay({ secret, onNext, onCancel }: QRDisplayProps) {
  const { user } = useUser();
  const [isManual, setIsManual] = useState(false);
  const otpAuthUrl = `otpauth://totp/${user?.username}?secret=${secret}&issuer=Homefront`;

  return (
    <View className="gap-y-4">
      <Text className="text-xl font-bold">
        Set up two-factor authentication
      </Text>

      {isManual ? (
        <>
          <Text className="text-sm">
            Manually enter this information into your two-factor authentication
            device.
          </Text>
          <View className="flex-row">
            <Button
              key="otp-qr"
              size="inline"
              variant="link"
              onPress={() => setIsManual(false)}
            >
              <Text className="text-sm">Scan QR code instead</Text>
            </Button>
            <Text className="text-sm">.</Text>
          </View>
          <View className="gap-y-2">
            <Text className="text-sm font-bold">
              Key:{" "}
              <Text className="font-mono text-sm font-normal">{secret}</Text>
            </Text>
            <Text className="text-sm font-bold">
              Interval:{" "}
              <Text className="font-mono text-sm font-normal">30 seconds</Text>
            </Text>
            <Text className="text-sm font-bold">
              Digits: <Text className="font-mono text-sm font-normal">6</Text>
            </Text>
          </View>
        </>
      ) : (
        <>
          <Text className="text-sm">
            Scan this code with your two-factor authentication device.
          </Text>
          <View className="flex-row">
            <Button
              key="otp-manual"
              size="inline"
              variant="link"
              onPress={() => setIsManual(true)}
            >
              <Text className="text-sm">Enter key manually instead</Text>
            </Button>
            <Text className="text-sm">.</Text>
          </View>
          <View className="items-center">
            <QRCode value={otpAuthUrl} size={200} />
          </View>
        </>
      )}

      <View className="flex-row justify-between gap-x-4">
        <Button size="sm" variant="outline" onPress={onCancel}>
          <Text>Cancel</Text>
        </Button>
        <Button size="sm" onPress={onNext}>
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  );
}
