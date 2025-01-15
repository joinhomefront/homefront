import { NextjsArgs } from "../.sst/platform/src/components/aws";
import { redis } from "./redis";
import {
  authChallengeEncryptionKey,
  authHomefrontClientId,
  authHomefrontClientSecret,
  authMiniSessionEncryptionKey,
  authSalt,
  authSecret,
  authSessionCreatorSecret,
  databaseUrl,
  dbEncryptionKey,
  oauthEncryptionKey,
  oauthSecret,
  otpEncryptionKey,
  pineconeApiKey,
  stripeHashKey,
  stripeSecretKey,
  stripeWebhookSecret,
} from "./secrets";
import { bucket } from "./storage";
import { vpc } from "./vpc";

const NEXT_PUBLIC_PROTOMAPS_API_KEY =
  $app.stage === "production"
    ? "ee193b83dd403554"
    : $app.stage === "staging"
      ? "2ebf4d8aba6389db"
      : $app.stage === "development"
        ? "24e00888a08a4602"
        : "24e00888a08a4602";

const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =
  $app.stage === "production"
    ? "pk_live_51M2od6AP7ad2n1gsojfoFM49gdz9HkzryKpSysSVEEm0nXFdbYuB3jXDZNvloszarPlj7Kw9l3mTTeTELb3snxTL00Y6LonSRx"
    : $app.stage === "staging"
      ? "pk_test_51QhI4SPGWExku2vZbzzEXhLVRJjup3T14TIkPRWWiYrabEUxBjbI0bfFED1b1AO7k5aEXJLwSYUTQISBcZgLU9E300u5S9VJey"
      : $app.stage === "development"
        ? "pk_test_51QerVvPOdNhIDrxaVUk4fwmNOrsYNW7z974S8RpVcijgttdc9m1gvVLfodK3Vn9FMsbaRnXXndofwVEkQVFZW8S3004hs8zXy7"
        : "pk_test_51QerVvPOdNhIDrxaVUk4fwmNOrsYNW7z974S8RpVcijgttdc9m1gvVLfodK3Vn9FMsbaRnXXndofwVEkQVFZW8S3004hs8zXy7";

const NEXT_PUBLIC_STRIPE_BILLING_RETURN_URL =
  $app.stage === "production"
    ? "https://www.joinhomefront.org/donations"
    : $app.stage === "staging"
      ? "https://staging.joinhomefront.org/donations"
      : $app.stage === "development"
        ? "https://d1a1w7ulyz8ubg.cloudfront.net/donations"
        : "http://localhost:3000/donations";

const NEXT_PUBLIC_BASE_URL =
  $app.stage === "production"
    ? "https://www.joinhomefront.org"
    : $app.stage === "staging"
      ? "https://staging.joinhomefront.org"
      : $app.stage === "development"
        ? "https://d1a1w7ulyz8ubg.cloudfront.net"
        : "http://localhost:3000";

function getDomain(): NextjsArgs["domain"] | undefined {
  switch ($app.stage) {
    // case "development":
    //   return {
    //     name: "d2elw01hjwbm6a.cloudfront.net",
    //     dns: sst.aws.dns(),
    //   };
    case "staging":
      return {
        name: "staging.joinhomefront.org",
        dns: sst.cloudflare.dns(),
      };
    case "production":
      return {
        name: "joinhomefront.org",
        dns: sst.cloudflare.dns(),
      };
    default:
      return undefined;
  }
}

export const nextjs = new sst.aws.Nextjs("Web", {
  buildCommand:
    "pnpm build:sst && pnpm kysely migrate:latest --cwd ../../packages/db",
  path: "apps/nextjs",
  domain: getDomain(),
  transform: {
    server: {
      nodejs: {
        install: ["@node-rs/argon2-linux-x64-gnu", "@node-rs/argon2"],
      },
    },
  },
  link: [
    bucket,
    redis,

    // Secrets
    authMiniSessionEncryptionKey,
    authChallengeEncryptionKey,
    authHomefrontClientId,
    authHomefrontClientSecret,
    authSalt,
    authSecret,
    authSessionCreatorSecret,
    databaseUrl,
    dbEncryptionKey,
    pineconeApiKey,
    oauthSecret,
    oauthEncryptionKey,
    otpEncryptionKey,
    stripeHashKey,
    stripeSecretKey,
    stripeWebhookSecret,
  ],
  environment: {
    NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_PROTOMAPS_API_KEY,
    NEXT_PUBLIC_STRIPE_BILLING_RETURN_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    AUTH_CHALLENGE_ENCRYPTION_KEY: authChallengeEncryptionKey.value,
    AUTH_HOMEFRONT_CLIENT_ID: authHomefrontClientId.value,
    AUTH_HOMEFRONT_CLIENT_SECRET: authHomefrontClientSecret.value,
    AUTH_MINI_SESSION_ENCRYPTION_KEY: authMiniSessionEncryptionKey.value,
    AUTH_SALT: authSalt.value,
    AUTH_SECRET: authSecret.value,
    AUTH_SESSION_CREATOR_SECRET: authSessionCreatorSecret.value,
    AUTH_TRUST_HOST: "true",
    DATABASE_URL: databaseUrl.value,
    DB_ENCRYPTION_KEY: dbEncryptionKey.value,
    PINECONE_API_KEY: pineconeApiKey.value,
    OAUTH_SECRET: oauthSecret.value,
    OAUTH_ENCRYPTION_KEY: oauthEncryptionKey.value,
    OTP_ENCRYPTION_KEY: otpEncryptionKey.value,
    STRIPE_HASH_KEY: stripeHashKey.value,
    STRIPE_SECRET_KEY: stripeSecretKey.value,
    STRIPE_WEBHOOK_SECRET: stripeWebhookSecret.value,
  },
  vpc,
});

sst.Linkable.wrap(sst.aws.Nextjs, (nextjs) => ({
  properties: {
    ...nextjs,
    url: nextjs.url,
  },
}));
