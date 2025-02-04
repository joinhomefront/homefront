import type { ViewProps } from "react-native";
import { useState } from "react";
import { View } from "react-native";
import { Edit, Flag, MoreHorizontal } from "lucide-react-native";
import { Link } from "solito/link";

import type { DomainArea, Resource, ResourceVote } from "@homefront/db";
import { DomainAreaTags } from "@homefront/app/features/domainAreas/DomainAreaTags";
import { useUser } from "@homefront/app/hooks/useUser";
import dayjs from "@homefront/dayjs";
import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Text,
} from "@homefront/ui";

import { ReportDialog } from "../reports/ReportDialog";

interface ResourceItemHeaderProps {
  resource: Resource & {
    domainAreas: DomainArea[];
    votes: number;
    userVote: ResourceVote | null;
    isBookmarked: boolean;
  };
}

export const ResourceItemHeader = ({
  resource,
  className,
  ...props
}: ResourceItemHeaderProps & ViewProps) => {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const { user } = useUser();
  const canEdit =
    user?.id === resource.sharedBy ||
    user?.role === "admin" ||
    user?.role === "moderator";

  return (
    <>
      <View
        className={cn("flex-row items-start justify-between gap-2", className)}
        {...props}
      >
        <Text className="mt-1 py-1 text-xs text-gray-500">
          {dayjs(resource.createdAt).fromNow()}
        </Text>

        <DomainAreaTags
          domainAreas={resource.domainAreas}
          className="mt-1 flex-1"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="pointer-events-auto h-8 w-8 rounded-full bg-transparent p-0 hover:bg-gray-300 active:bg-gray-400"
            >
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {canEdit && (
              <Link href={`/resources/${resource.id}/edit`}>
                <DropdownMenuItem>
                  <View className="flex-row items-center gap-x-2">
                    <Edit size={16} className="text-primary" />
                    <Text className="text-primary">Edit</Text>
                  </View>
                </DropdownMenuItem>
              </Link>
            )}
            <DropdownMenuItem onPress={() => setReportDialogOpen(true)}>
              <View className="flex-row items-center gap-x-2">
                <Flag size={16} className="text-primary" />
                <Text className="text-primary">Report</Text>
              </View>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </View>
      <ReportDialog
        type="resource"
        id={resource.id}
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
      />
    </>
  );
};
