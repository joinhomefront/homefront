/// <reference path="./.sst/platform/config.d.ts" />

export const vpc = new sst.aws.Vpc("Vpc", {
  nat: "ec2",
  az: $app.stage === "production" ? 2 : 1,
});
