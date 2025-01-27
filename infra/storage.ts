/// <reference path="./.sst/platform/config.d.ts" />

export const bucket = new sst.aws.Bucket("homefront-next-prod", {
  access: "public",
});

export const cdnBucket = new sst.aws.Bucket("join-homefront", {
  access: "public",
});

export const cdn = new sst.aws.Cdn("CDN", {
  origins: [
    {
      originId: cdnBucket.arn,
      domainName: cdnBucket.domain,
    },
  ],
  domain:
    $app.stage === "production"
      ? {
          name: "cdn.joinhomefront.org",
          dns: sst.cloudflare.dns(),
        }
      : $app.stage === "staging"
        ? {
            name: "staging-cdn.joinhomefront.org",
            dns: sst.cloudflare.dns(),
          }
        : undefined,
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
