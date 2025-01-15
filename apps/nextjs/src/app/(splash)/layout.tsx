import { SplashLayout } from "@homefront/app/components/layout/SplashLayout.web";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SplashLayout>{children}</SplashLayout>;
}
