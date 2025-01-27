/// <reference path="./.sst/platform/config.d.ts" />

import { databaseUrl } from "./secrets";

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
