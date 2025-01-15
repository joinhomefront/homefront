import { z } from "zod";

import type { LoginRequest } from "@homefront/auth";
import { getBaseUrl } from "@homefront/app/utils/base-url";
import { deleteToken, setToken } from "@homefront/app/utils/session-store";

const TokenSchema = z.object({
  token: z.string(),
});

// Sign in function for native Expo
export const signIn = async (
  username: string,
  password: string,
  totp?: string,
  recoveryCode?: string,
) => {
  const signInUrl = `${getBaseUrl()}/api/auth/login`;

  const request: LoginRequest = { username, password, totp, recoveryCode };

  const response = await fetch(signInUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) throw new Error("Login failed");

  const result = await TokenSchema.parseAsync(await response.json());
  const token = result.token;
  await setToken(token); // Store JWT securely in SecureStore

  return true;
};

export const signInWithHomefront = async () => {
  return Promise.resolve();
};

// Sign out function for native Expo
export const signOut = async () => {
  await deleteToken();
};
