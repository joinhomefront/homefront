import { cache } from "react";
import NextAuth from "next-auth";

import { authConfig } from "./config";

export type { Session, AuthError } from "next-auth";
export type { LoginRequest, LoginResponse } from "./types";
export type { Options as HashOptions } from "@node-rs/argon2";

export { decode } from "next-auth/jwt";

const { handlers, auth: defaultAuth, signIn, signOut } = NextAuth(authConfig);

/**
 * This is the main way to get session data for your RSCs.
 * This will de-duplicate all calls to next-auth's default `auth()` function and only call it once per request
 */
const auth = cache(defaultAuth);

export { handlers, auth, signIn, signOut };

export { invalidateSessionToken } from "./utils/invalidateSessionToken";
export { validateToken } from "./utils/validateToken";

export { authConfig, isSecureContext } from "./config";
