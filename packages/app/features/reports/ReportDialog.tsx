import { useEffect, useState } from "react";
import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { ReportReason } from "@homefront/db";
import { api } from "@homefront/app/utils/trpc";
import { REPORT_REASONS } from "@homefront/db";
import {
  ActivityIndicator,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Form,
  FormField,
  FormTextarea,
  Text,
} from "@homefront/ui";

const reportOptionsMap = {
  rules: {
    label: "Breaks community rules",
    description:
      "Content that violates our community guidelines and standards.",
  },
  harassment: {
    label: "Harassment",
    description:
      "Behavior that intimidates, bullies, or discourages participation.",
  },
  violence: {
    label: "Threatening violence",
    description:
      "Content that promotes or threatens violence against people or groups.",
  },
  hate_speech: {
    label: "Hate",
    description: "Content promoting hate based on identity or vulnerability.",
  },
  misinformation: {
    label: "Misinformation",
    description: "False or misleading information that could cause harm.",
  },
  disinformation: {
    label: "Disinformation",
    description:
      "Intentionally misleading information to deceive or manipulate.",
  },
  spam: {
    label: "Spam",
    description: "Unwanted promotional content or repetitive posting.",
  },
  inappropriate: {
    label: "Inappropriate content",
    description: "Content that violates community standards of decency.",
  },
  self_harm: {
    label: "Self-harm or suicide",
    description: "Content that encourages or glorifies self-harm or suicide.",
  },
  other: {
    label: "Other",
    description: "Other issues not covered by the above categories",
  },
} as const;

const reportOptions = REPORT_REASONS.map((reason) => ({
  value: reason,
  ...reportOptionsMap[reason],
}));

const schema = z.object({
  reason: z.enum(REPORT_REASONS),
  details: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface ReportDialogProps {
  type: "resource";
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReportDialog({
  type,
  id,
  open,
  onOpenChange,
}: ReportDialogProps) {
  const [step, setStep] = useState<"reason" | "details">("reason");
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      reason: undefined,
      details: "",
    },
  });

  const createReport = api.reports.createReport.useMutation({
    onSuccess: () => {
      onOpenChange(false);
      setStep("reason");
      setSelectedReason(null);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleReasonSelect = (reason: ReportReason) => {
    setSelectedReason(reason);
    form.setValue("reason", reason);
  };

  const handleNext = () => {
    if (selectedReason) {
      setStep("details");
    }
  };

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    createReport.mutate({
      type,
      id,
      reason: data.reason,
      details: data.details?.trim() ?? null,
    });
  };

  useEffect(() => {
    if (!open) {
      setSelectedReason(null);
      setStep("reason");
      form.reset();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="!mt-0">
      <DialogContent className="max-w-full md:w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit a report</DialogTitle>
        </DialogHeader>

        {step === "reason" ? (
          <View className="gap-y-4">
            <View className="flex-row flex-wrap gap-2">
              {reportOptions.map((reason) => (
                <Button
                  key={reason.value}
                  variant={
                    selectedReason === reason.value
                      ? "outline"
                      : "outline-neutral"
                  }
                  size="sm"
                  onPress={() => handleReasonSelect(reason.value)}
                  className=""
                >
                  <Text>{reason.label}</Text>
                </Button>
              ))}
            </View>

            <View className="flex-row items-end justify-between gap-4">
              {selectedReason ? (
                <View className="flex-1 flex-wrap">
                  <Text className="font-medium">
                    {reportOptionsMap[selectedReason].label}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {reportOptionsMap[selectedReason].description}
                  </Text>
                </View>
              ) : (
                <Text className="self-center text-sm text-gray-500">
                  Select a reason to continue
                </Text>
              )}
              <Button size="sm" onPress={handleNext} disabled={!selectedReason}>
                <Text>Next</Text>
              </Button>
            </View>
          </View>
        ) : (
          <Form {...form}>
            <View className="gap-y-4">
              <View>
                <Text className="font-medium">
                  {selectedReason ? reportOptionsMap[selectedReason].label : ""}
                </Text>
                <Text className="text-sm text-gray-500">
                  {selectedReason
                    ? reportOptionsMap[selectedReason].description
                    : ""}
                </Text>
              </View>

              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormTextarea
                    {...field}
                    label="Additional details"
                    placeholder="Provide any additional context..."
                    multiline
                    numberOfLines={4}
                    value={field.value ?? ""}
                  />
                )}
              />

              <View className="flex-row items-center justify-between gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onPress={() => setStep("reason")}
                >
                  <Text>Back</Text>
                </Button>
                <Button
                  size="sm"
                  onPress={form.handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text>Submit report</Text>
                  )}
                </Button>
              </View>
            </View>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
