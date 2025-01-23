"use client";

import { View, ViewProps } from "react-native";

import { api } from "@homefront/app/utils/trpc";
import { Resource, Vote } from "@homefront/db";
import { Bookmark, cn, Votes } from "@homefront/ui";

interface ResourceActionsProps {
  resource: Resource & {
    votes: number;
    userVote: { vote: Vote } | null;
    isBookmarked: boolean;
  };
}

export const ResourceActions = ({
  resource,
  className,
  ...props
}: ResourceActionsProps & ViewProps) => {
  const utils = api.useUtils();
  const { id } = resource;

  const voteForResource = api.resources.voteForResource.useMutation({
    onSettled: () => {
      utils.resources.getResource.invalidate(id);
      utils.resources.getResources.invalidate();
    },
  });

  const handleVote = (vote: Vote) => {
    voteForResource.mutate({ resourceId: id, vote });
  };

  const bookmarkResource = api.resources.bookmarkResource.useMutation({
    onSettled: () => {
      utils.resources.getResource.invalidate(id);
      utils.resources.getResources.invalidate();
    },
  });

  const handleBookmark = (bookmark: boolean) => {
    bookmarkResource.mutate({ resourceId: id, bookmark });
  };

  return (
    <View {...props} className={cn("flex-row items-center gap-3", className)}>
      <Votes
        votes={resource.votes}
        onVote={handleVote}
        userVote={resource.userVote ? resource.userVote.vote : undefined}
      />
      <Bookmark
        isBookmarked={resource.isBookmarked}
        onBookmark={handleBookmark}
      />
    </View>
  );
};
