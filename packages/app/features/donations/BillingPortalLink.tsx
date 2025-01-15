import { useCallback } from "react";
import { CreditCard } from "lucide-react-native";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Button, Text } from "@homefront/ui";

export const BillingPortalLink = () => {
  const { mutateAsync: createBillingPortalSessionAsync, isPending } =
    api.donations.createBillingPortalSession.useMutation({
      onSuccess: ({ url }) => {
        window.open(url, "_blank");
      },
    });

  const handleManageSubscription = useCallback(async () => {
    await createBillingPortalSessionAsync();
  }, []);

  return (
    <Button
      variant="link"
      size="sm"
      onPress={handleManageSubscription}
      className="w-full"
      hasIcon
    >
      {isPending ? (
        <ActivityIndicator size="small" className="text-primary" />
      ) : (
        <>
          <CreditCard size={16} className="text-primary" />

          <Text>Manage your donations</Text>
        </>
      )}
    </Button>
  );
};
