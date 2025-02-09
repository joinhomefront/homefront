"use client";

import type { ViewProps } from "react-native";
import { View } from "react-native";

import type { Resource, Vote } from "@homefront/db";
import { api } from "@homefront/app/utils/trpc";
import { Bookmark, cn, Text, Votes } from "@homefront/ui";

interface ResourceActionsProps {
  resource: Resource & {
    votes: number;
    userVote: { vote: Vote } | null;
    isBookmarked: boolean;
    sharedByUsername: string;
  };
}

export const ResourceActions = ({
  resource,
  className,
  ...props
}: ResourceActionsProps & ViewProps) => {
  const utils = api.useUtils();
  const { id } = resource;

  /**
   * Vote for a resource
   *
   * Invalidate the resource and resources query after voting
   */
  const voteForResource = api.resources.voteForResource.useMutation({
    onSettled: async () => {
      await utils.resources.getResource.invalidate(id);
      await utils.resources.getResources.invalidate();
    },
  });

  const handleVote = (vote: Vote) => {
    voteForResource.mutate({ resourceId: id, vote });
  };

  /**
   * Bookmark a resource
   *
   * Invalidate the resource and resources query after bookmarking
   */
  const bookmarkResource = api.resources.bookmarkResource.useMutation({
    onSettled: async () => {
      await utils.resources.getResource.invalidate(id);
      await utils.resources.getResources.invalidate();
    },
  });

  const handleBookmark = (bookmark: boolean) => {
    bookmarkResource.mutate({ resourceId: id, bookmark });
  };

  return (
    <View
      {...props}
      className={cn("w-full flex-row items-center gap-3", className)}
    >
      <Votes
        votes={resource.votes}
        onVote={handleVote}
        userVote={resource.userVote ? resource.userVote.vote : undefined}
      />
      <Bookmark
        isBookmarked={resource.isBookmarked}
        onBookmark={handleBookmark}
      />
      <View className="flex-1 items-end">
        <Text className="text-xs text-gray-500">
          @{resource.sharedByUsername}
        </Text>
      </View>
    </View>
  );
};
