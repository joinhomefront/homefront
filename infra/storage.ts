/// <reference path="./.sst/platform/config.d.ts" />

export const bucket = new sst.aws.Bucket("homefront-next-prod", {
  access: "public",
});
