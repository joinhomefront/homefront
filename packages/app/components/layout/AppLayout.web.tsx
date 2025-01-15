"use server";

import { View } from "react-native";

import { Header } from "@homefront/app/components/Header";
import Sidebar from "@homefront/app/components/Sidebar.web";
import { SidebarProvider } from "@homefront/app/hooks/useSidebar.web";
import { auth } from "@homefront/auth";

import { AppLayoutInner } from "./AppLayoutInner.web";

export async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = session?.user;
  return (
    <SidebarProvider>
      <AppLayoutInner user={user}>{children}</AppLayoutInner>
    </SidebarProvider>
  );
}
