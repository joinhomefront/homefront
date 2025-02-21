import { useState } from "react";
import { Pressable, View } from "react-native";
import { ArrowRight } from "lucide-react-native";
import { Link } from "solito/link";

import { Button, Progress, Text } from "@homefront/ui";
import { Amex } from "@homefront/ui/components/icons/Amex";
import { Mastercard } from "@homefront/ui/components/icons/Mastercard";
import { Visa } from "@homefront/ui/components/icons/Visa";

type DonationAmount = 5 | 10 | 25 | "other";

interface DonationBoxProps {
  onDonate?: (amount: number) => void;
}

export function DonationBox({ onDonate }: DonationBoxProps) {
  const [supporters, setSupporters] = useState(14);
  const [selectedAmount, setSelectedAmount] = useState<DonationAmount>(5);
  const goal = 400;
  const progress = (supporters / goal) * 100;

  return (
    <View className="mx-auto flex max-w-[1080px] px-4 py-8 md:w-[1080px]">
      {/* Header Section */}
      <View className="w-full min-w-full flex-1 pb-4">
        <View className="flex-row">
          <View className="bg-destructive-600 px-2 py-1">
            <Text className="font-serif text-4xl font-bold text-primary-50">
              I can't
            </Text>
          </View>
        </View>
        <View className="flex-row">
          <View className="bg-destructive-600 px-2 py-1">
            <Text className="font-serif text-4xl font-bold text-primary-50">
              do this alone
            </Text>
          </View>
        </View>
      </View>

      <View className="w-full flex-1 flex-col gap-8 md:flex-row">
        <View className="gap-y-4">
          {/* Main Text */}
          <View className="gap-y-4">
            <Text className="max-w-prose font-serif text-base text-primary-50">
              Big tech, venture capital, and private equity control every major
              organizing tool. If we don't build our own, we'll never have real
              power. But I can't do this alone.
            </Text>

            <Text className="max-w-prose font-serif text-base text-primary-50">
              Homefront is{" "}
              <Link href="/about">
                <Text className="cursor-pointer font-serif text-base text-primary-50 underline">
                  just me
                </Text>
              </Link>
              &mdash;and I'm almost out of funds to keep going.
            </Text>

            <View>
              <View className="bg-destructive-600 px-2 py-1">
                <Text className="w-full max-w-full font-serif text-base font-bold text-white">
                  Just 400 people giving $5 per month can continue this work
                  indefinitely.
                </Text>
              </View>
            </View>
          </View>

          {/* Progress Section */}
          <View className="w-full flex-1 gap-y-2">
            <Progress
              value={progress}
              className="h-4 bg-primary-50"
              indicatorClassName="bg-primary-300"
            />

            <Text className="font-serif text-primary-100">
              <Text className="font-serif text-lg font-bold text-primary-300">
                {supporters} supporters
              </Text>{" "}
              of {goal} person goal
            </Text>
          </View>
        </View>

        {/* Donation Section */}
        <View className="flex-1 items-center gap-y-2">
          {/* Donation Options */}
          <View className="flex-row items-center justify-center gap-x-2">
            {[5, 10, 25].map((amount) => (
              <Pressable
                key={amount}
                className={`rounded-full px-4 py-2 ${
                  selectedAmount === amount ? "bg-white" : "border border-white"
                }`}
                onPress={() => setSelectedAmount(amount as DonationAmount)}
              >
                <Text
                  className={`font-semibold ${
                    selectedAmount === amount
                      ? "text-primary-900"
                      : "text-white"
                  }`}
                >
                  ${amount}/mo
                </Text>
              </Pressable>
            ))}
          </View>

          {/* CTA Button */}
          <View className="w-full flex-row items-center justify-center">
            <Link href="/donate" className="w-full flex-row">
              <Button
                variant="default"
                size="lg"
                className="mt-2 w-full max-w-sm rounded-full bg-destructive-600"
                onPress={() => {
                  if (selectedAmount !== "other") {
                    onDonate?.(selectedAmount);
                  }
                }}
              >
                <View className="flex-row items-center gap-x-2">
                  <Text className="font-serif text-lg font-bold text-primary-50">
                    Continue
                  </Text>
                  <ArrowRight size={20} className="text-primary-50" />
                </View>
              </Button>
            </Link>
          </View>

          <View className="flex-row items-center justify-center gap-x-2 py-2">
            <Visa />
            <Mastercard />
            <Amex />
          </View>
        </View>
      </View>
    </View>
  );
}
