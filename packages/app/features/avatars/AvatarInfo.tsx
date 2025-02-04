import { View } from "react-native";
import { ExternalLink, RefreshCcw } from "lucide-react-native";
import { SolitoImage } from "solito/image";
import { Link } from "solito/link";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Button, Text } from "@homefront/ui";

import { CDN_DOMAIN } from "./data";

const NOT_PEOPLE = [
  "B-17 Flying Fortress",
  "Lincoln Memorial",
  "Statue of Liberty",
];

export const AvatarInfo = () => {
  const {
    data: avatar,
    isLoading,
    refetch,
    isRefetching,
  } = api.avatars.getRandomAvatar.useQuery();

  const handleRefetch = async () => {
    await refetch();
  };

  const pronoun = NOT_PEOPLE.includes(avatar?.displayName ?? "")
    ? "it"
    : "them";

  return (
    <View key={`avatar-${avatar?.id}`} className="mt-6 w-full max-w-md">
      <View className="w-full rounded-md bg-white p-4 shadow-md shadow-gray-300">
        {!isLoading && avatar ? (
          <View className="relative flex-row gap-x-4">
            <View className="absolute -right-3 -top-3 z-10">
              <Button
                variant="ghost"
                size="sm"
                onPress={handleRefetch}
                className="h-8 w-12"
                disabled={isRefetching}
              >
                {isRefetching ? (
                  <ActivityIndicator size="small" className="text-primary" />
                ) : (
                  <Text className="text-primary">
                    <RefreshCcw size={16} />
                  </Text>
                )}
              </Button>
            </View>
            <View className="h-24 w-24 overflow-hidden rounded-md bg-gray-100">
              <SolitoImage
                src={`${CDN_DOMAIN}/avatars/default/${avatar.filename}`}
                height={96}
                width={96}
                alt={avatar.displayName}
                contentFit="cover"
              />
            </View>
            <View className="flex-1 gap-y-2 pt-1">
              <View>
                <Text className="text-xs text-gray-600">
                  Get inspired by {pronoun}:
                </Text>
                <Text className="font-header-bold text-xl font-bold uppercase text-gray-800">
                  {avatar.displayName}
                </Text>
              </View>

              {avatar.wikipediaUrl && (
                <Link
                  href={avatar.wikipediaUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-description={`Read about ${avatar.displayName} on Wikipedia`}
                >
                  <View className="flex-row items-center gap-x-2">
                    <View className="mt-[2px] h-4">
                      <SolitoImage
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
                        src={require("./wikipedia.svg")}
                        height={16}
                        width={16}
                        alt="Wikipedia"
                      />
                    </View>
                    <Text>
                      <Text className="text-sm text-primary underline hover:text-primary-700">
                        Read about {pronoun} on Wikipedia
                      </Text>{" "}
                      <ExternalLink
                        size={16}
                        className="-mt-[2px] inline align-middle text-primary"
                      />
                    </Text>
                  </View>
                </Link>
              )}
            </View>
          </View>
        ) : (
          <View className="h-24 items-center justify-center">
            <ActivityIndicator className="text-primary" />
          </View>
        )}
      </View>
    </View>
  );
};
