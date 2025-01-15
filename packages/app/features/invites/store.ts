import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Invite {
  id: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  used: boolean;
  expiresAt: Date;
  note?: string | undefined;
  sent?: boolean;
}

interface InviteState {
  invites: Invite[];
  setInvites: (invites: Invite[]) => void;
  mergeInvites: (apiInvites: Invite[]) => void;
  addInvite: (invite: Invite) => void;
  updateInvite: (id: string, updates: Partial<Invite>) => void;
  reset: () => void;
}

export const useInviteStore = create<InviteState>()(
  persist(
    (set) => ({
      invites: [],
      setInvites: (invites) => set({ invites }),
      mergeInvites: (apiInvites) =>
        set((state) => {
          // Merge API invites with local invites
          const mergedInvites = apiInvites.map((apiInvite) => {
            const localInvite = state.invites.find(
              (invite) => invite.id === apiInvite.id,
            );

            return localInvite
              ? { ...apiInvite, ...localInvite } // Merge fields, prioritizing local data
              : apiInvite; // Add new invites from the API
          });

          // Retain any local invites not in the API response
          const additionalInvites = state.invites.filter(
            (invite) =>
              !apiInvites.some((apiInvite) => apiInvite.id === invite.id),
          );

          return { invites: [...mergedInvites, ...additionalInvites] };
        }),

      addInvite: (invite) =>
        set((state) => ({ invites: [...state.invites, invite] })),
      updateInvite: (id, updates) =>
        set((state) => ({
          invites: state.invites.map((invite) =>
            invite.id === id ? { ...invite, ...updates } : invite,
          ),
        })),

      reset: () => set({ invites: [] }),
    }),
    {
      name: "invite-storage",
    },
  ),
);
