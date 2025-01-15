import baseConfig, { restrictEnvAccess } from "@homefront/eslint-config/base";
import nextjsConfig from "@homefront/eslint-config/nextjs";
import reactConfig from "@homefront/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**", ".sst/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
