import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { useParams } from "solito/navigation";

import { useUser } from "@homefront/app/hooks/useUser";
import { api } from "@homefront/app/utils/trpc";
import { H3, Text } from "@homefront/ui";

import { LinkForm } from "./LinkForm";

export function EditResourceScreen() {
  const { id } = useParams<{ id: string }>();
  const { data: resource, isLoading } = api.resources.getResource.useQuery(id);
  const { user, isLoading: isUserLoading } = useUser();

  if (isLoading || isUserLoading)
    return (
      <SafeAreaView className="w-full flex-1" style={{ flex: 1 }}>
        <ScrollView className="min-h-screen-without-header flex-1 items-center justify-center">
          <ActivityIndicator />
        </ScrollView>
      </SafeAreaView>
    );
  if (!resource) return <Text>Resource not found</Text>;

  const canEdit = user?.id === resource.sharedBy || user?.role === "admin";

  if (!canEdit) {
    return (
      <View className="min-h-screen-without-header flex-1 items-center justify-center">
        <Text>Not authorized</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="w-full flex-1">
        <View className="mx-auto w-full max-w-screen-xl flex-1 justify-center p-4">
          <View className="max-w-prose space-y-8">
            <H3 className="font-header uppercase text-primary">
              Edit resource
            </H3>
            <LinkForm
              initialValues={{
                type: "link",
                url: resource.url ?? "",
                title: resource.title,
                description: resource.description ?? undefined,
                domainAreaIds: resource.domainAreas.map((area) => area.id),
              }}
              resourceId={resource.id}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
