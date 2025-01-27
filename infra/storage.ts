/// <reference path="./.sst/platform/config.d.ts" />

export const bucket = new sst.aws.Bucket("homefront-next-prod", {
  access: "public",
});

export const cdnBucket = new sst.aws.Bucket("join-homefront", {
  access: "public",
  transform: {
    bucket(args, opts) {
      args.bucket = $app.stage === "production" ? "join-homefront" : undefined;
      opts.import = $app.stage === "production" ? "join-homefront" : undefined;
    },
  },
});

export const cdn = new sst.aws.Cdn("CDN", {
  origins: [
    {
      originId: cdnBucket.arn,
      domainName: cdnBucket.domain,
    },
  ],
  defaultCacheBehavior: {
    targetOriginId: cdnBucket.arn,
    allowedMethods: ["GET", "HEAD", "OPTIONS"],
    cachedMethods: ["GET", "HEAD", "OPTIONS"],
    forwardedValues: {
      queryString: false,
      cookies: {
        forward: "none",
      },
    },
    viewerProtocolPolicy: "redirect-to-https",
  },
});
