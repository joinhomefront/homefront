import type { CredentialsConfig } from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";

import type { LoginResponse } from "../types";
import { env } from "../../env";

export default Credentials({
  id: "session-creator",
  name: "SessionCreator",
  type: "credentials",
  credentials: {},

  authorize(credentials: { verifiedUser?: string; secret?: string }) {
    if (credentials.secret !== env.AUTH_SESSION_CREATOR_SECRET) {
      throw new Error("Invalid secret");
    }

    const verifiedUser = credentials.verifiedUser;

    if (!verifiedUser || typeof verifiedUser !== "string") {
      throw new Error("Missing verified user data");
    }

    const user = JSON.parse(verifiedUser) as LoginResponse;

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
      name: user.name,
      image: user.image,
      emailVerified: user.emailVerified,
    };
  },
}) satisfies CredentialsConfig;
