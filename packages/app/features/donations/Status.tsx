import { Text, View } from "react-native";
import { cva, VariantProps } from "class-variance-authority";
import Stripe from "stripe";

import { cn } from "@homefront/ui"; // Assuming you have a utility like `cn` for class merging

interface StatusProps {
  status: Stripe.Subscription.Status | Stripe.PaymentIntent.Status;
}

const statusVariants = cva("rounded-sm border px-2 py-0.5", {
  variants: {
    status: {
      active: "border-emerald-300 bg-emerald-100",
      canceled: "border-destructive-300 bg-destructive-100",
      incomplete: "border-amber-300 bg-amber-100",
      incomplete_expired: "border-amber-300 bg-amber-100",
      past_due: "border-destructive-300 bg-destructive-100",
      paused: "border-gray-300 bg-gray-100",
      processing: "border-primary-300 bg-primary-100",
      requires_action: "border-amber-300 bg-amber-100",
      requires_capture: "border-amber-300 bg-amber-100",
      requires_confirmation: "border-amber-300 bg-amber-100",
      requires_payment_method: "border-amber-300 bg-amber-100",
      succeeded: "border-emerald-300 bg-emerald-100",
      trialing: "border-primary-300 bg-primary-100",
      unpaid: "border-destructive-300 bg-destructive-100",
      unknown: "border-gray-300 bg-gray-100",
    },
  },
  defaultVariants: {
    status: "unknown",
  },
});

const textVariants = cva("text-xs font-bold", {
  variants: {
    status: {
      active: "text-emerald-700",
      canceled: "text-destructive-700",
      incomplete: "text-amber-700",
      incomplete_expired: "text-amber-700",
      past_due: "text-destructive-700",
      paused: "text-gray-700",
      processing: "text-primary-700",
      requires_action: "text-amber-700",
      requires_capture: "text-amber-700",
      requires_confirmation: "text-amber-700",
      requires_payment_method: "text-amber-700",
      succeeded: "text-emerald-700",
      trialing: "text-primary-700",
      unpaid: "text-destructive-700",
      unknown: "text-gray-700",
    },
  },
  defaultVariants: {
    status: "unknown",
  },
});

const Status = ({
  status,
}: VariantProps<typeof statusVariants> & StatusProps) => {
  const statusText = {
    active: "Active",
    canceled: "Canceled",
    incomplete: "Incomplete",
    incomplete_expired: "Incomplete Expired",
    past_due: "Past Due",
    paused: "Paused",
    processing: "Processing",
    requires_action: "Requires Action",
    requires_capture: "Requires Capture",
    requires_confirmation: "Requires Confirmation",
    requires_payment_method: "Requires Payment Method",
    succeeded: "Succeeded",
    trialing: "Trialing",
    unpaid: "Unpaid",
    unknown: "Unknown",
  };

  return (
    <View className={cn(statusVariants({ status }))}>
      <Text className={cn(textVariants({ status }))}>
        {statusText[status] || statusText.unknown}
      </Text>
    </View>
  );
};

export { Status };
