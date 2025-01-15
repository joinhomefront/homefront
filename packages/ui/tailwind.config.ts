import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@homefront/tailwind-config/native";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig, nativewind],
  important: "html",
} satisfies Config;
