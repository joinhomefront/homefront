"use client";

import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { Link } from "solito/link";
import { useParams, useRouter } from "solito/navigation";
import { z } from "zod";

import { UserAvatar } from "@homefront/app/features/avatars/UserAvatar";
import { useUser } from "@homefront/app/utils/auth";
import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Button, Text } from "@homefront/ui";

interface Params extends Record<string, string> {
  code: string;
}

export function InvitesScreen() {
  const { code } = useParams<Params>();
  const { data: invite, isLoading } = api.invites.getInvite.useQuery({ code });

  const { user, isLoading: isUserLoading } = useUser();
  const { push } = useRouter();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-redirect if not logged in
  useEffect(() => {
    if (!isLoading && !isUserLoading && !user) {
      push(`/signup?redirect=/invites/${code}`);
    }

    if (user && code) {
      form.setValue("code", code);
      form.setValue("inviteeId", user.id);
      void form.trigger();
    }
  }, [user, isLoading, code]);

  const formSchema = z.object({
    code: z.string().min(8),
    inviteeId: z.string().uuid(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { code, inviteeId: user?.id },
    reValidateMode: "onChange",
  });

  const {
    formState: { errors, isValid },
  } = form;

  const acceptInvite = api.invites.acceptInvite.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      push("/home");
    },
    onError: (error) => {
      console.error("Failed to accept invite:", error);
      form.setError("root", {
        message: "Something went wrong. Please try again.",
      });
    },
    onSettled: () => {
      setIsAccepting(false);
    },
  });

  const handleAcceptInvite = () => {
    if (user && code) {
      setIsAccepting(true);
      acceptInvite.mutate({ code, inviteeId: user.id });
    }
  };

  if (isLoading || !user) {
    return (
      <SafeAreaView className="w-full flex-1" style={{ flex: 1 }}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  if (!invite) {
    return (
      <SafeAreaView className="w-full flex-1" style={{ flex: 1 }}>
        <View className="flex-1 items-center justify-center gap-y-4 p-4">
          <Text className="text-center text-lg">
            This invite link is invalid.
          </Text>
          <Link href="/home">
            <Button variant="outline">
              <Text>Go home</Text>
            </Button>
          </Link>
        </View>
      </SafeAreaView>
    );
  }

  const isExpired = new Date(invite.expiresAt) < new Date();
  const isUsed = invite.used;

  // Show error if invite is expired or used
  if (isExpired || isUsed) {
    return (
      <SafeAreaView className="w-full flex-1" style={{ flex: 1 }}>
        <View className="flex-1 items-center justify-center gap-y-4 p-4">
          <Text className="text-center text-lg">
            {isExpired
              ? "This invite has expired."
              : "This invite has already been used."}
          </Text>
          <Link href="/home">
            <Button variant="outline">
              <Text>Go home</Text>
            </Button>
          </Link>
        </View>
      </SafeAreaView>
    );
  }

  // Show message if user created this invite
  if (user.id === invite.userId) {
    return (
      <SafeAreaView className="w-full flex-1" style={{ flex: 1 }}>
        <View className="flex-1 items-center justify-center gap-y-4 p-4">
          <Text className="text-center text-lg">
            This is your invite. You cannot accept your own invite.
          </Text>
          <Link href="/home">
            <Button variant="outline">
              <Text>Go home</Text>
            </Button>
          </Link>
        </View>
      </SafeAreaView>
    );
  }

  // Check if there are any field errors, excluding the root error
  const hasFieldErrors = !isValid && !errors.root;
  const submitDisabled = isAccepting || hasFieldErrors;

  return (
    <SafeAreaView className="w-full flex-1" style={{ flex: 1 }}>
      <ScrollView
        className="w-full flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="mx-auto h-auto w-full max-w-screen-sm flex-1 items-center justify-center p-4">
          <View className="mb-6 items-center rounded-md border border-primary bg-primary-foreground p-4">
            <View className="flex-row items-center justify-center gap-x-2">
              <UserAvatar
                user={{ username: invite.username, image: invite.image }}
              />
              <View className="flex-1 flex-row flex-wrap items-center justify-start gap-x-1">
                <Text className="flex-wrap text-left text-sm text-primary">
                  <Text className="text-sm font-bold text-primary">
                    @{invite.username}
                  </Text>{" "}
                  has invited you to join them on Homefront.
                </Text>
              </View>
            </View>
          </View>
          <View className="gap-y-4">
            <Text className="text-center text-gray-600">
              Accept this invite to connect with @{invite.username}
            </Text>

            {errors.root && (
              <View className="mb-6 rounded-md border border-destructive bg-destructive-foreground p-3">
                <Text className="text-sm text-destructive">
                  {errors.root.message}
                </Text>
              </View>
            )}

            <Button onPress={handleAcceptInvite} disabled={submitDisabled}>
              {!isSuccess && <Check size={24} />}
              {isAccepting && <ActivityIndicator color="white" />}
              {!isAccepting && !isSuccess && <Text>Accept invite</Text>}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
