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

export const Chevron1 = createLucideIcon("Chevron1", [
  [
    "svg",
    {
      ...svgBase,
      key: "chevron-1-svg",
    },
  ],
  ["path", { d: "M4 15l8-6 8 6", key: "chevron-1-path" }],
]);

export const Chevron2 = createLucideIcon("Chevron2", [
  [
    "svg",
    {
      ...svgBase,
      key: "chevron-2-svg",
    },
  ],
  ["path", { d: "M4 13l8-6 8 6", key: "chevron-2-path-1" }],
  ["path", { d: "M4 17l8-6 8 6", key: "chevron-2-path-2" }],
]);

export const Chevron3 = createLucideIcon("Chevron3", [
  [
    "svg",
    {
      ...svgBase,
      key: "chevron-3-svg",
    },
  ],
  ["path", { d: "M4 11l8-6 8 6", key: "chevron-3-path-1" }],
  ["path", { d: "M4 15l8-6 8 6", key: "chevron-3-path-2" }],
  ["path", { d: "M4 19l8-6 8 6", key: "chevron-3-path-3" }],
]);
