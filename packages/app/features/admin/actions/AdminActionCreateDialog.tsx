"use client";

import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@homefront/app/utils/trpc";
import { ACTION_STATUSES, ACTION_TYPES } from "@homefront/db";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormField,
  FormInput,
  FormSelect,
  FormTextarea,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
} from "@homefront/ui";

const ACTION_OPTIONS = [
  { label: "Personal", value: "personal" },
  { label: "Group", value: "group" },
  { label: "Local", value: "local" },
  { label: "Regional", value: "regional" },
  { label: "National", value: "national" },
  { label: "Global", value: "global" },
];

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  body: z.string().nullable(),
  type: z.object({
    label: z.string(),
    value: z.enum(ACTION_TYPES),
  }),
  status: z.enum(ACTION_STATUSES).nullable(),
  dueDate: z.date().nullable(),
  isDueDateOverridable: z.boolean().nullable(),
  dueTime: z.date().nullable(),
  isDueTimeOverridable: z.boolean().nullable(),
});

export function AdminActionCreateDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      body: "",
      type: { label: "personal", value: "personal" },
      status: null,
      dueDate: null,
      isDueDateOverridable: null,
      dueTime: null,
      isDueTimeOverridable: null,
    },
  });

  const {
    formState: { isValid },
  } = form;

  const createAction = api.actions.createAction.useMutation({
    onSuccess: () => {
      void utils.actions.getAllActions.invalidate();
      setIsOpen(false);
      form.reset();
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await createAction.mutateAsync({ ...data, type: data.type.value });
  });

  const submitDisabled = !isValid || createAction.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2" />
          <Text>Create Action</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-96">
        <DialogHeader>
          <DialogTitle>Create New Action</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <View className="gap-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormInput
                  label="Title"
                  placeholder="Action title"
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormTextarea
                  label="Description"
                  placeholder="Action description"
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormSelect
                  label="Type"
                  {...field}
                  defaultValue={{ label: "personal", value: "personal" }}
                >
                  <SelectTrigger>
                    <SelectValue
                      className="native:text-base text-sm text-foreground"
                      placeholder="Select type"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {ACTION_OPTIONS.map(({ label, value }) => (
                        <SelectItem key={value} value={value} label={label}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </FormSelect>
              )}
            />

            <View className="flex-row justify-end gap-x-2">
              <Button variant="outline" onPress={() => setIsOpen(false)}>
                <Text>Cancel</Text>
              </Button>
              <Button onPress={handleSubmit} disabled={submitDisabled}>
                {createAction.isPending ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text>Create</Text>
                )}
              </Button>
            </View>
          </View>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
