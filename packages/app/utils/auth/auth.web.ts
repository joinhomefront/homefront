"use server";

import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "@homefront/auth";

// Sign in function for web
export const signIn = async (username: string, password: string) => {
  return nextAuthSignIn("credentials", {
    username,
    password,
  });
};

export const signInWithHomefront = async () => {
  return nextAuthSignIn("homefront");
};

// Sign out function for web
export const signOut = async (): Promise<unknown> => {
  return nextAuthSignOut({ redirect: false });
};
