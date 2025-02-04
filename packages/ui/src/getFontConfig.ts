export const getFontConfig = (platform: "web" | "native") => {
  if (platform === "web") {
    return {
      sans: [`var(--font-inter)`, "system-ui", "sans-serif"],
      "sans-medium": [`var(--font-inter)`, "system-ui", "sans-serif"],
      "sans-bold": [`var(--font-inter)`, "system-ui", "sans-serif"],
      header: [`var(--font-oswald)`, "system-ui", "sans-serif"],
      "header-medium": [`var(--font-oswald)`, "system-ui", "sans-serif"],
      "header-bold": [`var(--font-oswald)`, "system-ui", "sans-serif"],
      mono: [`var(--font-fira-code)`, "monospace"],
      "mono-medium": [`var(--font-fira-code)`, "monospace"],
      "mono-bold": [`var(--font-fira-code)`, "monospace"],
      serif: [`var(--font-pt-serif)`, "serif"],
      "serif-bold": [`var(--font-pt-serif)`, "serif"],
    };
  }

  return {
    sans: ["Inter-Regular"],
    "sans-medium": ["Inter-Medium"],
    "sans-bold": ["Inter-Bold"],
    header: ["Oswald-Regular"],
    "header-medium": ["Oswald-Medium"],
    "header-bold": ["Oswald-Bold"],
    mono: ["FiraCode-Regular"],
    "mono-medium": ["FiraCode-Medium"],
    "mono-bold": ["FiraCode-Bold"],
    serif: ["PTSerif-Regular"],
    "serif-bold": ["PTSerif-Bold"],
  };
};
