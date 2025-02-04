import { View } from "react-native";

import { Text } from "@homefront/ui";

import type { Friend, Relationship, RelationshipStatus } from "./types";
import { UserAvatar } from "../avatars/UserAvatar";
import { Trust } from "./Trust/Trust";
import { TrustDialog } from "./Trust/TrustDialog";

interface RelationshipProps {
  relationship: Relationship;
  friend: Friend;
}

export function Relationship({ relationship, friend }: RelationshipProps) {
  return (
    <View className="flex-row justify-between border-b border-gray-200 py-4">
      <View className="flex-row items-center gap-x-3">
        <UserAvatar user={friend} />

        <Text className="text-base font-medium">@{friend.username}</Text>
        <View className="gap-y-1">
          <Trust
            trustLevel={relationship.trustLevel}
            relationshipStatus={relationship.status as RelationshipStatus}
          />
        </View>
      </View>

      <View className="flex-row">
        <TrustDialog relationship={relationship} friend={friend} />
      </View>
    </View>
  );
}
