import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@homefront/tailwind-config/native";
import colors from "@homefront/ui/colors";
import { getFontConfig } from "@homefront/ui/getFontConfig";

export default {
  content: [
    ...baseConfig.content,
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../packages/app/components/**/*.{ts,tsx}",
    "../../packages/app/features/**/*.{ts,tsx}",
    "../../packages/app/provider/**/*.{ts,tsx}",
  ],
  presets: [baseConfig, nativewind],
  theme: {
    extend: {
      ...colors,
      fontFamily: getFontConfig("native"),
    },
  },
} satisfies Config;
