import { Award, Egg, Flame, TrendingUp } from "lucide-react-native";

import { ButtonInnerIcon } from "@homefront/ui";

import { ResourceSort } from "./types";

interface ResourceSortsIconProps {
  sort: ResourceSort;
  className?: string;
}

export function ResourceSortsIcon({ sort, className }: ResourceSortsIconProps) {
  switch (sort) {
    case "hot":
      return <ButtonInnerIcon icon={Flame} size={16} className={className} />;
    case "new":
      return <ButtonInnerIcon icon={Egg} size={16} className={className} />;
    case "rising":
      return (
        <ButtonInnerIcon icon={TrendingUp} size={16} className={className} />
      );
    case "top":
      return <ButtonInnerIcon icon={Award} size={16} className={className} />;
  }
}
