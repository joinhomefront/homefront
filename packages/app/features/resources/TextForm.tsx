import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, MarkdownEditor, TextInput } from "@homefront/ui";

const schema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

export function TextForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <View className="space-y-4">
      <TextInput
        label="Title"
        {...form.register("title")}
        error={form.formState.errors.title?.message}
      />
      <MarkdownEditor
        {...form.register("body")}
        error={form.formState.errors.body?.message}
      />
      <Button onPress={form.handleSubmit((data) => console.log(data))}>
        Submit
      </Button>
    </View>
  );
}
