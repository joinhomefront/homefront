"use client";

import { useState } from "react";
import { View } from "react-native";
import { ArrowBigDown, ArrowBigUp } from "lucide-react-native";
import { MotiView } from "moti";
import { MotiPressable, useMotiPressable } from "moti/interactions";

import type { Vote } from "@homefront/db";
import { cn, Text } from "@homefront/ui";

interface ArrowProps {
  vote: number | undefined;
}

function UpArrow({ vote }: ArrowProps) {
  const state = useMotiPressable(
    ({ pressed }) => {
      "worklet";

      return {
        transform:
          pressed && vote !== 1 ? [{ translateY: -25 }] : [{ translateY: 0 }],
      };
    },
    [vote],
  );

  return (
    <View
      className={cn(
        "group rounded-full p-1",
        "text-white",

        vote === 1 && "bg-primary hover:bg-primary-700 group-focus:bg-primary",
        vote === -1 &&
          "bg-destructive hover:bg-destructive-700 group-focus:bg-destructive",
      )}
    >
      <MotiView state={state}>
        <ArrowBigUp
          size={24}
          className={cn(
            "text-white",
            vote !== 1 && vote !== -1 && "group-hover:text-primary-400",
          )}
          fill={vote === 1 ? "currentColor" : "none"}
          strokeWidth={vote === 1 ? 2 : 1.5}
        />
      </MotiView>
    </View>
  );
}

function DownArrow({ vote }: ArrowProps) {
  const state = useMotiPressable(
    ({ pressed }) => {
      "worklet";

      return {
        transform:
          pressed && vote !== -1 ? [{ translateY: 15 }] : [{ translateY: 0 }],
      };
    },
    [vote],
  );

  return (
    <View
      className={cn(
        "group rounded-full p-1",
        "text-white",
        vote === 1 && "bg-primary hover:bg-primary-700 group-focus:bg-primary",

        vote === -1 &&
          "bg-destructive hover:bg-destructive-700 group-focus:bg-destructive",
      )}
    >
      <MotiView state={state}>
        <ArrowBigDown
          size={24}
          className={cn(
            "text-white",
            vote !== 1 && vote !== -1 && "group-hover:text-destructive-400",
          )}
          fill={vote === -1 ? "currentColor" : "none"}
          strokeWidth={vote === -1 ? 2 : 1.5}
        />
      </MotiView>
    </View>
  );
}

interface VotesProps {
  votes: number;
  userVote?: Vote;
  onVote: (vote: Vote) => void;
}

export function Votes({ votes, onVote, userVote }: VotesProps) {
  const [votesCount, setVotesCount] = useState<number>(votes);
  const [vote, setVote] = useState<Vote | undefined>(userVote);

  const handleUpvote = () => {
    if (vote === 1) {
      setVote(0);
      setVotesCount((prev) => prev - 1);
      onVote(0);
      return;
    }

    if (vote === -1) {
      setVote(1);
      setVotesCount((prev) => prev + 2);
      onVote(1);
      return;
    }

    setVote(1);
    setVotesCount((prev) => prev + 1);
    onVote(1);
  };

  const handleDownvote = () => {
    if (vote === 1) {
      setVote(-1);
      setVotesCount((prev) => prev - 2);
      onVote(-1);
      return;
    }

    if (vote === -1) {
      setVote(0);
      setVotesCount((prev) => prev + 1);
      onVote(0);
      return;
    }

    setVote(-1);
    setVotesCount((prev) => prev - 1);
    onVote(-1);
  };

  return (
    <View
      className={cn(
        "pointer-events-auto h-fit w-fit select-none flex-row items-center rounded-full bg-gray-400",
        vote === 1 && "bg-primary",
        vote === -1 && "bg-destructive",
      )}
    >
      <MotiPressable onPress={handleUpvote}>
        <UpArrow vote={vote} />
      </MotiPressable>

      <Text
        className={cn(
          "min-w-3 select-none text-center text-sm font-bold text-white",
        )}
      >
        {votesCount}
      </Text>

      <MotiPressable onPress={handleDownvote}>
        <DownArrow vote={vote} />
      </MotiPressable>
    </View>
  );
}
