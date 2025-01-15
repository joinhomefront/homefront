// @ts-check
import { fileURLToPath } from "node:url";
import path from "path";
import { withExpo } from "@expo/next-adapter";
import createJiti from "jiti";

const __filename = fileURLToPath(import.meta.url); // Resolve the current file's URL to a path
const __dirname = path.dirname(__filename); // Get the directory name

const outputFileTracingRoot = path.join(__dirname, "../../");

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env");

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  output: "standalone",

  experimental: {
    fallbackNodePolyfills: false,
    outputFileTracingRoot,
    serverComponentsExternalPackages: [
      "@node-rs/argon2",
      "@node-rs/argon2-wasm32-wasi",
    ],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.joinhomefront.org",
      },
    ],
  },

  transpilePackages: [
    "@homefront/api",
    "@homefront/app",
    "@homefront/auth",
    "@homefront/db",
    "@homefront/ui",
    "@homefront/validators",
    "@mgcrea/react-native-dnd",
    "@rn-primitives/accordion",
    "@rn-primitives/alert-dialog",
    "@rn-primitives/aspect-ratio",
    "@rn-primitives/avatar",
    "@rn-primitives/checkbox",
    "@rn-primitives/collapsible",
    "@rn-primitives/context-menu",
    "@rn-primitives/dialog",
    "@rn-primitives/dropdown-menu",
    "@rn-primitives/hover-card",
    "@rn-primitives/label",
    "@rn-primitives/menubar",
    "@rn-primitives/navigation-menu",
    "@rn-primitives/popover",
    "@rn-primitives/portal",
    "@rn-primitives/progress",
    "@rn-primitives/radio-group",
    "@rn-primitives/select",
    "@rn-primitives/separator",
    "@rn-primitives/slot",
    "@rn-primitives/switch",
    "@rn-primitives/table",
    "@rn-primitives/tabs",
    "@rn-primitives/toggle",
    "@rn-primitives/toggle-group",
    "@rn-primitives/tooltip",
    "@rn-primitives/types",
    "expo",
    "expo-clipboard",
    "expo-file-system",
    "expo-location",
    "expo-modules-core",
    "nativewind",
    "react-native",
    "react-native-bouncy-checkbox",
    "react-native-css-interop",
    "react-native-draggable-flatlist",
    "react-native-gesture-handler",
    "react-native-markdown-display",
    "react-native-qrcode-svg",
    "react-native-reanimated",
    "react-native-web",
    "solito",
  ],

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  webpack: (
    /** @type {import('webpack').Configuration} */
    config,
    { isServer },
  ) => {
    // Handle WASM modules
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };
    // Add babel-loader configuration
    // config.module.rules.push({
    //   test: /\.(js|jsx|ts|tsx)$/,
    //   include:
    //     /node_modules\/(react-native-draggable-flatlist|react-native-reanimated)/,
    //   use: [
    //     {
    //       loader: "babel-loader",
    //       options: {
    //         presets: ["next/babel", "@babel/preset-react"],
    //         plugins: [
    //           "@babel/plugin-proposal-export-namespace-from",
    //           "react-native-reanimated/plugin",
    //         ],
    //       },
    //     },
    //   ],
    // });

    if (!isServer) {
      // Client-side substitutions
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...config.resolve.alias,
        "@node-rs/argon2-wasm32-wasi": false,
        "@node-rs/argon2": false,
      };

      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    } else {
      // Server-side handling
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];
      config.module.rules.push({
        test: /\.wasm$/,
        type: "webassembly/async",
      });

      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals.push("@node-rs/argon2");
      } else {
        config.externals = ["@node-rs/argon2"];
      }

      // Explicitly mark WASM as external
      // config.externals = [
      //   ...(config.externals || []),
      //   {
      //     "@node-rs/argon2-wasm32-wasi": "commonjs @node-rs/argon2-wasm32-wasi",
      //   },
      // ];
    }

    return config;
  },
};

export default withExpo(nextConfig);
