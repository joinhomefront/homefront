import type { RESOURCE_SORTS, TABS } from "./data";

export type Tab = (typeof TABS)[number];

export type ResourceFilter = "saved" | "upvoted" | "downvoted" | "shared";

export type ResourceSort = (typeof RESOURCE_SORTS)[number]["key"];
