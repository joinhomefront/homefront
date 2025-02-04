import { useState } from "react";
import { View } from "react-native";
import Animated, { FadeOutRight } from "react-native-reanimated";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Pencil } from "lucide-react-native";
import { useForm } from "react-hook-form";

import type { DonationType } from "@homefront/db";
import { getBaseUrl } from "@homefront/app/utils/base-url";
import { ActivityIndicator, Button, Form, Text } from "@homefront/ui";

import { DonationSummary } from "./DonationSummary";

function getButtonText(amount: number, type: string) {
  switch (type) {
    case "one_time":
      return `Donate $${amount}`;
    case "monthly":
      return `Donate $${amount} per month`;
    case "yearly":
      return `Donate $${amount} per year`;
  }
}

interface PaymentStepProps {
  amount: number;
  type: DonationType;
  onBack: ({ amount, type }: { amount: number; type: DonationType }) => void;
}

export function PaymentStep({ amount, type, onBack }: PaymentStepProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {},
  });

  const onSubmit = async () => {
    if (!stripe || !elements) return;

    setIsLoading(true);
    setError(undefined);

    try {
      const { error: submitError } = await elements.submit();
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      if (submitError) throw submitError;

      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: null,
              email: null,
              phone: null,
              address: {},
            },
          },
          return_url: `${getBaseUrl()}/donate/thank-you`,
        },
      });

      // eslint-disable-next-line @typescript-eslint/only-throw-error, @typescript-eslint/no-unnecessary-condition
      if (paymentError) throw paymentError;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <View className="gap-y-6">
        <DonationSummary amount={amount} type={type}>
          <Button
            variant="ghost"
            size="sm"
            onPress={() => onBack({ amount, type })}
          >
            <Pencil size={16} className="text-gray-500" />
          </Button>
        </DonationSummary>
        <Animated.View exiting={FadeOutRight.duration(200)}>
          <PaymentElement
            options={{
              fields: {
                billingDetails: {
                  name: "never",
                  email: "never",
                  phone: "never",
                  address: "if_required",
                },
              },
            }}
          />
        </Animated.View>

        {error && <Text className="text-red-500">{error}</Text>}

        <View>
          <Button size="lg" onPress={form.handleSubmit(onSubmit)}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="font-bold">{getButtonText(amount, type)}</Text>
            )}
          </Button>
        </View>
      </View>
    </Form>
  );
}
