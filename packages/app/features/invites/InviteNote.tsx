import { useState } from "react";
import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckSquare, SquarePen } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Form, FormField, FormInput, Text } from "@homefront/ui";

interface InviteNoteProps {
  note: string | undefined;
  onChange: (note: string | undefined) => void;
}

export const InviteNote = ({ note, onChange }: InviteNoteProps) => {
  const [isEditingNote, setIsEditingNote] = useState(false);

  const formSchema = z.object({
    note: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleEditNote = () => {
    setIsEditingNote(true);
  };

  const handleSave = ({ note }: z.infer<typeof formSchema>) => {
    setIsEditingNote(false);
    onChange(note);
  };

  return (
    <View className="py-2">
      <Form {...form}>
        {isEditingNote ? (
          <View className="flex-row items-center justify-between gap-x-2">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <View className="flex-1">
                  <FormInput placeholder="Add a note" {...field} />
                </View>
              )}
            />
            <Button
              className="group flex-row items-center gap-x-2"
              onPress={form.handleSubmit(handleSave)}
            >
              <CheckSquare size={16} className="text-white" />
              <Text className="text-sm">Save</Text>
            </Button>
          </View>
        ) : (
          <>
            {note ? (
              <View className="flex-row items-center justify-between">
                <Text className="px-3 text-base text-gray-800">{note}</Text>
                <Button
                  variant="ghost"
                  className="group flex-row items-center gap-x-2 text-gray-500"
                  onPress={handleEditNote}
                >
                  <SquarePen size={16} />
                  <Text className="text-sm text-gray-500 group-hover:text-primary">
                    Edit
                  </Text>
                </Button>
              </View>
            ) : (
              <View className="flex-row items-center justify-end">
                <Button
                  variant="ghost"
                  className="group flex-row items-center gap-x-2 text-gray-500"
                  onPress={handleEditNote}
                >
                  <SquarePen size={16} />
                  <Text className="text-sm text-gray-500 group-hover:text-primary">
                    Add note
                  </Text>
                </Button>
              </View>
            )}
          </>
        )}
      </Form>
    </View>
  );
};
