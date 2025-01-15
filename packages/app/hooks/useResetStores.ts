import { useOnboardingStore } from "@homefront/app/features/onboarding/stores/onboarding"
import { useInviteStore } from "@homefront/app/features/invites/store"

export const useResetStores = () => {
  const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding)
  const resetInvites = useInviteStore((state) => state.reset)

  const reset = () => {
    resetOnboarding()
    resetInvites()
  }

  return reset;
}
