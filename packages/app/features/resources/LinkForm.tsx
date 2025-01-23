import { useEffect, useState } from "react";
import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "solito/navigation";
import { useDebounceValue } from "usehooks-ts";
import { z } from "zod";

import type { Metadata } from "@homefront/scraper";
import { api } from "@homefront/app/utils/trpc";
import { Button, Form, FormField, FormInput, Input, Text } from "@homefront/ui";
import {
  formatUrl,
  isValidTopLevelDomain,
  isValidUrlWithoutProtocol,
  LinkResourceSchema,
} from "@homefront/validators";

type FormData = z.infer<typeof LinkResourceSchema>;

export function LinkForm() {
  const { push } = useRouter();

  const form = useForm<FormData>({
    defaultValues: {
      type: "link",
    },
    resolver: zodResolver(LinkResourceSchema),
    mode: "onChange",
  });

  const [urlToCheck, setUrlToCheck] = useState<string>("");
  const [debouncedUrl] = useDebounceValue(urlToCheck, 500);
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  const getMetadataForUrl = api.resources.getMetadataForUrl.useMutation({
    onSuccess: (data) => {
      setMetadata(data);
    },
  });

  const createResource = api.resources.createResource.useMutation({
    onSuccess: (data) => {
      push(`/resources/${data.id}`);
    },
  });

  useEffect(() => {
    if (
      debouncedUrl &&
      !form.formState.errors.url &&
      !form.getValues("title")
    ) {
      void getMetadataForUrl.mutateAsync({ url: debouncedUrl });
    }
  }, [debouncedUrl]);

  useEffect(() => {
    if (metadata?.title) {
      form.setValue("title", metadata.title, { shouldValidate: true });
    }
  }, [metadata, form.setValue]);

  const url = form.watch("url");

  useEffect(() => {
    if (urlToCheck !== url) {
      setUrlToCheck(url);
    }
  }, [url]);

  const onSubmit = (data: FormData) => {
    createResource.mutate(data);
  };

  return (
    <View className="space-y-4">
      <Form {...form}>
        <View className="space-y-6">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormInput
                label="Link URL"
                placeholder="Link URL"
                {...field}
                onChange={(value: string) => {
                  if (
                    isValidUrlWithoutProtocol(value) &&
                    isValidTopLevelDomain(value)
                  ) {
                    const formattedValue = formatUrl(value);
                    field.onChange(formattedValue);
                    setUrlToCheck(formattedValue);
                  } else {
                    field.onChange(value);
                    setUrlToCheck(value);
                  }
                }}
              />
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormInput label="Title" placeholder="Title" {...field} />
            )}
          />
          <View className="flex-row justify-end">
            <Button size="lg" onPress={form.handleSubmit(onSubmit)}>
              <Text>Submit</Text>
            </Button>
          </View>
        </View>
      </Form>
    </View>
  );
}
