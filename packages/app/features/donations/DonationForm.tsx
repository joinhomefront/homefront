import { useState } from "react";
import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { LockKeyhole } from "lucide-react-native";
import { useForm } from "react-hook-form";

import type { DonationType } from "@homefront/db";
import type { DonationFormData } from "@homefront/validators";
import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Text } from "@homefront/ui";
import { DonationFormSchema } from "@homefront/validators";

import { AmountStep } from "./AmountStep";
import { PaymentStep } from "./PaymentStep";
import { getProductForType } from "./utils";

export enum DonationStep {
  AMOUNT = "amount",
  PAYMENT = "payment",
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
);

export function DonationForm() {
  const [step, setStep] = useState<DonationStep>(DonationStep.AMOUNT);
  const [clientSecret, setClientSecret] = useState<string>();
  const [customerSessionClientSecret, setCustomerSessionClientSecret] =
    useState<string>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const { data: products, isLoading: isLoadingProducts } =
    api.donations.getProducts.useQuery();

  const { data: customer } = api.donations.getCustomer.useQuery();

  const form = useForm<DonationFormData>({
    resolver: zodResolver(DonationFormSchema),
    defaultValues: {
      amount: 10.0,
      type: "monthly",
    },
  });

  const product = getProductForType(form.getValues("type"), products);

  const { mutateAsync: initiateDonation } =
    api.donations.initiateDonation.useMutation({
      onSuccess: ({ customerSession, clientSecret }) => {
        setClientSecret(clientSecret);
        setCustomerSessionClientSecret(customerSession.client_secret);
        setStep(DonationStep.PAYMENT);
      },
    });

  const createPrice = api.donations.createPrice.useMutation({});

  const createCustomer = api.donations.createCustomer.useMutation({});

  const findOrCreateCustomer = async () => {
    if (customer?.stripeCustomerId) {
      return Promise.resolve(customer);
    }

    return await createCustomer.mutateAsync({});
  };

  const handleOnBack = ({
    amount,
    type,
  }: {
    amount: number;
    type: DonationType;
  }) => {
    form.setValue("amount", amount);
    form.setValue("type", type);
    setStep(DonationStep.AMOUNT);
  };

  if (isLoadingProducts || !product) {
    return (
      <View className="items-center justify-center p-4">
        <ActivityIndicator size="small" className="text-primary" />
      </View>
    );
  }

  const handleAmountSubmit = async (data: DonationFormData) => {
    setIsLoading(true);
    setError(undefined);
    const amountInCents = data.amount * 100;

    try {
      await findOrCreateCustomer().then(async ({ stripeCustomerId }) => {
        await createPrice
          .mutateAsync({
            amount: amountInCents,
            productId: product.stripeProductId,
            type: data.type,
          })
          .then(async ({ stripePriceId }) => {
            await initiateDonation({
              amount: amountInCents,
              type: data.type,
              customerId: stripeCustomerId,
              priceId: stripePriceId,
            });
          });
      });
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
    <View className="w-full max-w-md py-4">
      {step === DonationStep.AMOUNT && (
        <AmountStep
          onNext={(data) => handleAmountSubmit(data)}
          form={form}
          isLoading={isLoading}
        />
      )}

      {step === DonationStep.PAYMENT &&
        clientSecret &&
        customerSessionClientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              customerSessionClientSecret,
              clientSecret,
            }}
          >
            <PaymentStep
              amount={form.getValues("amount")}
              type={form.getValues("type")}
              onBack={handleOnBack}
            />
          </Elements>
        )}
      {error && <Text className="mb-4 text-red-500">{error}</Text>}

      <Text className="max-w-prose py-4 text-center text-sm font-bold text-gray-500">
        <LockKeyhole size={16} className="-mt-1 inline text-gray-500" /> Secure
        transaction
      </Text>
    </View>
  );
}
