import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldQuestion } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@homefront/app/utils/trpc";
import {
  Button,
  cn,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormField,
  FormRadioGroup,
  Label,
  RadioGroupItem,
  Text,
} from "@homefront/ui";

import type { Friend, Relationship } from "../types";
import { TrustLevel } from "../types";
import { TrustIcon } from "./TrustIcon";

const trustOptions = [
  {
    value: TrustLevel.Dont_Know,
    label: "Don't know",
    description: "I don't know them well enough to say if I trust them.",
  },
  {
    value: TrustLevel.A_Little,
    label: "A little",
    description: "I know them a little or trust them in only some situations.",
  },
  {
    value: TrustLevel.Somewhat,
    label: "Somewhat",
    description: "I know them fairly well and trust them somewhat.",
  },
  {
    value: TrustLevel.High,
    label: "High",
    description: "I know them well and trust them in most situations.",
  },
  {
    value: TrustLevel.Complete,
    label: "Complete",
    description: "I know them very well and trust them completely.",
  },
];

interface TrustDialogProps {
  relationship: Relationship;
  friend: Friend;
}

export const TrustDialog = ({ relationship, friend }: TrustDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const utils = api.useUtils();

  const updateRelationship = api.relationships.updateRelationship.useMutation({
    onSuccess: () => {
      setIsOpen(false);
      void utils.relationships.getRelationships.invalidate();
    },
  });

  const trustLevelSchema = z.object({
    trustLevel: z.number().int().min(1).max(5),
  });

  type TrustFormData = z.infer<typeof trustLevelSchema>;

  const form = useForm<TrustFormData>({
    resolver: zodResolver(trustLevelSchema),
    defaultValues: {
      trustLevel: relationship.trustLevel ?? undefined,
    },
  });

  const {
    formState: { isValid },
  } = form;

  const handleUpdateTrust = (data: TrustFormData) => {
    updateRelationship.mutate({
      id: relationship.id,
      status: "trusted",
      trustLevel: data.trustLevel,
    });
  };

  const cancelDisabled = updateRelationship.isPending;
  const submitDisabled = !isValid || updateRelationship.isPending;

  const height = Dimensions.get("window").height;

  return (
    <Form {...form}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Text className="text-xs">
              {relationship.trustLevel ? "Update trust" : "Set trust"}
            </Text>
          </Button>
        </DialogTrigger>
        <SafeAreaView className="w-full flex-1" style={{ flex: 1 }}>
          <DialogContent style={{ maxHeight: height - 16 }}>
            <ScrollView
              className="mt-4"
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <View className="gap-4">
                <DialogHeader>
                  <View className="items-center py-4 text-primary">
                    <ShieldQuestion size={64} />
                  </View>

                  <DialogTitle className="text-center">
                    Your trust in @{friend.username}
                  </DialogTitle>
                  <DialogDescription className="text-center text-gray-600">
                    How much do you trust @{friend.username}?
                  </DialogDescription>
                </DialogHeader>
                <FormField
                  control={form.control}
                  name="trustLevel"
                  render={({ field }) => {
                    return (
                      <FormRadioGroup
                        {...field}
                        value={String(field.value)}
                        onChange={(value) => field.onChange(Number(value))}
                        className="!mt-0 gap-0"
                      >
                        {trustOptions.map((option, index) => (
                          <View
                            key={option.value}
                            className={cn(
                              "border border-gray-200 p-4",
                              Number(field.value) === Number(option.value) && [
                                "border-primary bg-primary-foreground",
                                "z-10", // Ensure selected item appears above others
                              ],
                              index === 0 && "rounded-t-lg",
                              index === trustOptions.length - 1 &&
                                "rounded-b-lg",
                              index !== 0 && "-mt-px", // Overlap borders
                              "transition-colors duration-200",
                            )}
                          >
                            <View className="flex-row items-center gap-x-5">
                              <RadioGroupItem
                                aria-labelledby={`label-for-${option.value}`}
                                value={String(option.value)}
                                id={String(option.value)}
                              />
                              <Label
                                nativeID={`label-for-${option.value}`}
                                onPress={() =>
                                  field.onChange(Number(option.value))
                                }
                                className="hover:cursor-pointer"
                              >
                                <View className="gap-y-1">
                                  <View className="flex-row items-center gap-x-2">
                                    <TrustIcon
                                      trustLevel={option.value}
                                      relationshipStatus="trusted"
                                    />
                                    <Text
                                      className={cn(
                                        Number(field.value) ===
                                          Number(option.value)
                                          ? "font-bold text-primary"
                                          : "font-medium text-foreground",
                                      )}
                                    >
                                      {option.label}
                                    </Text>
                                  </View>

                                  <Text
                                    className={cn(
                                      "text-sm",
                                      Number(field.value) ===
                                        Number(option.value)
                                        ? "text-primary-500"
                                        : "text-gray-500",
                                    )}
                                  >
                                    {option.description}
                                  </Text>
                                </View>
                              </Label>
                            </View>
                          </View>
                        ))}
                      </FormRadioGroup>
                    );
                  }}
                />
              </View>
            </ScrollView>
            <View className="flex-row justify-between gap-x-2">
              <Button
                variant="outline"
                onPress={() => setIsOpen(false)}
                disabled={cancelDisabled}
              >
                <Text>Cancel</Text>
              </Button>
              <Button
                onPress={form.handleSubmit(handleUpdateTrust)}
                disabled={submitDisabled}
              >
                {updateRelationship.isPending ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text>Save</Text>
                )}
              </Button>
            </View>
          </DialogContent>
        </SafeAreaView>
      </Dialog>
    </Form>
  );
};
