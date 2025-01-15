import type { ViewProps } from "react-native";
import type { View } from "react-native-reanimated/lib/typescript/Animated";
import React from "react";

import type { User } from "@homefront/db";
import { Avatar, AvatarFallback, AvatarImage, cn, Text } from "@homefront/ui";

import { CDN_DOMAIN } from "./data";

interface UserAvatarProps {
  user: Pick<User, "image" | "username">;
}

export const UserAvatar = React.forwardRef<View, ViewProps & UserAvatarProps>(
  ({ className, user, ...props }, ref) => {
    const source = user.image
      ? { uri: `${CDN_DOMAIN}/${user.image}` }
      : undefined;
    const firstLetter = user.username.charAt(0).toUpperCase();

    return (
      <Avatar
        ref={ref}
        alt={user.username}
        className={cn("select-none", className)}
        {...props}
      >
        <AvatarImage source={source} />
        <AvatarFallback>
          <Text>{firstLetter}</Text>
        </AvatarFallback>
      </Avatar>
    );
  },
);
