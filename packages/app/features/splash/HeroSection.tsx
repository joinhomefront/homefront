import { View } from "react-native";

import { Text } from "@homefront/ui";

export const HeroSection = () => {
  return (
    <View className="w-full items-center justify-center px-4 py-6">
      {/* Headline */}
      <Text className="font-header-bold text-center text-[72px] font-bold uppercase leading-none text-primary-800 md:text-[128px]">
        Change
      </Text>
      <Text className="font-header-bold text-center text-3xl font-bold uppercase text-primary-500 md:text-[58px] md:leading-normal">
        We make happen
      </Text>

      {/* Subtext */}
      <Text className="mt-4 max-w-[720px] text-center text-base text-primary-800 md:text-2xl">
        Authoritarianism is here. The backstops have failed. It’s up to us to
        organize, defend democracy, and build something better.
      </Text>

      {/* Call to Action */}
      <Text className="mt-6 text-center text-base font-bold text-primary-800 md:text-2xl">
        Find your role. Join your people. Make change happen.
      </Text>
    </View>
  );
};
