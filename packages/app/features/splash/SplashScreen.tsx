"use client";

import { View } from "react-native";
import { ArrowRight } from "lucide-react-native";
import { SolitoImage } from "solito/image";
import { Link } from "solito/link";

import {
  Act,
  Button,
  Connect,
  Discover,
  Monitor,
  Protect,
  Share,
  Text,
} from "@homefront/ui";

import image from "./democracy.png";

export function SplashScreen() {
  return (
    <View className="flex w-full">
      <View className="w-full">
        <View className="mx-auto grid max-w-screen-xl grid-cols-12 gap-4 px-0 py-4 md:px-4">
          <View className="col-span-12 flex justify-center space-y-3 px-4 py-0 md:col-span-5 md:space-y-4 md:px-0 md:py-4">
            <Text className="font-header text-left text-3xl font-bold uppercase tracking-tight text-primary md:text-5xl">
              Our fight for tomorrow begins today.
            </Text>
            <Text className="font-sans text-lg font-bold leading-5 text-primary md:text-xl">
              You're not alone. Across America, people like you are ready to
              defend democracy together.
            </Text>
            <View className="py-2">
              <View className="md:max-w-fit">
                <Link href={"/signup"}>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-14 flex-row space-x-2 md:max-w-fit"
                  >
                    <Text className="flex items-center text-lg font-bold md:text-xl">
                      Join now
                    </Text>
                    <Text>
                      <ArrowRight size={24} strokeWidth={3} />
                    </Text>
                  </Button>
                </Link>
              </View>
            </View>
          </View>
          <View className="col-span-12 md:col-span-7">
            <View className="relative mr-4">
              <SolitoImage
                height={768}
                width={1536}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                src={image}
                alt="Homefront"
                onLayout={() => {
                  void 0;
                }}
                contentFit="cover"
              />
              <View className="absolute -bottom-4 -right-4 -z-10 h-full w-full bg-primary-700" />
            </View>
          </View>
        </View>
        <View className="px-4 py-4">
          <View className="my-4 flex w-fit flex-shrink-0 bg-primary px-4 py-3">
            <Text className="text-left font-sans text-xl uppercase text-white md:text-2xl">
              Join{" "}
              <Text className="font-sans text-xl font-bold uppercase text-white md:text-2xl">
                the front line
              </Text>
            </Text>
            <Text className="text-left font-sans text-xl uppercase text-white md:text-2xl">
              to defend democracy.
            </Text>
          </View>
          <View className="gap-x-2: grid grid-cols-12 gap-y-2 sm:gap-x-4 sm:gap-y-4">
            <View className="col-span-12 flex-row space-x-3 sm:col-span-6 md:col-span-4">
              <Connect width={80} height={80} />
              <View className="flex-1 space-y-2 py-2">
                <Text className="font-header text-2xl font-bold uppercase text-primary md:text-3xl">
                  Find Allies
                </Text>
                <Text>Organize with trusted people in your community.</Text>
              </View>
            </View>
            <View className="col-span-12 flex-row space-x-3 sm:col-span-6 md:col-span-4">
              <Protect width={80} height={80} />
              <View className="flex-1 space-y-2 py-2">
                <Text className="font-header text-2xl font-bold uppercase text-primary md:text-3xl">
                  Get Ready
                </Text>
                <Text>
                  Prepare to protect yourself, your family, and your community.
                </Text>
              </View>
            </View>
            <View className="col-span-12 flex-row space-x-3 sm:col-span-6 md:col-span-4">
              <Share width={80} height={80} />
              <View className="flex-1 space-y-2 py-2">
                <Text className="font-header text-2xl font-bold uppercase text-primary md:text-3xl">
                  Work Together
                </Text>
                <Text>Share your skills and learn from others.</Text>
              </View>
            </View>
            <View className="col-span-12 flex-row space-x-3 sm:col-span-6 md:col-span-4">
              <Discover width={80} height={80} />
              <View className="flex-1 space-y-2 py-2">
                <Text className="font-header text-2xl font-bold uppercase text-primary md:text-3xl">
                  Find Resources
                </Text>
                <Text>
                  Discover and distribute essential learning and resources.
                </Text>
              </View>
            </View>
            <View className="col-span-12 flex-row space-x-3 sm:col-span-6 md:col-span-4">
              <Monitor width={80} height={80} />
              <View className="flex-1 space-y-2 py-2">
                <Text className="font-header text-2xl font-bold uppercase text-primary md:text-3xl">
                  Stay Alert
                </Text>
                <Text>Monitor threats in real time for shared awareness.</Text>
              </View>
            </View>
            <View className="col-span-12 flex-row space-x-3 sm:col-span-6 md:col-span-4">
              <Act width={80} height={80} />
              <View className="flex-1 space-y-2 py-2">
                <Text className="font-header text-2xl font-bold uppercase text-primary md:text-3xl">
                  Fight Back
                </Text>
                <Text>Take action when the time comes&mdash;together.</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
