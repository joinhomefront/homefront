"use client";

import { SafeAreaView, ScrollView, View } from "react-native";
import { ExternalLink, LibrarySquare } from "lucide-react-native";
import { SolitoImage } from "solito/image";
import { useParams } from "solito/navigation";

import { NotFound } from "@homefront/app/components/NotFound";
import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Button, H2, H3, Link, Text } from "@homefront/ui";

import { CDN_DOMAIN } from "./data";
import { ResourceActions } from "./ResourceActions";
import { ResourceItemHeader } from "./ResourceItemHeader";

interface Params extends Record<string, string> {
  id: string;
}

export function ResourceScreen() {
  const { id } = useParams<Params>();
  const { data: resource, isLoading } = api.resources.getResource.useQuery(id);

  if (isLoading) {
    return (
      <SafeAreaView className="w-full flex-1" style={{ flex: 1 }}>
        <View className="min-h-screen-without-header flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  if (!resource) {
    return <NotFound />;
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <View className="mx-auto w-full max-w-screen-xl flex-1 justify-center px-0 py-4 sm:px-4">
            <View className="max-w-prose space-y-2">
              <View className="px-3 sm:px-0">
                <View className="flex-row items-center gap-1">
                  <LibrarySquare size={20} className="mt-[1px] text-primary" />
                  <H3 className="font-header text-base font-bold uppercase text-primary">
                    Resource
                  </H3>
                </View>

                <ResourceItemHeader resource={resource} className="py-2" />

                <H2 className="p-0 text-lg font-bold sm:text-2xl">
                  {resource.title}
                </H2>
              </View>
              <View className="bg-gray-100 sm:rounded-md">
                {resource.url && resource.image && (
                  <Link href={resource.url}>
                    <View className="aspect-video h-auto overflow-hidden bg-gray-100 sm:h-96 sm:w-full sm:rounded-t-md">
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
                  </Link>
                )}
                <View className="flex-row items-center justify-between gap-4 px-3 py-2 sm:px-4">
                  {resource.url && (
                    <View className="flex-1 overflow-hidden">
                      <Link
                        href={resource.url}
                        className="group/external-link flex max-w-fit"
                      >
                        <Text
                          className="text-sm font-bold text-primary group-hover/external-link:text-primary-700 group-hover/external-link:underline"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {resource.url}
                        </Text>
                      </Link>
                    </View>
                  )}
                  {resource.url && (
                    <View>
                      <Link href={resource.url}>
                        <Button hasIcon size="sm" variant="default">
                          <Text>Open</Text>
                          <ExternalLink size={16} className="text-white" />
                        </Button>
                      </Link>
                    </View>
                  )}
                </View>
              </View>

              <View className="space-y-2 px-3 sm:px-0">
                <Text className="pt-1 text-xs text-gray-500 sm:text-sm">
                  {resource.description}
                </Text>

                <ResourceActions resource={resource} className="py-1" />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
