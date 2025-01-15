import type { Profile } from "@auth/core/types";
import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

import type { User } from "@homefront/db";
import { env } from "@homefront/auth/env";

import { getBaseUrl } from "../utils/base-url";

export default function HomefrontProvider<P extends User>(
  _options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: "homefront",
    name: "Homefront",
    type: "oauth",
    issuer: "homefront",
    clientId: env.AUTH_HOMEFRONT_CLIENT_ID,
    clientSecret: env.AUTH_HOMEFRONT_CLIENT_SECRET,
    authorization: `${getBaseUrl()}/api/oauth/authorize`,
    token: `${getBaseUrl()}/api/oauth/token`,
    userinfo: `${getBaseUrl()}/api/oauth/userinfo`,
    checks: ["state", "pkce"],
    profile: async (profile: User) => {
      return Promise.resolve({
        id: profile.id,
        name: profile.name,
        email: profile.email,
        emailVerified: profile.emailVerified,
        image: profile.image,
        username: profile.username,
        role: profile.role,
      } satisfies Profile);
    },
  };
}
