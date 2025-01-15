import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

import { api } from "@homefront/app/utils/trpc";

export function useCheckUsernameAvailability(username: string) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [debouncedUsername] = useDebounceValue<string>(username, 700);

  const { refetch: fetchUsernameAvailability } =
    api.users.checkUsernameAvailability.useQuery(
      { username: debouncedUsername },
      { enabled: false, retry: false },
    );

  useEffect(() => {
    if (debouncedUsername.length < 3) {
      setIsAvailable(null);
      setIsChecking(false);
      return;
    }

    setIsChecking(true);

    fetchUsernameAvailability()
      .then((response) => {
        setIsAvailable(response.data?.available ?? false);
      })
      .catch((error) => {
        console.error(`Error checking username availability for "${debouncedUsername}":`, error);
        setIsAvailable(null);
      })
      .finally(() => {
        setIsChecking(false);
      });
  }, [debouncedUsername]);

  return { isAvailable, isChecking };
}
