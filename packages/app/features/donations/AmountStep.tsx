import type { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { Check, DollarSign } from "lucide-react-native";

import type { DonationType } from "@homefront/db";
import type { DonationFormData } from "@homefront/validators";
import {
  ActivityIndicator,
  Button,
  cn,
  Form,
  FormField,
  FormInput,
  H3,
  Text,
} from "@homefront/ui";

import { TYPES } from "./data";
import { DonationSummary } from "./DonationSummary";
import { SlideUpFadeOut } from "./SlideUpFadeOut";
import { getAmounts, getSupportUsHeader, sanitizeValue } from "./utils";

export function AmountStep({
  form,
  onNext,
  isLoading,
}: {
  form: ReturnType<typeof useForm<DonationFormData>>;
  onNext: (data: DonationFormData) => void;
  isLoading: boolean;
}) {
  const { watch } = form;
  const type = watch("type");
  const amount = watch("amount");
  const [isCustomAmount, setIsCustomAmount] = useState(false);

  const amounts = getAmounts(type);

  const handleCustomAmountPress = () => {
    const isCurrentlyCustomAmount = isCustomAmount;

    setIsCustomAmount((prev) => !prev);
    if (isCurrentlyCustomAmount) {
      form.setValue("amount", 10);
    } else {
      form.setValue("amount", 0);
    }
  };

  const handleAmountPress = (value: number) => {
    setIsCustomAmount(false);
    form.setValue("amount", value);
  };

  const handleTypePress = (value: DonationType) => {
    setIsCustomAmount(false);
    form.setValue("type", value);
    form.setValue("amount", getAmounts(value)[0]?.value ?? 0);
  };

  const handleContinue = () => {
    onNext(form.getValues());
  };

  useEffect(() => {
    if (!amounts.find((a) => a.value === amount) && !isCustomAmount) {
      setIsCustomAmount(true);
    }
  }, []);

  return (
    <Form {...form}>
      <View className="gap-4">
        {isLoading ? (
          <Animated.View entering={FadeInRight.delay(300).duration(200)}>
            <DonationSummary amount={amount} type={type} />
            <View className="h-16" />
          </Animated.View>
        ) : (
          <SlideUpFadeOut>
            <View className="gap-4">
              <View className="flex-row items-center">
                {TYPES.map(({ label, value }, index) => (
                  <View className={cn("relative w-1/3")} key={value}>
                    <Button
                      className={cn(
                        "h-10",
                        index === 0 && "rounded-r-none border-r-primary",
                        index === TYPES.length - 1 &&
                          "rounded-l-none border-l-primary",
                        index !== 0 &&
                          index !== TYPES.length - 1 &&
                          "rounded-none border-l-0 border-r-0",
                      )}
                      variant={type === value ? "default" : "outline"}
                      size="sm"
                      onPress={() => handleTypePress(value)}
                    >
                      <Text className={cn("font-bold")}>{label}</Text>
                    </Button>
                    {type === value && (
                      <View className="absolute left-3 top-3 hidden sm:flex">
                        <Check
                          size={16}
                          strokeWidth={3}
                          className="text-white"
                        />
                      </View>
                    )}
                  </View>
                ))}
              </View>
              <View className="gap-2">
                <View className="py-2">
                  <H3 className="text-left font-sans text-xl font-bold text-primary-950 sm:text-2xl">
                    {getSupportUsHeader(type)}
                  </H3>
                  <Text className="text-left text-sm text-gray-500">
                    Choose an amount that works for you.
                  </Text>
                </View>
                <View className="grid grid-cols-2 gap-2">
                  {amounts.map(({ label, value }) => (
                    <Button
                      key={`${type}-${value}`}
                      variant="outline"
                      className={cn(
                        "relative hover:border-primary",
                        amount === value
                          ? "border-2 border-primary bg-primary-100 active:bg-primary-100"
                          : "web:hover:border-2 web:hover:bg-white web:active:bg-primary-200 border-border border-gray-300",
                      )}
                      onPress={() => handleAmountPress(value)}
                    >
                      {amount === value && (
                        <View className="absolute left-3 top-2.5">
                          <Check
                            size={16}
                            strokeWidth={3}
                            className="text-primary"
                          />
                        </View>
                      )}
                      <Text
                        className={cn(
                          "font-bold",
                          "group-hover:text-primary-800",
                          amount === value
                            ? "text-primary-800"
                            : "text-gray-500",
                        )}
                      >
                        {label}
                      </Text>
                    </Button>
                  ))}
                </View>
                <View>
                  <Button
                    key="custom"
                    variant="outline"
                    className={cn(
                      "relative hover:border-primary",
                      isCustomAmount
                        ? "border-2 border-primary bg-primary-100 active:bg-primary-100"
                        : "web:hover:border-2 web:hover:bg-white web:active:bg-primary-200 border-border border-gray-300",
                    )}
                    onPress={handleCustomAmountPress}
                  >
                    {isCustomAmount && (
                      <View className="absolute left-2 top-2.5">
                        <Check
                          size={16}
                          strokeWidth={3}
                          className="text-primary"
                        />
                      </View>
                    )}
                    <Text
                      className={cn(
                        "font-bold group-hover:text-primary-800",
                        isCustomAmount ? "text-primary-800" : "text-gray-500",
                      )}
                    >
                      Choose your amount
                    </Text>
                  </Button>
                </View>
              </View>

              {isCustomAmount && (
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <View className="relative">
                      <FormInput
                        {...field}
                        label="Enter your amount"
                        keyboardType="numeric"
                        autoFocus
                        onChange={(value) => {
                          const sanitizedValue = sanitizeValue(value);

                          // Enforce minimum value of 1
                          if (
                            sanitizedValue &&
                            parseFloat(sanitizedValue) < 1
                          ) {
                            field.onChange("1");
                          } else {
                            field.onChange(sanitizedValue);
                          }
                        }}
                        value={String(field.value)}
                        inputIcon={<DollarSign size={20} />}
                        inputIconClassName="left-0 right-auto"
                        inputClassName="pl-8 font-bold text-base"
                      />
                    </View>
                  )}
                />
              )}
            </View>
          </SlideUpFadeOut>
        )}
        <Button size="lg" onPress={handleContinue}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="font-bold">Continue</Text>
          )}
        </Button>
      </View>
    </Form>
  );
}
