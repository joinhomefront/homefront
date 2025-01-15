import type { DefaultSession, User as NextAuthUser } from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";

import type { KyselyAdapterUser } from "../src/types";

declare module "next-auth" {
  interface Session {
    user: KyselyAdapterUser & DefaultSession["user"] & { id: string };
  }

  interface User extends NextAuthUser {
    id: string;
    username: string;
    role: string;
    emailVerified: Date | null;
    requiresTwoFactor?: boolean;
    miniSession?: string;
    publicKey?: string;
  }
}

declare module "next-auth/adapters" {
  interface User extends NextAuthUser {
    id: string;
    username: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    id: string;
    user: { id: string; username: string; role: string };
    access_token?: string;
    expires_at: number;
    refresh_token?: string;
  }
}

export type { KyselyAdapterUser };

export type * from "next-auth";
export type * from "next-auth/adapters";
export type * from "next-auth/jwt";
