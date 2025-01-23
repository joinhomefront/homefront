import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Dropzone, TextInput } from "@homefront/ui";

const schema = z.object({
  title: z.string().min(1),
  media: z.array(z.any()).min(1),
});

export function MediaForm() {
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
      <Dropzone
        {...form.register("media")}
        error={form.formState.errors.media?.message}
      />
      <Button onPress={form.handleSubmit((data) => console.log(data))}>
        Submit
      </Button>
    </View>
  );
}
