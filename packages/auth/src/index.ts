import NextAuth from "next-auth";

import { authConfig } from "./config";

export type { Session, AuthError } from "next-auth";
export type { LoginRequest, LoginResponse } from "./types";
export type { Options as HashOptions } from "@node-rs/argon2";

export { decode } from "next-auth/jwt";

const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export { handlers, auth, signIn, signOut };

export { invalidateSessionToken } from "./utils/invalidateSessionToken";
export { validateToken } from "./utils/validateToken";

export { authConfig, isSecureContext } from "./config";
