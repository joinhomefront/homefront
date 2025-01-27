/// <reference path="./.sst/platform/config.d.ts" />

import { databaseUrl } from "./secrets";

export const actionScoresCron = new sst.aws.Cron("ActionScores", {
  schedule: "rate(5 minutes)",
  function: {
    handler: "packages/lambdas/src/actions-scores.handler",
    environment: {
      DATABASE_URL: databaseUrl.value,
    },
  },
});

export const actionVotesCron = new sst.aws.Cron("ActionVotes", {
  schedule: "rate(5 minutes)",
  function: {
    handler: "packages/lambdas/src/actions-votes.handler",
    environment: {
      DATABASE_URL: databaseUrl.value,
    },
  },
});

export const removeExpiredInvitesCron = new sst.aws.Cron(
  "RemoveExpiredInvites",
  {
    schedule: "rate(1 hour)",
    function: {
      handler: "packages/lambdas/src/remove-expired-invites.handler",
      environment: {
        DATABASE_URL: databaseUrl.value,
      },
    },
  },
);

export const resourceScoresCron = new sst.aws.Cron("ResourceScores", {
  schedule: "rate(5 minutes)",
  function: {
    handler: "packages/lambdas/src/resources-scores.handler",
    environment: {
      DATABASE_URL: databaseUrl.value,
    },
  },
});

export const resourceVotesCron = new sst.aws.Cron("ResourceVotes", {
  schedule: "rate(5 minutes)",
  function: {
    handler: "packages/lambdas/src/resources-votes.handler",
    environment: {
      DATABASE_URL: databaseUrl.value,
    },
  },
});
