import {
  AuthorizationServer,
  DateInterval,
  JwtService,
} from "@jmondi/oauth2-server";

import {
  oauthAuthCodeRepository,
  oauthClientRepository,
  oauthScopeRepository,
  oauthTokenRepository,
  oauthUserRepository,
} from "./repositories";

if (!process.env.OAUTH_SECRET) {
  throw new Error("OAUTH_SECRET is required");
}

const signingSecret = process.env.OAUTH_SECRET;
const jwtService = new JwtService(signingSecret);

const authorizationServer = new AuthorizationServer(
  oauthClientRepository,
  oauthTokenRepository,
  oauthScopeRepository,
  jwtService,
  {
    requiresPKCE: true,
    requiresS256: true,
  },
);

authorizationServer.enableGrantTypes(
  [
    {
      grant: "authorization_code",
      authCodeRepository: oauthAuthCodeRepository,
      userRepository: oauthUserRepository,
    },
    new DateInterval("1m"),
  ],
  ["refresh_token", new DateInterval("1m")],
  ["client_credentials", new DateInterval("1m")],
);

export { authorizationServer };
