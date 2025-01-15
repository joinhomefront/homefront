import { usernameSchema } from "@homefront/validators";

export const isUsernameBlacklisted = (username: string): boolean => {
  try {
    usernameSchema.parse(username);
    return false;
  } catch {
    return true;
  }
};
