import { api } from "@homefront/app/utils/trpc";
import type { Session } from "@homefront/auth";

type SessionData = Session | { data: null } | undefined;

/**
 * Custom hook to get the current user session.
 * @returns {{ user: Session['user'] | null, isLoading: boolean }} The user session and loading state.
 */
export const useUser = (): { user: Session['user'] | null; isLoading: boolean; } => {
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
