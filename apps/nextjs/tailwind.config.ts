import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@homefront/tailwind-config/web";
import colors from "@homefront/ui/colors";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [
    ...baseConfig.content,
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../packages/app/components/**/*.{ts,tsx}",
    "../../packages/app/features/**/*.{ts,tsx}",
    "../../packages/app/provider/**/*.{ts,tsx}",
  ],
  presets: [baseConfig, nativewind],
  theme: {
    extend: {
      ...colors,
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        serif: ["var(--font-pt-serif)", ...fontFamily.serif],
        mono: ["var(--font-fira-code)", ...fontFamily.mono],
        header: ["var(--font-oswald)", ...fontFamily.sans],
      },
    },
  },
  important: "html",
} satisfies Config;
