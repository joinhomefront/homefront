import type { RelationshipStatus } from "../types";
import { TrustLevel } from "../types";

export const getTrustText = ({
  trustLevel,
  relationshipStatus,
}: {
  trustLevel: TrustLevel | null;
  relationshipStatus: RelationshipStatus;
}): string => {
  switch (relationshipStatus) {
    case "trusted":
      if (!trustLevel) {
        return getTrustedText(TrustLevel.Dont_Know);
      }
      return getTrustedText(trustLevel);
    case "pending_trust":
      return "Pending";
    case "blocked":
      return "Blocked";
  }
};

const getTrustedText = (trustLevel: TrustLevel) => {
  switch (trustLevel) {
    case TrustLevel.Complete:
      return "Complete";
    case TrustLevel.High:
      return "High";
    case TrustLevel.Somewhat:
      return "Somewhat";
    case TrustLevel.A_Little:
      return "A little";
    case TrustLevel.Dont_Know:
      return "Don't know";
  }
};
