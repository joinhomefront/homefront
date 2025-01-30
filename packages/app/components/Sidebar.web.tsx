"use client";

import type { LucideIcon } from "lucide-react-native";
import type { ViewProps } from "react-native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import {
  ArrowBigDown,
  ArrowBigUp,
  BadgePlus,
  Banknote,
  Bookmark,
  Compass,
  Home,
  Library,
  ListTodo,
  Settings,
  SquareLibrary,
} from "lucide-react-native";
import { Link } from "solito/link";
import { usePathname } from "solito/navigation";

import { useSidebar } from "@homefront/app/hooks/useSidebar.web";
import { cn } from "@homefront/ui";

interface MenuItem {
  name: string;
  icon: LucideIcon;
  path: string;
  subitems?: MenuItem[];
}

const Sidebar: React.FC<ViewProps> = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { name: "Home", icon: Home, path: "/home" },
    {
      name: "Actions",
      icon: ListTodo,
      path: "/actions",
      subitems: [
        { name: "My Actions", path: "/actions", icon: ListTodo },
        { name: "Recommended", path: "/actions/recommended", icon: Compass },
      ],
    },
    {
      name: "Resources",
      icon: SquareLibrary,
      path: "/resources",
      subitems: [
        { name: "All", path: "/resources", icon: Library },
        { name: "Saved", path: "/resources/saved", icon: Bookmark },
        {
          name: "Upvoted",
          path: "/resources/upvoted",
          icon: ArrowBigUp,
        },
        {
          name: "Downvoted",
          path: "/resources/downvoted",
          icon: ArrowBigDown,
        },
        {
          name: "Shared",
          path: "/resources/shared",
          icon: BadgePlus,
        },
      ],
    },
    { name: "Donations", icon: Banknote, path: "/donations" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  useEffect(() => {
    if (isOpen) {
      toggleSidebar();
    }
  }, [pathname]);
  return (
    <View
      className={cn(
        "isolate z-50 order-first block min-h-screen-without-header w-64 overflow-x-hidden overflow-y-hidden border-r border-r-gray-200 bg-white",
        isOpen ? "block" : "hidden lg:block",
        "fixed bottom-0 top-[57px] h-screen-without-header lg:flex",
      )}
    >
      <View className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname?.startsWith(item.path);
          const showSubitems = !!item.subitems && isActive;

          return (
            <View key={item.name}>
              <Link href={item.path}>
                <View
                  className={cn(
                    "flex flex-row items-center space-x-2 rounded-md px-4 py-2 hover:bg-gray-100",
                    isActive && "hover:bg-primary-100",
                  )}
                >
                  <Text
                    className={cn("text-gray-500", isActive && "text-primary")}
                  >
                    <Icon size={24} />
                  </Text>
                  <Text
                    className={cn(
                      "text-base text-gray-700",
                      isActive && "font-bold text-primary",
                    )}
                  >
                    {item.name}
                  </Text>
                </View>
              </Link>

              {showSubitems && (
                <View className="my-1 ml-8">
                  {item.subitems?.map((subitem) => {
                    const isSubActive = pathname === subitem.path;
                    const SubIcon = subitem.icon;

                    return (
                      <Link key={subitem.name} href={subitem.path}>
                        <View
                          className={cn(
                            "flex flex-row items-center space-x-2 rounded-md px-4 py-2 hover:bg-gray-100",
                            isSubActive && "bg-primary-50 hover:bg-primary-100",
                          )}
                        >
                          <Text
                            className={cn(
                              "text-gray-500",
                              isSubActive && "text-primary",
                            )}
                          >
                            <SubIcon size={20} />
                          </Text>
                          <Text
                            className={cn(
                              "text-sm text-gray-600",
                              isSubActive && "font-bold text-primary",
                            )}
                          >
                            {subitem.name}
                          </Text>
                        </View>
                      </Link>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Sidebar;
