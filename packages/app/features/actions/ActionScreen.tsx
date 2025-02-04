"use client";

import { SafeAreaView, ScrollView, View } from "react-native";
import { useParams } from "solito/navigation";

import type { Vote } from "@homefront/db";
import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, H2, Markdown, Text, Votes } from "@homefront/ui";

import { ActionDomainAreasList } from "./ActionDomainAreasList";
import { ActionTypeIcon } from "./ActionTypeIcon";
import { UserActionButtons } from "./UserActionButtons";
import { getLabelForActionType } from "./utils";

interface Params {
  id: string;
  [key: string]: string | number | boolean;
}

export function ActionScreen() {
  const { id } = useParams<Params>();

  const { data: action, isLoading } = api.actions.getActionById.useQuery({
    id,
  });

  const voteForAction = api.actions.voteForAction.useMutation();

  const handleVote = (vote: Vote) => {
    voteForAction.mutate({ actionId: id, vote });
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <ActivityIndicator />
      </View>
    );
  }

  if (!action) {
    return <Text>No action found</Text>;
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <View className="mx-auto w-full max-w-screen-xl flex-1 px-4">
            <View>
              <View className="flex-1">
                <View className="py-4">
                  <UserActionButtons action={action} />
                </View>

                <H2>{action.title}</H2>
                <Text className="max-w-prose pt-1 text-sm text-gray-500">
                  {action.description}
                </Text>
                <View className="flex-row items-center gap-x-4 pt-2">
                  <Votes
                    votes={action.votes}
                    onVote={handleVote}
                    userVote={
                      action.userVote ? action.userVote.vote : undefined
                    }
                  />
                  <View className="flex-row items-center gap-x-2">
                    <ActionTypeIcon
                      type={action.type}
                      className="text-gray-500"
                    />
                    <Text className="text-sm text-gray-500">
                      {getLabelForActionType(action.type)}
                    </Text>
                  </View>
                  <ActionDomainAreasList domainAreas={action.domainAreas} />
                </View>

                <View className="py-4">
                  <Markdown key={`${action.id}-body`}>{action.body}</Markdown>
                </View>

                <View className="py-4">
                  <UserActionButtons action={action} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
