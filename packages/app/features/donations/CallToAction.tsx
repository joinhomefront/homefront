import { View } from "react-native";
import { ArrowRight, HeartHandshake } from "lucide-react-native";
import { Link } from "solito/link";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Button, H3, Text } from "@homefront/ui";

export function CallToAction() {
  const { data: isCustomer, isLoading } =
    api.donations.isStripeCustomer.useQuery();

  if (isLoading) {
    return (
      <View className="w-full items-center justify-center px-4 py-2">
        <ActivityIndicator size="small" className="text-primary" />
      </View>
    );
  }

  if (isCustomer) {
    return null;
  }
  return (
    <View className="w-full bg-primary-700 px-4 py-2">
      <View className="sm:gap-2">
        <View className="flex-row justify-between sm:justify-normal sm:gap-6">
          <View className="hidden sm:flex">
            <View className="flex-row items-center space-x-2">
              <HeartHandshake size={24} className="text-white" />
              <H3 className="font-header uppercase text-white">
                Support Homefront
              </H3>
            </View>

            <Text className="text-sm text-white">
              Fund our fight for democracy
            </Text>
          </View>

          <View>
            <Link href="/donate">
              <Button hasIcon className="h-8 rounded-full bg-amber-400">
                <Text className="font-sans text-sm font-bold text-primary-900">
                  Support us
                </Text>
                <ArrowRight size={16} className="text-primary-900" />
              </Button>
            </Link>
          </View>

          <View className="flex flex-row items-center space-x-2 py-1.5 sm:hidden">
            <HeartHandshake size={16} className="text-white" />
            <Text className="text-sm text-white">
              Fund our fight for democracy
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
