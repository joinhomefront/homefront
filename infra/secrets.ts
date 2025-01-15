const authChallengeEncryptionKey = new sst.Secret("AuthChallengeEncryptionKey");
const authHomefrontClientId = new sst.Secret("AuthHomefrontClientId");
const authHomefrontClientSecret = new sst.Secret("AuthHomefrontClientSecret");
const authMiniSessionEncryptionKey = new sst.Secret(
  "AuthMiniSessionEncryptionKey",
);
const authSalt = new sst.Secret("AuthSalt");
const authSecret = new sst.Secret("AuthSecret");
const authSessionCreatorSecret = new sst.Secret("AuthSessionCreatorSecret");
const databaseUrl = new sst.Secret("DatabaseUrl");
const dbEncryptionKey = new sst.Secret("DbEncryptionKey");
const oauthEncryptionKey = new sst.Secret("OauthEncryptionKey");
const oauthSecret = new sst.Secret("OauthSecret");
const otpEncryptionKey = new sst.Secret("OtpEncryptionKey");
const pineconeApiKey = new sst.Secret("PineconeApiKey");
const stripeHashKey = new sst.Secret("StripeHashKey");
const stripeSecretKey = new sst.Secret("StripeSecretKey");
const stripeWebhookSecret = new sst.Secret("StripeWebhookSecret");

export {
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
};
