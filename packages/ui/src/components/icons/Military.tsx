import { createLucideIcon } from "lucide-react-native";

const svgBase = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const Military = createLucideIcon("Military", [
  [
    "svg",
    {
      ...svgBase,
      key: "military-svg",
    },
  ],
  ["path", { d: "M4 8l8-4 8 4", key: "military-path-chevron-1" }],
  ["path", { d: "M4 12l8-4 8 4", key: "military-path-chevron-2" }],
  ["path", { d: "M4 16l8-4 8 4", key: "military-path-chevron-3" }],
  ["path", { d: "M4 16v2c4 4 12 4 16 0v-2", key: "military-path-rocker" }],
]);
