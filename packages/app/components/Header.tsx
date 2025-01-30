"use client";

import type { ViewProps } from "react-native";
import React from "react";
import { View } from "react-native";
import {
  LogOut,
  Menu,
  Plus,
  Settings,
  SquareLibrary,
  X,
} from "lucide-react-native";
import { signOut } from "next-auth/react";
import { Link } from "solito/link";

import { UserAvatar } from "@homefront/app/features/avatars/UserAvatar";
import { useSidebar } from "@homefront/app/hooks/useSidebar.web";
import type { SanitizedUser } from "@homefront/db";
import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  H1,
  LogoAlt,
  Logotype,
  Text,
} from "@homefront/ui";

export const Header: React.FC<{ user?: SanitizedUser } & ViewProps> = ({
  user,
}) => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <View
      className={cn(
        "mx-auto w-full border-b border-b-primary-100 bg-white px-5 py-2 pl-2 md:pl-5",
      )}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onPress={toggleSidebar}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          <Link href="/home">
            <View className="flex flex-row items-center space-x-3 hover:opacity-80">
              <LogoAlt height={32} width={48} className="flex" />
              <Logotype height={24} className={cn("hidden md:flex")} />
              <H1 className="sr-only">Homefront</H1>
            </View>
          </Link>
        </View>

        <View className="flex-row items-center justify-between gap-2">
          <DropdownMenu>
            {user && (
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" hasIcon>
                  <Plus size={24} className="text-primary" />
                  <Text className="text-primary">Add</Text>
                </Button>
              </DropdownMenuTrigger>
            )}
            <DropdownMenuContent className="native:w-72 w-64">
              <DropdownMenuGroup>
                <Link href="/submit/resource?type=link">
                  <DropdownMenuItem>
                    <View className="flex-row items-center space-x-2">
                      <SquareLibrary size={24} className="text-primary" />
                      <Text>Add a resource</Text>
                    </View>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            {user && (
              <DropdownMenuTrigger asChild>
                <UserAvatar user={user} className="hover:cursor-pointer" />
              </DropdownMenuTrigger>
            )}
            <DropdownMenuContent className="native:w-72 w-64">
              <DropdownMenuGroup>
                <Link href="/settings">
                  <DropdownMenuItem>
                    <View className="flex-row items-center space-x-2">
                      <Settings size={16} className="text-primary" />
                      <Text>Settings</Text>
                    </View>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onPress={async () => {
                    "use client";
                    await signOut();
                  }}
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
      </View>
    </View>
  );
};
