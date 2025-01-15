import { AppLayout } from "@homefront/app/components/layout/AppLayout.web";

export const dynamic = "force-dynamic";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
