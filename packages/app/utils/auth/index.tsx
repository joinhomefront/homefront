import { getSession, useSession } from "next-auth/react";
import { useRouter } from "solito/navigation";
import { create } from "zustand";

import type { Session } from "@homefront/auth/types";
import { RequestSignUtil } from "@homefront/app/features/auth/RequestSignUtil";
import { useResetStores } from "@homefront/app/hooks/useResetStores";
import { api } from "@homefront/app/utils/trpc";

import { signIn as defaultSignIn, signOut as defaultSignOut } from "./auth";

export { signInWithHomefront } from "./auth";

interface AuthState {
  isSigningOut: boolean;
  setIsSigningOut: (isSigningOut: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isSigningOut: false,
  setIsSigningOut: (isSigningOut: boolean) => set({ isSigningOut }),
}));

export const signIn = (username: string, password: string) => {
  return defaultSignIn(username, password).then(() => getSession());
};

export const useSignIn = () => {
  const utils = api.useUtils();
  const router = useRouter();

  return async (username: string, password: string) => {
    await signIn(username, password)
      .then(async () => await utils.invalidate())
      .then(() => router.replace("/home"))
      .catch((error) => {
        throw error;
      });
  };
};

export const signOut = async () => {
  await defaultSignOut();
};

export const useSignOut = () => {
  const utils = api.useUtils();
  const router = useRouter();
  const resetStores = useResetStores();
  const setIsSigningOut = useAuthStore((state) => state.setIsSigningOut);

  const signOut = async () => {
    setIsSigningOut(true);
    await defaultSignOut()
      .then(async () => {
        await getSession();
        resetStores();
        RequestSignUtil.deleteKeyFromLocalStorage();
        await utils.invalidate();
      })
      .then(async () => {
        router.replace("/login");
        setIsSigningOut(false);
        await Promise.resolve();
      })
      .then(() => setIsSigningOut(false))
      .catch((err) => {
        console.error("Error signing out:", err);
        setIsSigningOut(false);
      });
  };

  return { signOut };
};

type SessionData = Session | { data: null } | undefined;

/**
 * Custom hook to get the current user session.
 * @returns {{ user: Session['user'] | null, isLoading: boolean }} The user session and loading state.
 */
export const useUser = (): {
  user: Session["user"] | null;
  isLoading: boolean;
} => {
  // TODO: fix this when we update to trpc v11
  const { data, isLoading } = api.auth.getSession.useQuery();
  const session: SessionData = data;

  if (isLoading) {
    return { user: null, isLoading };
  }

  if (session && "user" in session) {
    return { user: session.user, isLoading };
  }

  return { user: null, isLoading };
};

export { useSession };
