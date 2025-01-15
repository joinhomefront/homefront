import type { AdapterUser } from "next-auth/adapters";
import type { TokenEndpointResponse } from "oauth4webapi";

import type { User } from "@homefront/db";

export interface LoginRequest {
  username: string;
  password: string;
  publicKey: string;
  signingAlgorithm: string;
  totp?: string;
  recoveryCode?: string;
}

export type SanitizedUser = Omit<User, "passwordHash" | "twoFactorSecret">;

export type LoginResponse = SanitizedUser;

export type { User, Session } from "next-auth";

export type { JWT } from "next-auth/jwt";

export type KyselyAdapterUser = AdapterUser &
  Omit<User, "passwordHash" | "twoFactorSecret">;

export type TokenResponse = Partial<TokenEndpointResponse>;
