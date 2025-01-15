import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { signIn, signOut, useUser } from "@homefront/app/utils/auth";

function MobileAuth() {
  const { user } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Text className="pb-2 text-center text-xl font-semibold text-white">
        {user?.username ?? "Not logged in"}
      </Text>
      {/* TODO: Replace with sign in form */}
      <TextInput
        className="items-center rounded-md border border-input bg-background px-3 text-lg leading-[1.25] text-foreground"
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />

      <TextInput
        className="items-center rounded-md border border-input bg-background px-3 text-lg leading-[1.25] text-foreground"
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />

      <Button
        onPress={() => (user ? signOut() : signIn(username, password))}
        title={user ? "Sign Out" : "Sign In With Discord"}
        color={"#5B65E9"}
      />
    </>
  );
}

export default function Index() {
  return (
    <SafeAreaView className="bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full bg-background p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          Create <Text className="text-primary">T3</Text> Turbo
        </Text>

        <MobileAuth />
      </View>
    </SafeAreaView>
  );
}
