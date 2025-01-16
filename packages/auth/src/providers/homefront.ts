import type { Profile } from "@auth/core/types";
import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

import type { User } from "@homefront/db";
import { env } from "@homefront/auth/env";

export default function HomefrontProvider<P extends User>(
  _options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: "homefront",
    name: "Homefront",
    type: "oauth",
    issuer: "homefront",
    clientId: env.AUTH_HOMEFRONT_ID,
    clientSecret: env.AUTH_HOMEFRONT_SECRET,
    authorization: `${env.NEXT_PUBLIC_BASE_URL}/api/oauth/authorize`,
    token: `${env.NEXT_PUBLIC_BASE_URL}/api/oauth/token`,
    userinfo: `${env.NEXT_PUBLIC_BASE_URL}/api/oauth/userinfo`,
    checks: ["state", "pkce"],
    client: {
      token_endpoint_auth_method: "client_secret_post",
    },
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
