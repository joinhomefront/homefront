import React from "react";
import { Text, View } from "react-native";

import { cn } from "@homefront/ui";

import { formatAmount } from "./utils";

type ReceiptProps = {
  amount: number;
  triangleWidth?: number; // Controls the width of each triangle in the torn effect
  triangleHeight?: number; // Controls the height of each triangle
  color?: string; // Background color for the torn effect
  borderColor?: string; // Border color for the torn effect
};

export const Receipt: React.FC<ReceiptProps> = ({
  amount,
  triangleWidth = 12, // Default triangle width
  triangleHeight = 8, // Default triangle height
  color = "#FFFFFF", // Default torn edge color
  borderColor = "#D1D5DB", // Default border color
}) => {
  // Create the zigzag path
  const createZigzagPath = (width: number): string => {
    const path = [];
    for (let x = 0; x < width; x += triangleWidth) {
      path.push(
        `M${x},${triangleHeight} L${x + triangleWidth / 2},0 L${x + triangleWidth},${triangleHeight}`,
      );
    }
    return path.join(" ");
  };

  return (
    <View className="relative my-5 w-full max-w-[364px] self-center overflow-hidden rounded-t-lg border-2 border-b-0 border-gray-300">
      {/* Receipt Content */}
      <View className="bg-gray-50 p-5">
        <View className="flex-row items-center">
          <Text className="font-mono text-base font-bold text-gray-500">
            WE ARE IT
          </Text>
          <View className="mx-4 w-full flex-1 border-t-2 border-dashed border-gray-300" />
          <Text className="font-mono text-base font-bold text-gray-500">
            {formatAmount(amount)}
          </Text>
        </View>
      </View>

      {/* Torn Edge Bottom */}
      <View className="absolute bottom-0 left-0 h-[8px] w-full">
        <svg
          width="100%"
          height={triangleHeight}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block"
        >
          <path
            d={createZigzagPath(364)}
            fill={color}
            stroke={borderColor}
            strokeWidth="2"
          />
        </svg>
      </View>
    </View>
  );
};
