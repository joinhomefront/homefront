import type { ViewProps } from "react-native";
import React from "react";
import { View } from "react-native";
import { ArrowRight } from "lucide-react-native";
import { Link } from "solito/link";

import { Button, cn, H1, LogoAlt, Logotype, Text } from "@homefront/ui";

export const SplashHeader: React.FC<ViewProps> = () => {
  return (
    <View
      className={cn(
        "mx-auto min-h-[56px] w-full justify-center border-b border-b-primary-100 bg-white px-5 py-2",
      )}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-1">
          <Link href="/">
            <View className="flex flex-row items-center gap-x-3 hover:opacity-80">
              <LogoAlt height={32} width={48} className="flex" />
              <Logotype height={24} className="flex" />
              <H1 className="sr-only">Homefront</H1>
            </View>
          </Link>
        </View>
        <View className="flex-row items-center">
          <Link href="/signup">
            <Button
              variant="destructive"
              size="sm"
              hasIcon
              className="hidden sm:flex"
            >
              <Text className="font-bold">Join us</Text>
              <ArrowRight
                size={16}
                strokeWidth={3}
                className="hidden text-white sm:flex"
              />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="link" size="sm" hasIcon>
              <Text className="font-bold">Sign in</Text>
              <ArrowRight size={16} className="hidden text-primary sm:flex" />
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
};
