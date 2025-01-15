import { LexoRank } from "lexorank";

import type { ActionType} from "@homefront/db";

export function getLabelForActionType(type: ActionType) {
  switch (type) {
    case "personal":
      return "Personal";
    case "group":
      return "Group";
    case "local":
      return "Local";
    case "regional":
      return "Regional";
    case "national":
      return "National";
    case "global":
      return "Global";
  }
}

export const generateNewRank = (
  prevItem: { position: string } | undefined,
  nextItem: { position: string } | undefined,
  currentItem: { position: string },
) => {
  if (prevItem && nextItem) {
    const prevRank = LexoRank.parse(prevItem.position);
    const nextRank = LexoRank.parse(nextItem.position);
    return prevRank.between(nextRank);
  } 
  
  if (prevItem) {
    return LexoRank.parse(prevItem.position).genNext();
  } 
  
  if (nextItem) {
    return LexoRank.parse(nextItem.position).genPrev();
  }
  
  return LexoRank.parse(currentItem.position);
};
