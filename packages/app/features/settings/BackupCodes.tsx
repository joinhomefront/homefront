import { useState } from "react";
import { Platform, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { AlertCircle } from "lucide-react-native";

import { Button, Text } from "@homefront/ui";

interface BackupCodesProps {
  codes: string[];
  onComplete: () => void;
}
export function BackupCodes({ codes, onComplete }: BackupCodesProps) {
  const [copied, setCopied] = useState(false);

  const handleDownload = async () => {
    const content = codes.join("\n");

    if (Platform.OS === "web") {
      const uri = `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = uri;
      downloadLink.download = "backup-codes.txt";
      downloadLink.click();
    } else {
      try {
        const fileUri = `${FileSystem.documentDirectory}backup-codes.txt`;
        await FileSystem.writeAsStringAsync(fileUri, content, {
          encoding: FileSystem.EncodingType.UTF8,
        });

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri);
        } else {
          alert("Sharing is not available on this device.");
        }
      } catch (error) {
        console.error("Failed to download backup codes:", error);
        alert("Failed to download backup codes. Please try again.");
      }
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(codes.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 5000); // Increased timeout to match RecoveryPhrase
  };

  return (
    <View className="gap-y-4">
      <Text className="text-xl font-bold">
        Set up two-factor authentication
      </Text>

      <View className="flex-row items-start gap-x-2 rounded-md border border-amber-600 bg-amber-100 px-3 py-2">
        <AlertCircle className="text-amber-800" size={24} />
        <Text className="flex-1 text-sm text-amber-800">
          <Text className="text-sm font-bold text-amber-800">
            Please make sure you save your recovery codes.{" "}
            <Text className="text-sm font-normal text-amber-800">
              You can permanently lose access to your account if you lose your
              two-factor authentication device.
            </Text>
          </Text>
        </Text>
      </View>

      <Text className="text-sm">
        <Text className="text-sm font-bold">
          Save these backup codes in a secure place.
        </Text>{" "}
        You can use these to access your account if you lose your two-factor
        authentication device. Each code can only be used once.
      </Text>

      <View className="gap-y-2">
        <View className="flex-row flex-wrap justify-between">
          {codes.map((code, index) => (
            <Text
              key={index}
              className="w-1/2 px-2 py-1 text-center font-mono text-sm"
            >
              {code}
            </Text>
          ))}
        </View>

        <View className="flex-row justify-center gap-x-4">
          <Button size="sm" onPress={handleDownload}>
            <Text>Download</Text>
          </Button>

          <Button size="sm" variant="outline" onPress={copyToClipboard}>
            <Text>{copied ? "Copied!" : "Copy"}</Text>
          </Button>
        </View>
      </View>

      <View className="flex-row justify-start">
        <Button size="sm" variant="outline" onPress={onComplete}>
          <Text>Close</Text>
        </Button>
      </View>
    </View>
  );
}
