"use client";

import type { VariantProps } from "class-variance-authority";
import type { ViewProps } from "react-native";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, View } from "react-native";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react-native";
import { SolitoImage } from "solito/image";

import { api } from "@homefront/app/utils/trpc";
import { ActivityIndicator, Button, cn, Text } from "@homefront/ui";

import { CDN_DOMAIN } from "./data";

const pickerVariants = cva("w-full gap-y-4", {
  variants: {
    variant: {
      default: "",
    },
    centered: {
      true: "items-center justify-center",
    },
    size: {
      default: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "default",
    centered: false,
    size: "default",
  },
});

const pickerImageVariants = cva("overflow-hidden rounded-full bg-primary-200", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "h-[100px] w-[100px]",
      lg: "h-[200px] w-[200px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const pickerInnerVariants = cva("gap-y-2", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "",
      lg: "gap-y-4",
    },
    centered: {
      false: "",
      true: "items-center justify-center",
    },
  },
  defaultVariants: {
    variant: "default",
    centered: false,
  },
});

interface AvatarPickerProps {
  currentImage?: string | null;
  username: string;
  isOpen?: boolean;
}

export function AvatarPicker({
  currentImage,
  username,
  className,
  isOpen: initialIsOpen = false,
  variant,
  centered,
  size,
}: AvatarPickerProps & ViewProps & VariantProps<typeof pickerVariants>) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const { data: avatars, isLoading } = api.users.getAvatars.useQuery();
  const [image, setImage] = useState<string | null | undefined>(currentImage);

  const [numColumns, setNumColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      const screenWidth = Dimensions.get("window").width;

      if (screenWidth >= 640) {
        setNumColumns(3); // Three columns for tablets or wide screens
      } else if (screenWidth > 300) {
        setNumColumns(2); // Two columns for medium screens
      } else {
        setNumColumns(1); // Single column for small screens
      }
    };

    // Initial call to set the columns
    updateColumns();

    // Add event listener for orientation or screen size change
    const subscription = Dimensions.addEventListener("change", updateColumns);

    // Clean up the event listener on unmount
    return () => subscription.remove();
  }, []);

  const utils = api.useUtils();

  const updateAvatarMutation = api.users.updateAvatar.useMutation({
    onSuccess: () => setIsOpen(false),
  });

  const onPressItem = (avatar: { filename: string }) => {
    setImage(`avatars/default/${avatar.filename}`);
  };

  const onCancel = () => {
    setImage(currentImage);
    setIsOpen(false);
  };

  const currentSrc = `${CDN_DOMAIN}/${currentImage}`;

  const renderItem = ({
    item: avatar,
  }: {
    item: { filename: string; displayName: string };
  }) => {
    const src = `${CDN_DOMAIN}/avatars/default/${avatar.filename}`;
    const itemImage = `avatars/default/${avatar.filename}`;

    const isSelected = image === itemImage;

    return (
      <View
        className={cn(
          "px-1 py-1",
          numColumns === 1 && "w-full",
          numColumns === 2 && "w-1/2",
          numColumns === 3 && "w-1/3",
        )}
      >
        <Pressable
          key={avatar.filename}
          onPress={() => onPressItem(avatar)}
          className={cn(
            "group rounded-md border border-transparent p-2 hover:border-gray-200",
            isSelected &&
              "border-primary bg-primary-50 hover:border-primary hover:bg-primary-50",
          )}
        >
          <View className="-mx-1 items-center justify-start gap-1">
            <View
              className={cn(
                "aspect-square w-[80px] overflow-hidden rounded-full bg-gray-200",
              )}
            >
              <View className="absolute inset-0 z-10 h-full w-full items-center justify-center">
                <View
                  className={cn(
                    "h-full w-full bg-primary opacity-0 group-hover:opacity-50",
                    isSelected && "opacity-50",
                  )}
                />
                {isSelected && (
                  <View className="absolute">
                    <Check size={48} strokeWidth={3} className="text-white" />
                  </View>
                )}
              </View>
              <SolitoImage
                src={src}
                height={80}
                width={80}
                alt={avatar.displayName}
                contentFit="cover"
              />
            </View>
            <View>
              <Text
                className={cn(
                  "text-center text-sm font-bold text-gray-500 group-hover:text-primary",
                  isSelected && "font-bold text-primary",
                )}
              >
                {avatar.displayName}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  const submitDisabled = !image || image === currentImage;

  const onSave = async () => {
    if (!image) return;
    await updateAvatarMutation.mutateAsync({ image });
    await utils.auth.getSession.invalidate();
  };

  return (
    <View
      className={cn(pickerVariants({ variant, centered, size, className }))}
    >
      {isOpen ? (
        <>
          <View className="max-h-96 w-full overflow-hidden rounded-lg border border-gray-200">
            {isLoading || !avatars?.length ? (
              <View className="h-96 items-center justify-center">
                <ActivityIndicator size="small" />
              </View>
            ) : (
              <FlatList
                data={avatars}
                renderItem={renderItem}
                keyExtractor={(item) => item.filename}
                numColumns={numColumns}
                key={`avatar-list-${numColumns}`}
                className="px-2"
                contentContainerStyle={{
                  paddingHorizontal: 4,
                  paddingVertical: 8,
                  width: "100%",
                }}
              />
            )}
          </View>
          <View className="w-full flex-row items-center justify-between gap-x-4">
            <Button size="sm" variant="outline" onPress={onCancel}>
              <Text>Cancel</Text>
            </Button>
            <Button size="sm" onPress={onSave} disabled={submitDisabled}>
              <Text>Save</Text>
            </Button>
          </View>
        </>
      ) : (
        <View
          className={cn(
            pickerInnerVariants({ variant, centered, size, className }),
          )}
        >
          <View className={cn(pickerImageVariants({ variant, size }))}>
            {currentImage ? (
              <SolitoImage
                src={currentSrc}
                alt={username}
                width={size === "lg" ? 400 : 200}
                height={size === "lg" ? 400 : 200}
              />
            ) : (
              <View className="h-full w-full items-center justify-center">
                <Text className="text-primary">No photo</Text>
              </View>
            )}
          </View>

          <View className="flex-row">
            <Button size="sm" variant="outline" onPress={() => setIsOpen(true)}>
              <Text>Change photo</Text>
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}
