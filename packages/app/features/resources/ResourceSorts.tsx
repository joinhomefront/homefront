import { useState } from "react";
import { View } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { Link } from "solito/link";
import { usePathname, useSearchParams } from "solito/navigation";

import {
  Button,
  ButtonInnerIcon,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Text,
} from "@homefront/ui";

import type { ResourceSort } from "./types";
import { RESOURCE_SORTS } from "./data";
import { ResourceSortsIcon } from "./ResourceSortsIcon";

export function ResourceSorts() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<ResourceSort>(
    (searchParams?.get("sort") as ResourceSort | undefined) ?? "hot",
  );
  const activeLabel = RESOURCE_SORTS.find((s) => s.key === currentSort)?.label;

  return (
    <View className="px-3 pb-2">
      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline-neutral" size="xs" hasIcon>
            <ResourceSortsIcon sort={currentSort} />
            <Text className="text-sm font-medium">{activeLabel}</Text>
            {isOpen ? (
              <ButtonInnerIcon
                icon={ChevronUp}
                size={16}
                className="text-gray-500"
              />
            ) : (
              <ButtonInnerIcon
                icon={ChevronDown}
                size={16}
                className="text-gray-500"
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            {RESOURCE_SORTS.map((sort) => (
              <Link
                key={sort.key}
                href={`${pathname}?sort=${sort.key}`}
                className="block"
              >
                <DropdownMenuItem onPress={() => setCurrentSort(sort.key)}>
                  <View className="flex-row items-center gap-x-2">
                    <ResourceSortsIcon
                      sort={sort.key}
                      className={cn(sort.key === currentSort && "text-primary")}
                    />
                    <Text
                      className={cn(sort.key === currentSort && "text-primary")}
                    >
                      {sort.label}
                    </Text>
                  </View>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </View>
  );
}
