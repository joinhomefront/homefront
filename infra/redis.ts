/// <reference path="./.sst/platform/config.d.ts" />

import { vpc } from "./vpc";

export const redis = new sst.aws.Redis("Redis", {
  dev: {
    host: "localhost",
    port: 6379,
  },
  vpc,
});
