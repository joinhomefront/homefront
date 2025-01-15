/// <reference path="./infra/.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "nextjs",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: process.env.GITHUB_ACTIONS ? undefined : "default",
        },
        cloudflare: "5.47.0",
        github: "6.5.0",
      },
    };
  },
  async run() {
    const { bucket } = await import("./infra/storage");
    await import("./infra/nextjs");
    await import("./infra/db");
    return {
      buckets: [bucket],
    };
  },
});
