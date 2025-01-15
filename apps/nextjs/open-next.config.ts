import type { OpenNextConfig } from "@opennextjs/aws/types/open-next.js";

const config = {
  default: {
    override: {
      wrapper: "aws-lambda-streaming", // This is necessary to enable lambda streaming
    },
  },
  // buildCommand: "exit 0", // in my example we set up Turborepo task distribution to handle the order of building.
  buildOutputPath: ".",
  appPath: ".",
  packageJsonPath: ".", // again, path to the root of your repo (where the package.json is)
  functions: {
    auth: {
      runtime: "node",
      routes: [
        "app/api/auth/signup/route",
        "app/api/auth/2fa/enable/route",
        "app/api/auth/2fa/disable/route",
        "app/api/auth/generate-recovery-phrase/route",
        "app/api/auth/password/route",
        "app/api/auth/password-vulnerability/route",
        "app/api/auth/challenges/validate/route",
        "app/api/auth/[...nextauth]/route",
        "app/api/sessions/full/route",
        "app/api/sessions/new/route",
      ],
      patterns: [
        "api/auth/signup",
        "api/auth/2fa/enable",
        "api/auth/2fa/disable",
        "api/auth/generate-recovery-phrase",
        "api/auth/password",
        "api/auth/password-vulnerability",
        "api/auth/challenges/validate",
        "api/auth/*",
        "api/sessions/full",
        "api/sessions/new",
      ],
      install: {
        packages: ["@node-rs/argon2-linux-x64-gnu", "@node-rs/argon2"],
        arch: "x64",
      },
    },
    oauth: {
      runtime: "node",
      routes: [
        "app/api/oauth/authorize/route",
        "app/api/oauth/callback/route",
        "app/api/oauth/token/route",
        "app/api/oauth/userinfo/route",
      ],
      patterns: [
        "api/oauth/authorize",
        "api/oauth/callback",
        "api/oauth/token",
        "api/oauth/userinfo",
      ],
    },
  },
} satisfies OpenNextConfig;

export default config;
export type Config = typeof config;
