"use client";

import { useState } from "react";
import { View } from "react-native";
import { ArrowRight, Ban, Check, ListTodo } from "lucide-react-native";
import { Link } from "solito/link";

import type { Action, ActionVote, DomainArea, Vote } from "@homefront/db";
import { api } from "@homefront/app/utils/trpc";
import {
  ActivityIndicator,
  Button,
  ButtonIcon,
  Text,
  Votes,
} from "@homefront/ui";

import { ActionDomainAreasList } from "./ActionDomainAreasList";
import { ActionTypeIcon } from "./ActionTypeIcon";
import { getLabelForActionType } from "./utils";

interface RecommendedActionItemProps {
  action: Action & {
    domainAreas: DomainArea[];
    userVote: ActionVote | null;
    votes: number;
  };
}

export function RecommendedActionItem({ action }: RecommendedActionItemProps) {
  const [isResponding, setIsResponding] = useState<boolean>(false);

  const utils = api.useUtils();

  const updateRecommendedAction =
    api.actions.updateRecommendedAction.useMutation({
      onError: () => {
        setIsResponding(!isResponding);
      },
      onSettled: async () => {
        await utils.actions.getRecommendedActions.invalidate().then(() => {
          setIsResponding(false);
        });
        await utils.actions.getUserActions.invalidate();
      },
    });

  const handleResponse = ({
    accepted,
    completed,
  }: {
    accepted: boolean;
    completed: boolean;
  }) => {
    setIsResponding(true);
    updateRecommendedAction.mutate({
      actionId: action.id,
      accepted,
      completed,
    });
  };

  const voteForAction = api.actions.voteForAction.useMutation();

  const handleVote = (vote: Vote) => {
    voteForAction.mutate({ actionId: action.id, vote });
  };

  const isLoading = isResponding || updateRecommendedAction.isPending;
  const isDisabled = isLoading;

  return (
    <View className="gap-2 border-b border-gray-200 py-4">
      <View className="flex-1">
        <Text className="font-bold">{action.title}</Text>
        <Text className="max-w-prose pt-1 text-sm text-gray-500">
          {action.description}
        </Text>
      </View>
      <View className="flex-row flex-wrap items-center gap-x-4 gap-y-2">
        <Votes
          votes={action.votes}
          onVote={handleVote}
          userVote={action.userVote ? action.userVote.vote : undefined}
        />

        <View className="flex-row items-center gap-x-2">
          <ActionTypeIcon type={action.type} className="text-gray-500" />
          <Text className="text-sm text-gray-500">
            {getLabelForActionType(action.type)}
          </Text>
        </View>
        <ActionDomainAreasList domainAreas={action.domainAreas} />
        {action.body && (
          <Link href={`/actions/${action.id}`}>
            <View className="flex-row items-center gap-x-1 text-primary">
              <Text className="text-sm text-primary">Read more</Text>
              <ArrowRight size={16} />
            </View>
          </Link>
        )}
      </View>

      {isLoading ? (
        <View className="h-8 flex-row items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : (
        <View className="max-w-prose flex-1 flex-row gap-1">
          <Button
            variant="outline-neutral-primary"
            size="sm"
            hasIcon
            onPress={() => handleResponse({ accepted: true, completed: false })}
            disabled={isDisabled}
          >
            <ButtonIcon icon={ListTodo} size={16} />
            <Text>Add to list</Text>
          </Button>

          <Button
            variant="outline-neutral-primary"
            size="sm"
            hasIcon
            onPress={() => handleResponse({ accepted: true, completed: true })}
            disabled={isDisabled}
          >
            <ButtonIcon icon={Check} size={16} />
            <Text>Complete</Text>
          </Button>

          <Button
            variant="outline-neutral-destructive"
            size="sm"
            hasIcon
            onPress={() =>
              handleResponse({ accepted: false, completed: false })
            }
            disabled={isDisabled}
          >
            <ButtonIcon icon={Ban} size={16} />
            <Text>Ignore</Text>
          </Button>
        </View>
      )}
    </View>
  );
}
