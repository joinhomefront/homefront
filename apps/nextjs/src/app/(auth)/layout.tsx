import { AuthLayout } from "@homefront/app/components/layout/AuthLayout.web";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
