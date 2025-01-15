import type { Provider } from "next-auth/providers";

import { getBaseUrl } from "../utils/base-url";

export default function SecondFactor(): Provider {
  return {
    id: "second-factor",
    name: "second-factor",
    type: "credentials",
    credentials: {
      miniSession: { type: "text" },
      totp: { type: "text" },
      recoveryCode: { type: "text" },
    },
    async authorize(credentials) {
      const res = await fetch(`${getBaseUrl()}/api/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) return null;
      return res.json();
    },
  };
}
