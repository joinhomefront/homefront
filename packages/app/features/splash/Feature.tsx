import { View } from "react-native";
import { LucideIcon } from "lucide-react-native";
import { SolitoImage } from "solito/image";

import { Text } from "@homefront/ui";

import { FeatureTitle } from "./FeatureTitle";
import { FeatureStatusType } from "./types";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  text: string[];
  status?: FeatureStatusType;
  image?: {
    src: any;
    width: number;
    height: number;
    alt: string;
  };
}

export function Feature({
  icon,
  title,
  subtitle,
  text,
  status,
  image,
}: FeatureProps) {
  return (
    <View className="gap-y-4 md:gap-y-0">
      <FeatureTitle icon={icon} title={title} status={status} />
      <View className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <View className="flex-1 gap-y-4">
          <Text className="font-sans-bold text-lg text-gray-600">
            {subtitle}
          </Text>

          <View className="gap-y-4">
            {text.map((paragraph, index) => (
              <Text key={index} className="max-w-prose text-sm text-gray-500">
                {paragraph}
              </Text>
            ))}
          </View>
        </View>

        {image && (
          <View className="order-first flex items-start justify-center sm:items-center md:order-last">
            <SolitoImage
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              contentFit="cover"
            />
          </View>
        )}
      </View>
    </View>
  );
}
