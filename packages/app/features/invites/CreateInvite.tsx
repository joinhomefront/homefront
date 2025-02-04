import { useState } from "react";
import { View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@homefront/app/utils/trpc";
import { Button, Form, FormField, FormInput, Text } from "@homefront/ui";

import { useInviteStore } from "./store";

export const CreateInvite = () => {
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const addInvite = useInviteStore((state) => state.addInvite);

  const formSchema = z.object({
    note: z.string().optional(),
  });

  const form = useForm({ resolver: zodResolver(formSchema) });

  const createInvite = api.invites.createInvite.useMutation({
    onSuccess: async (data) => {
      setInviteCode(data.code);
      await Clipboard.setStringAsync(data.code);
      addInvite({ ...data, note: "", sent: false });
      form.reset();
    },
  });

  const handleCreateInvite = async (formData: z.infer<typeof formSchema>) => {
    await createInvite.mutateAsync({});
    if (createInvite.data) {
      addInvite({ ...createInvite.data, note: formData.note, sent: false });
    }
  };

  return (
    <View className="py-4">
      <Form {...form}>
        <View className="gap-y-2">
          <Text className="text-xl">Create an invite</Text>
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormInput placeholder="Add a note (optional)" {...field} />
            )}
          />
          <Button onPress={form.handleSubmit(handleCreateInvite)}>
            <Text>Create Invite</Text>
          </Button>
          {inviteCode && (
            <View>
              <Text>Invite Code: {inviteCode}</Text>
              <Text>
                Invite code copied to clipboard. This invite is single-use and
                will expire in 7 days.
              </Text>
            </View>
          )}
        </View>
      </Form>
    </View>
  );
};
