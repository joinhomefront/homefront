import type { z } from "zod";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "solito/navigation";
import { useDebounceValue } from "usehooks-ts";

import type { Metadata } from "@homefront/scraper";
import { DomainAreaSelector } from "@homefront/app/features/domainAreas/DomainAreasSelector";
import { api } from "@homefront/app/utils/trpc";
import {
  ActivityIndicator,
  Button,
  Form,
  FormField,
  FormInput,
  FormTextarea,
  Text,
} from "@homefront/ui";
import {
  formatUrl,
  isValidTopLevelDomain,
  isValidUrlWithoutProtocol,
  LinkResourceSchema,
} from "@homefront/validators";

type FormData = z.infer<typeof LinkResourceSchema>;

interface LinkFormProps {
  initialValues?: FormData;
  resourceId?: string;
}

export function LinkForm({ initialValues, resourceId }: LinkFormProps) {
  const { push } = useRouter();
  const form = useForm<FormData>({
    defaultValues: initialValues ?? { type: "link" },
    resolver: zodResolver(LinkResourceSchema),
    mode: "onChange",
  });
  const utils = api.useUtils();

  const [urlToCheck, setUrlToCheck] = useState<string>("");
  const [debouncedUrl] = useDebounceValue(urlToCheck, 500);
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getMetadataForUrl = api.resources.getMetadataForUrl.useMutation({
    onSuccess: (data) => {
      setMetadata(data);
    },
  });

  const createResource = api.resources.createResource.useMutation({
    onSuccess: async (data) => {
      await utils.resources.getResources.invalidate();
      push(`/resources/${data.id}`);
    },
    onError: (error) => {
      setError(error.message);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const updateResource = api.resources.updateResource.useMutation({
    onSuccess: async (data) => {
      await utils.resources.getResources.invalidate();
      await utils.resources.getResource.invalidate(data.id);

      push(`/resources/${data.id}`);
    },
    onError: (error) => {
      setError(error.message);
    },
    onSettled: () => {
      setIsSubmitting(false);
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

    if (metadata?.description) {
      form.setValue("description", metadata.description, {
        shouldValidate: true,
      });
    }
  }, [metadata, form.setValue]);

  const url = form.watch("url");

  useEffect(() => {
    if (urlToCheck !== url) {
      setUrlToCheck(url);
    }
  }, [url]);

  const onSubmit = async (data: FormData) => {
    setError(null);
    setIsSubmitting(true);

    if (resourceId) {
      await updateResource.mutateAsync({ ...data, id: resourceId });
    } else {
      await createResource.mutateAsync(data);
    }
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
              <FormInput {...field} label="Title" placeholder="Title" />
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormTextarea
                {...field}
                label="Description"
                placeholder="Description"
                multiline
                numberOfLines={3}
                value={field.value ?? ""}
              />
            )}
          />
          <FormField
            control={form.control}
            name="domainAreaIds"
            render={({ field }) => (
              <DomainAreaSelector
                label="Topics"
                selectedIds={field.value ?? []}
                onChange={(ids) => field.onChange(ids)}
              />
            )}
          />

          {error && (
            <View className="rounded-md bg-red-50 p-4">
              <Text className="text-sm text-red-800">{error}</Text>
            </View>
          )}

          <View className="flex-row justify-end">
            <Button
              size="lg"
              onPress={form.handleSubmit(onSubmit)}
              disabled={isSubmitting || !form.formState.isValid}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text>Submit</Text>
              )}
            </Button>
          </View>
        </View>
      </Form>
    </View>
  );
}
