"use client";

import React from "react";
import { View } from "react-native";
import { LogOut, Menu, X } from "lucide-react-native";
import { signOut } from "next-auth/react";

import { UserAvatar } from "@homefront/app/features/avatars/UserAvatar";
import {
  SidebarProvider,
  useSidebar,
} from "@homefront/app/hooks/useSidebar.web";
import type { SanitizedUser } from "@homefront/db";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Text,
} from "@homefront/ui";

export const HeaderClient: React.FC<{
  user?: SanitizedUser;
}> = ({ user }) => {
  return (
    <SidebarProvider>
      <HeaderClientInner user={user} />
    </SidebarProvider>
  );
};

const HeaderClientInner: React.FC<{
  user?: SanitizedUser;
}> = ({ user }) => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <View className="flex-row items-center justify-between">
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden"
        onPress={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      <DropdownMenu>
        {user && (
          <DropdownMenuTrigger asChild>
            <UserAvatar user={user} className="hover:cursor-pointer" />
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent className="native:w-72 w-64">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onPress={async () => await signOut({ callbackUrl: "/login" })}
            >
              <View className="flex-row items-center space-x-2">
                <LogOut size={16} className="text-primary" />
                <Text>Sign out</Text>
              </View>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </View>
  );
};
