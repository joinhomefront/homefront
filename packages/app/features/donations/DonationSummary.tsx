import { View } from "react-native";
import { Banknote } from "lucide-react-native";

import type { DonationType } from "@homefront/db";
import { Text } from "@homefront/ui";

function getPaymentTypeLabel(type: string) {
  switch (type) {
    case "one_time":
      return "Just this once";
    case "monthly":
      return "Every month";
    case "yearly":
      return "Every year";
  }
}

interface DonationSummaryProps {
  amount: number;
  type: DonationType;
  children?: React.ReactNode;
}

export const DonationSummary = ({
  amount,
  type,
  children,
}: DonationSummaryProps) => {
  return (
    <View className="rounded-md border border-gray-200 p-4 drop-shadow-sm">
      <View className="flex-row items-end justify-between">
        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <Banknote size={24} className="text-gray-500" />
            <Text className="text-sm font-bold text-gray-500">
              Your Donation
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-2xl font-bold">${amount}</Text>
            <Text className="text-sm text-gray-500">
              {getPaymentTypeLabel(type)}
            </Text>
          </View>
        </View>
        <View>{children}</View>
      </View>
    </View>
  );
};
