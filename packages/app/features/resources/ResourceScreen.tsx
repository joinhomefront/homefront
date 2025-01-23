"use client";

import { SafeAreaView, ScrollView, View } from "react-native";
import { ExternalLink } from "lucide-react-native";
import { SolitoImage } from "solito/image";
import { useParams } from "solito/navigation";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Button, H2, Link, Text } from "@homefront/ui";

import { CDN_DOMAIN } from "./data";
import { ResourceActions } from "./ResourceActions";

interface Params extends Record<string, string> {
  id: string;
}

export function ResourceScreen() {
  const { id } = useParams<Params>();
  const { data: resource, isLoading } = api.resources.getResource.useQuery(id);

  if (isLoading || !resource) {
    return (
      <SafeAreaView className="w-full flex-1" style={{ flex: 1 }}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <View className="mx-auto w-full max-w-screen-xl flex-1 justify-center p-4">
            <View className="max-w-prose space-y-4">
              <H2 className="text-2xl font-bold">{resource.title}</H2>

              <View className="rounded-md bg-gray-100">
                {resource.url && (
                  <Link href={resource.url}>
                    <View className="h-96 w-full overflow-hidden rounded-t-md bg-gray-100">
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
                <View className="flex-row items-center justify-between gap-4 px-4 py-2">
                  {resource.url && (
                    <View className="flex-1 overflow-hidden">
                      <Link href={resource.url} className="flex">
                        <Text
                          className="text-sm font-bold text-primary"
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

              <ResourceActions resource={resource} />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
