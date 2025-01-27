import { View } from "react-native";
import { ExternalLinkIcon } from "lucide-react-native";
import { SolitoImage } from "solito/image";
import { Link } from "solito/link";

import type { DomainArea, Resource, ResourceVote } from "@homefront/db";
import { DomainAreaTags } from "@homefront/app/features/domainAreas/DomainAreaTags";
import { Link as ExternalLink, Text } from "@homefront/ui";

import { CDN_DOMAIN } from "./data";
import { ResourceActions } from "./ResourceActions";
import { ResourceItemHeader } from "./ResourceItemHeader";
import { getBaseDomain } from "./utils";

interface ResourceItemProps {
  resource: Resource & {
    domainAreas: DomainArea[];
    votes: number;
    userVote: ResourceVote | null;
    isBookmarked: boolean;
    sharedByUsername: string;
  };
}

export function ResourceItem({ resource }: ResourceItemProps) {
  return (
    <View className="group/resource relative border-b border-gray-200 py-1">
      {/* Link layer spans the entire container */}
      <Link
        href={`/resources/${resource.id}`}
        viewProps={{
          style: {
            position: "absolute",
            inset: 0,
            paddingVertical: 8,
            zIndex: 0,
          },
        }}
      >
        <View className="h-full w-full" />
      </Link>

      {/* Content layer */}
      <View className="pointer-events-none relative z-10 cursor-pointer rounded-md px-3 py-1 group-hover/resource:bg-gray-100 sm:py-2">
        <ResourceItemHeader resource={resource} className="pb-2" />

        <View className="pointer-events-none w-full flex-row items-start justify-between gap-2 sm:gap-4">
          <View className="pointer-events-none flex-1 gap-0.5">
            <Text className="leading-4.5 pointer-events-none text-sm font-bold sm:text-lg sm:leading-6">
              {resource.title}
            </Text>
            <Text
              className="max-w-prose pt-1 text-xs text-gray-500 sm:text-sm"
              numberOfLines={5}
            >
              {resource.description}
            </Text>

            {resource.url && (
              <View className="flex-1 overflow-hidden">
                <ExternalLink
                  href={resource.url}
                  className="group/external-link flex max-w-fit py-1"
                >
                  <Text
                    className="text-xs font-bold text-primary group-hover/external-link:text-primary-700 group-hover/external-link:underline sm:text-sm"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {resource.url}
                  </Text>
                </ExternalLink>
              </View>
            )}
          </View>
          {resource.image && (
            <View className="group/resource-image relative aspect-square h-20 w-28 overflow-hidden rounded-lg bg-primary-100 sm:aspect-video sm:h-24 sm:w-auto">
              <View className="absolute bottom-1.5 left-1.5 z-10 flex-row items-center gap-1 rounded-full bg-gray-800 bg-opacity-70 p-1 px-2 group-hover/resource-image:bg-primary">
                <ExternalLinkIcon size={12} className="text-white" />
                <Text className="text-[11px] text-white">
                  {resource.url ? getBaseDomain(resource.url) : ""}
                </Text>
              </View>
              {resource.url && (
                <ExternalLink href={resource.url}>
                  <View className="absolute inset-0 blur-lg filter">
                    <SolitoImage
                      src={`${CDN_DOMAIN}/${resource.image}`}
                      alt={resource.title}
                      contentFit="cover"
                      fill
                      sizes="100vw"
                      style={{
                        objectFit: "cover",
                        position: "absolute",
                      }}
                    />
                  </View>
                  <SolitoImage
                    src={`${CDN_DOMAIN}/${resource.image}`}
                    alt={resource.title}
                    contentFit="contain"
                    fill
                    sizes="100vw"
                  />
                </ExternalLink>
              )}
            </View>
          )}
        </View>

        <ResourceActions
          resource={resource}
          className="relative z-10 mt-2 w-full"
        />
      </View>
    </View>
  );
}
