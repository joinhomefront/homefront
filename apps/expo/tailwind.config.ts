import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@homefront/tailwind-config/native";
import colors from "@homefront/ui/colors";

export default {
  content: [
    ...baseConfig.content,
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/index.tsx",
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../packages/app/components/**/*.{ts,tsx}",
    "../../packages/app/features/**/*.{ts,tsx}",
    "../../packages/app/provider/**/*.{ts,tsx}",
  ],
  presets: [baseConfig, nativewind],
  theme: {
    extend: {
      ...colors,
    },
  },
} satisfies Config;
