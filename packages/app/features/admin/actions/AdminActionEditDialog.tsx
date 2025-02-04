"use client";

import { useState } from "react";
import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Trash2 } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { Action, ActionType } from "@homefront/db";
import { api } from "@homefront/app/utils/trpc";
import { ACTION_STATUSES, ACTION_TYPES } from "@homefront/db";
import {
  ActivityIndicator,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
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

// Update the form schema to match CreateDialog
const formSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
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

interface AdminActionEditDialogProps {
  action: Action;
}

export function AdminActionEditDialog({ action }: AdminActionEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const utils = api.useUtils();

  const type = ACTION_OPTIONS.find((opt) => opt.value === action.type) as {
    label: string;
    value: ActionType;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: action.title,
      description: action.description ?? "",
      body: action.body ?? "",
      // Map the type string to an object matching the schema
      type: { label: type.value, value: type.value },
      status: action.status as (typeof ACTION_STATUSES)[number] | undefined,
      dueDate: action.dueDate,
      isDueDateOverridable: action.isDueDateOverridable,
      dueTime: action.dueTime,
      isDueTimeOverridable: action.isDueTimeOverridable,
    },
  });

  const {
    formState: { isValid },
  } = form;

  const updateAction = api.actions.updateAction.useMutation({
    onSuccess: () => {
      void utils.actions.getAllActions.invalidate();
      setIsOpen(false);
    },
  });

  const deleteAction = api.actions.deleteAction.useMutation({
    onSuccess: () => {
      void utils.actions.getAllActions.invalidate();
      setShowDeleteDialog(false);
      setIsOpen(false);
    },
  });

  // Update the handleSubmit function
  const handleSubmit = form.handleSubmit(async (data) => {
    return await updateAction.mutateAsync({
      id: action.id,
      ...data,
      type: data.type.value,
    });
  });

  const handleDelete = async () => {
    await deleteAction.mutateAsync({ id: action.id });
  };

  const submitDisabled = !isValid || updateAction.isPending;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Edit2 size={20} className="text-gray-500" />
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-96">
          <DialogHeader>
            <DialogTitle>Edit Action</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <View className="gap-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => <FormInput label="Title" {...field} />}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormTextarea
                    label="Description"
                    {...field}
                    value={field.value ?? ""}
                  />
                )}
              />

              {/* Update the form fields to match CreateDialog */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormSelect label="Type" {...field}>
                    <SelectTrigger>
                      <SelectValue
                        className="native:text-base text-sm text-foreground"
                        placeholder="Select type"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {ACTION_OPTIONS.map(({ label, value }) => (
                          <SelectItem
                            key={value}
                            value={value}
                            label={label}
                            className="flex-row items-center gap-x-2"
                          >
                            {label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </FormSelect>
                )}
              />

              <View className="flex-row justify-between gap-x-2">
                <Button
                  variant="destructive"
                  onPress={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="mr-2" size={20} />
                  <Text>Delete</Text>
                </Button>
                <View className="flex-row gap-x-2">
                  <Button variant="outline" onPress={() => setIsOpen(false)}>
                    <Text>Cancel</Text>
                  </Button>
                  <Button onPress={handleSubmit} disabled={submitDisabled}>
                    {updateAction.isPending ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text>Save</Text>
                    )}
                  </Button>
                </View>
              </View>
            </View>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this action? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <View className="flex-row justify-end gap-x-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onPress={handleDelete}
              disabled={deleteAction.isPending}
            >
              {deleteAction.isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text>Delete</Text>
              )}
            </AlertDialogAction>
          </View>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
