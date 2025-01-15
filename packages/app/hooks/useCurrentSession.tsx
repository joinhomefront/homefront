"use server";

import { auth } from "@homefront/auth";

export const useCurrentSession = async () => {
  const session = await auth();
  return session;
};
