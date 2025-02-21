import { View } from "react-native";
import { HandCoins } from "lucide-react-native";

import { Text } from "@homefront/ui";

export function DonationSignUpInfo() {
  return (
    <View className="mb-6 rounded-lg border border-primary-200 bg-primary-50 p-4">
      <View className="flex-row gap-x-3">
        <HandCoins size={24} className="text-primary-600" />
        <View className="flex-1 gap-y-2">
          <Text className="text-base font-bold text-primary-900">
            Sign up to continue donating
          </Text>
          <Text className="text-sm text-primary-800">
            Unlike other platforms, we don't collect your email or address
            details. But this does mean you need an account to manage your
            donation.
          </Text>
          <Text className="text-sm text-primary-800">
            We obfuscate your Homefront account identifier with our payment
            provider to keep your data siloed.
          </Text>
        </View>
      </View>
    </View>
  );
}
