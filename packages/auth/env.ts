import { createEnv } from "@t3-oss/env-nextjs";
// import { Resource } from "sst";
import { z } from "zod";

// const secrets = {
//   AUTH_CHALLENGE_ENCRYPTION_KEY: Resource.AuthChallengeEncryptionKey.value,
//   AUTH_HOMEFRONT_ID: Resource.AuthHomefrontClientId.value,
//   AUTH_HOMEFRONT_SECRET: Resource.AuthHomefrontClientSecret.value,
//   AUTH_SALT: Resource.AuthSalt.value,
//   AUTH_SECRET: Resource.AuthSecret.value,
//   OTP_ENCRYPTION_KEY: Resource.OtpEncryptionKey.value,
// };

export const env = createEnv({
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },

  server: {
    AUTH_CHALLENGE_ENCRYPTION_KEY: z.string().min(1),
    AUTH_HOMEFRONT_ID: z.string().min(1),
    AUTH_HOMEFRONT_SECRET: z.string().min(1),
    AUTH_MINI_SESSION_ENCRYPTION_KEY: z.string().min(1),
    AUTH_SALT: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
    AUTH_SESSION_CREATOR_SECRET: z.string().min(1),
    NEXT_RUNTIME: z.string().optional(),
    OTP_ENCRYPTION_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
