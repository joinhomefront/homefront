import { useEffect } from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { api } from "@homefront/app/utils/trpc";

import { CreateInviteDialog } from "./CreateInviteDialog";
import { Invite } from "./Invite";
import { useInviteStore } from "./store";

export const Invites = () => {
  const invites = useInviteStore((state) => state.invites);
  const mergeInvites = useInviteStore((state) => state.mergeInvites);
  const { data: userInvites } = api.invites.getUserInvites.useQuery();

  useEffect(() => {
    if (userInvites) {
      mergeInvites(userInvites);
    }
  }, [userInvites, mergeInvites]);

  return (
    <View>
      <View className="flex-row items-center justify-start">
        <CreateInviteDialog />
      </View>
      <FlashList
        data={invites}
        renderItem={({ item: invite }) => (
          <Invite key={invite.id} invite={invite} />
        )}
        ItemSeparatorComponent={() => (
          <View className="h-2 border-b border-gray-200" />
        )}
        keyExtractor={(invite) => invite.id}
        estimatedItemSize={65}
      />
    </View>
  );
};
