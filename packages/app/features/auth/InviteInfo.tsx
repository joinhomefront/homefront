import { View } from "react-native";

import { UserAvatar } from "@homefront/app/features/avatars/UserAvatar";
import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Text } from "@homefront/ui";

import { getInviteCodeFromRedirect } from "./utils";

interface InviteInfoProps {
  redirect: string;
}

export function InviteInfo({ redirect }: InviteInfoProps) {
  const inviteCode = getInviteCodeFromRedirect(redirect);
  const enabled = !!inviteCode;
  const { data: invite, isLoading } = api.invites.getInvite.useQuery(
    { code: inviteCode ?? "" },
    { enabled },
  );

  if (!inviteCode) {
    return null;
  }

  if ((enabled && isLoading) || !invite) {
    return (
      <View className="mb-6 min-h-10 items-center justify-center border border-transparent p-4">
        <View className="h-10">
          <ActivityIndicator size="small" />
        </View>
      </View>
    );
  }

  const { username } = invite;

  return (
    <View className="mb-6 rounded-md border border-primary bg-primary-foreground p-4">
      <View className="flex-row items-center justify-center gap-x-2">
        <UserAvatar user={{ username: invite.username, image: invite.image }} />
        <View className="flex-1 flex-row flex-wrap items-center justify-start gap-x-1">
          <Text className="flex-wrap text-left text-sm text-primary">
            <Text className="text-sm font-bold text-primary">@{username}</Text>{" "}
            has invited you to join them on Homefront.
          </Text>
        </View>
      </View>
    </View>
  );
}
