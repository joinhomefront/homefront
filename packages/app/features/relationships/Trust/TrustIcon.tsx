import {
  Shield,
  ShieldEllipsis,
  ShieldQuestion,
  ShieldX,
} from "lucide-react-native";

import { TrustLevel } from "../types";

interface TrustIconProps {
  trustLevel: TrustLevel | null;
  relationshipStatus: string;
  size?: number;
}

export function TrustIcon({
  trustLevel,
  relationshipStatus,
  size = 16,
}: TrustIconProps) {
  return (
    <>
      {relationshipStatus === "trusted" && (
        <>
          {trustLevel === TrustLevel.Complete && (
            <Shield size={size} className="text-primary-800" />
          )}
          {trustLevel === TrustLevel.High && (
            <Shield size={size} className="text-primary-700" />
          )}
          {trustLevel === TrustLevel.Somewhat && (
            <Shield size={size} className="text-primary-600" />
          )}
          {trustLevel === TrustLevel.A_Little && (
            <Shield size={size} className="text-primary-500" />
          )}
          {trustLevel === TrustLevel.Dont_Know && (
            <ShieldQuestion size={size} className="text-primary-400" />
          )}
        </>
      )}

      {relationshipStatus === "pending_trust" && (
        <ShieldEllipsis size={size} className="text-gray-400" />
      )}

      {relationshipStatus === "blocked" && (
        <ShieldX size={size} className="text-destructive" />
      )}
    </>
  );
}
