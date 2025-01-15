"use client";

import { useEffect, useState } from "react";
import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Locate } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { Link } from "solito/link";
import { z } from "zod";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Form,
  FormField,
  FormInput,
  Text,
} from "@homefront/ui";

interface ChangeLatLngProps {
  lat: number;
  lng: number;
  onChanged: (lat: number, lng: number) => void;
}

export const ChangeLatLng = ({ lat, lng, onChanged }: ChangeLatLngProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const validationSchema = z.object({
    lat: z
      .number()
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90"),
    lng: z
      .number()
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180"),
  });

  const formSchema = z.object({
    latLng: z
      .string()
      .min(1, "Latitude and Longitude are required")
      .refine((val) => /^-?\d*\.?\d*,\s*-?\d*\.?\d*$/.test(val.trim()), {
        message:
          "Invalid format. Use 'latitude, longitude' (e.g., 37.7749, -122.4194)",
      }),
  });

  const latLng = `${lat}, ${lng}`;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      latLng,
    },
  });

  const {
    formState: { isDirty, isSubmitting, isValid },
  } = form;

  const submitDisabled = isSubmitting || !isDirty || !isValid;

  const handleLocationChange = (data: z.infer<typeof formSchema>) => {
    const [latitude, longitude] = data.latLng
      .split(",")
      .map((coord) => coord.trim());
    const result = validationSchema.safeParse({
      lat: Number(latitude),
      lng: Number(longitude),
    });

    if (result.success) {
      onChanged(result.data.lat, result.data.lng);
      setIsOpen(false);
      form.reset();
    } else {
      form.setError("latLng", {
        type: "manual",
        message:
          result.error.errors[0]?.message ?? "Invalid latitude/longitude",
      });
    }
  };

  // Update form values when lat or lng changes
  useEffect(() => {
    form.reset({ latLng: `${lat}, ${lng}` });
  }, [lat, lng, form.reset]);

  return (
    <Form {...form}>
      <AlertDialog open={isOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="xs"
            className="flex-row items-center space-x-2 text-sm"
            onPress={() => setIsOpen(true)}
          >
            <Text className="text-primary">
              <Locate size={16} />
            </Text>
            <Text>Change location</Text>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Location</AlertDialogTitle>
            <View className="space-y-2 pb-2">
              <Text className="text-sm">
                For security reasons, we cannot use your address to find your
                location. Doing so could expose your location to third parties.
              </Text>
              <Text className="text-sm">
                Please find your latitude and longitude GPS coordinates
                elsewhere and paste them here.
              </Text>
              <Link
                href="https://support.google.com/maps/answer/18539?hl=en&co=GENIE.Platform%3DDesktop"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Text className="text-sm text-primary hover:underline">
                  Here are instructions for Google Maps, under "Get the
                  coordinates of a place in Google Maps".
                </Text>
              </Link>
            </View>
          </AlertDialogHeader>
          <View className="space-y-4">
            <FormField
              control={form.control}
              name="latLng"
              render={({ field }) => (
                <FormInput
                  {...field}
                  label="Coordinates (Latitude, Longitude)"
                  description="For example: 40.762459, -73.973869"
                  keyboardType="default"
                />
              )}
            />
          </View>
          <View className="flex flex-row justify-between">
            <AlertDialogCancel
              onPress={() => {
                form.reset();
                setIsOpen(false);
              }}
            >
              <Text>Cancel</Text>
            </AlertDialogCancel>
            <Button
              onPress={form.handleSubmit(handleLocationChange)}
              disabled={submitDisabled}
            >
              <Text>Change location</Text>
            </Button>
          </View>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
};
