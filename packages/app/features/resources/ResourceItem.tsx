import { View } from "react-native";
import { SolitoImage } from "solito/image";
import { Link } from "solito/link";

import type { DomainArea, Resource, ResourceVote } from "@homefront/db";
import { Text } from "@homefront/ui";

import { CDN_DOMAIN } from "./data";
import { ResourceActions } from "./ResourceActions";

interface ResourceItemProps {
  resource: Resource & {
    domainAreas: DomainArea[];
    votes: number;
    userVote: ResourceVote | null;
    isBookmarked: boolean;
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
      <View className="pointer-events-none relative z-10 cursor-pointer rounded-md px-3 py-2 group-hover/resource:bg-gray-100">
        <View className="pointer-events-none w-full flex-row items-start justify-between gap-4">
          <View className="pointer-events-none flex-1">
            <Text className="pointer-events-none text-lg font-bold">
              {resource.title}
            </Text>
            <Text
              className="max-w-prose pt-1 text-sm text-gray-500"
              numberOfLines={1}
            >
              {resource.description}
            </Text>
          </View>
          <View className="aspect-video h-24 overflow-hidden rounded-md bg-gray-100">
            <View
              style={{
                position: "absolute",
                inset: 0,
                filter: "blur(20px)",
              }}
            >
              <SolitoImage
                src={`${CDN_DOMAIN}/${resource.image}`}
                alt={resource.title}
                contentFit="cover"
                fill
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
            />
          </View>
        </View>

        <ResourceActions
          resource={resource}
          className="relative z-10 mt-2 w-full"
        />
      </View>
    </View>
  );
}
