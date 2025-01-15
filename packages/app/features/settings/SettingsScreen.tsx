"use client";

import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import { AvatarPicker } from "@homefront/app/features/avatars/AvatarPicker";
import { useUser } from "@homefront/app/utils/auth";
import { ActivityIndicator, Button, H3, H4, Text } from "@homefront/ui";

import { ChangePassword } from "./ChangePassword";
import { TwoFactorSetup } from "./TwoFactorSetup";

export function SettingsScreen() {
  const { user, isLoading: isUserLoading } = useUser();
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);

  if (isUserLoading || !user) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-1">
        <ScrollView className="w-full flex-1">
          <View className="mx-auto w-full max-w-screen-xl flex-1 justify-center p-4">
            <View className="max-w-prose space-y-8">
              <H3 className="font-header uppercase text-primary">
                Account and password
              </H3>
              <View className="space-y-4">
                <View className="flex-row items-center">
                  <View className="w-full max-w-60 flex-row">
                    <Text className="text-sm font-bold">Username</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-sm">{user.username}</Text>
                  </View>
                </View>

                <View className="flex-col items-start gap-y-2 lg:flex-row">
                  <View className="w-full max-w-60 flex-row">
                    <Text className="text-sm font-bold">Photo</Text>
                  </View>
                  <View className="w-full flex-row items-center">
                    <AvatarPicker
                      currentImage={user.image}
                      username={user.username}
                    />
                  </View>
                </View>

                <View className="flex-row items-center">
                  <View className="w-full max-w-60 flex-row">
                    <Text className="text-sm font-bold">Password</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onPress={() => setIsPasswordChangeOpen(true)}
                    >
                      <Text>Change password</Text>
                    </Button>

                    <ChangePassword
                      isOpen={isPasswordChangeOpen}
                      onClose={() => setIsPasswordChangeOpen(false)}
                    />
                  </View>
                </View>
              </View>
              <View className="space-y-4">
                <View className="space-y-2">
                  <H4 className="font-header uppercase text-primary">
                    Two-factor authentication
                  </H4>
                  <Text className="text-sm text-gray-500">
                    Add an extra layer of security to your account. You'll need
                    to enter a verification code with 2FA when signing in.
                  </Text>
                </View>

                <View className="space-y-4">
                  <View className="flex-row items-center">
                    <View className="w-full max-w-60 flex-row">
                      <Text className="text-sm font-bold">
                        Two-factor authentication
                      </Text>
                    </View>

                    <TwoFactorSetup
                      userId={user.id}
                      isTwoFactorEnabled={user.twoFactorEnabled}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
