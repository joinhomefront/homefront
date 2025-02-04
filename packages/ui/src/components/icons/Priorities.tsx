import { createLucideIcon } from "lucide-react-native";

import colors from "../../colors";

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

const secondary600 = colors.secondary[600];
const secondary500 = colors.secondary[500];
const secondary400 = colors.secondary[400];
const primary600 = colors.primary[600];
const primary500 = colors.primary[500];
const primary400 = colors.primary[400];
const gray400 = colors.gray[400];
const amber500 = colors.amber[500];

export const PriorityCritical = createLucideIcon("PriorityCritical", [
  ["svg", { ...svgBase, key: "priority-critical-svg" }],
  [
    "path",
    {
      d: "M6 10l6-6 6 6v10l-6-6-6 6V10z",
      stroke: secondary600,
      fill: secondary600,
      key: "chevron-3-solid-path",
    },
  ],
]);

export const PriorityMajor = createLucideIcon("PriorityMajor", [
  ["svg", { ...svgBase, key: "priority-major-svg" }],
  [
    "path",
    {
      d: "M6 10l6-6 6 6",
      key: "priority-major-chevron-1",
      stroke: secondary600,
    },
  ],
  [
    "path",
    {
      d: "M6 15l6-6 6 6",
      key: "priority-major-chevron-2",
      stroke: secondary500,
    },
  ],
  [
    "path",
    {
      d: "M6 20l6-6 6 6",
      key: "priority-major-chevron-3",
      stroke: secondary400,
    },
  ],
]);

export const PriorityHighest = createLucideIcon("PriorityHighest", [
  ["svg", { ...svgBase, key: "priority-highest-svg" }],
  [
    "path",
    {
      d: "M6 12l6-6 6 6",
      key: "priority-highest-chevron-1",
      stroke: secondary600,
    },
  ],
  [
    "path",
    {
      d: "M6 18l6-6 6 6",
      key: "priority-highest-chevron-2",
      stroke: secondary500,
    },
  ],
]);

export const PriorityHigh = createLucideIcon("PriorityHigh", [
  ["svg", { ...svgBase, key: "priority-high-svg" }],
  [
    "path",
    { d: "M6 15l6-6 6 6", key: "priority-high-chevron", stroke: secondary600 },
  ],
]);

export const PriorityMedium = createLucideIcon("PriorityMedium", [
  ["svg", { ...svgBase, key: "priority-medium-svg" }],
  [
    "path",
    {
      d: "M6 9h12",
      key: "priority-medium-line-1",
      stroke: amber500,
    },
  ],
  ["path", { d: "M6 15h12", key: "priority-medium-line-2", stroke: amber500 }],
]);

export const PriorityLow = createLucideIcon("PriorityLow", [
  ["svg", { ...svgBase, key: "priority-low-svg" }],
  [
    "path",
    { d: "M6 9l6 6 6-6", key: "priority-low-chevron", stroke: primary600 },
  ],
]);

export const PriorityLowest = createLucideIcon("PriorityLowest", [
  ["svg", { ...svgBase, key: "priority-lowest-svg" }],
  [
    "path",
    {
      d: "M6 6l6 6 6-6",
      key: "priority-lowest-chevron-1",
      stroke: primary500,
    },
  ],
  [
    "path",
    {
      d: "M6 12l6 6 6-6",
      key: "priority-lowest-chevron-2",
      stroke: primary600,
    },
  ],
]);

export const PriorityMinor = createLucideIcon("PriorityMinor", [
  ["svg", { ...svgBase, key: "priority-minor-svg" }],
  [
    "path",
    { d: "M6 4l6 6 6-6", key: "priority-minor-chevron-1", stroke: primary400 },
  ],
  [
    "path",
    { d: "M6 9l6 6 6-6", key: "priority-minor-chevron-2", stroke: primary500 },
  ],
  [
    "path",
    { d: "M6 14l6 6 6-6", key: "priority-minor-chevron-3", stroke: primary600 },
  ],
]);

export const PriorityTrivial = createLucideIcon("PriorityTrivial", [
  ["svg", { ...svgBase, key: "priority-trivial-svg" }],
  [
    "circle",
    {
      cx: "12",
      cy: "12",
      r: "6",
      fill: "none",
      stroke: gray400,
      strokeWidth: "2",
      key: "priority-trivial-circle",
    },
  ],
]);

export const PriorityBlocker = createLucideIcon("PriorityBlocker", [
  ["svg", { ...svgBase, key: "priority-blocker-svg" }],
  [
    "circle",
    {
      cx: "12",
      cy: "12",
      r: "6",
      fill: secondary600,
      stroke: secondary600,
      strokeWidth: "2",
      key: "priority-blocker-circle",
    },
  ],
  [
    "path",
    {
      d: "M9 12h6",
      key: "priority-blocker-line",
      stroke: "white",
    },
  ],
]);
