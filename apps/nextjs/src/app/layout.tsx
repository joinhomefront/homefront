import "raf/polyfill";

import type { Metadata, Viewport } from "next";
import { Fira_Code, Inter, Oswald, PT_Serif } from "next/font/google";

import { Provider } from "@homefront/app/provider";
import { TRPCReactProvider } from "@homefront/app/utils/trpc.web";
import { cn } from "@homefront/ui/lib/utils";

import "~/app/globals.css";

import { env } from "~/env";
import { Progress } from "./Progress";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-oswald",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-fira-code",
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://joinhomefront.org"
      : "http://localhost:3000",
  ),
  title: "Homefront",
  description: "Join the front line to defend democracy.",
  openGraph: {
    title: "Homefront",
    description: "Join the front line to defend democracy.",
    url: "https://joinhomefront.org",
    siteName: "Homefront",
  },
  twitter: {
    card: "summary_large_image",
    site: "@joinhomefront",
    creator: "@joinhomefront",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        inter.variable,
        oswald.variable,
        firaCode.variable,
        ptSerif.variable,
      )}
    >
      <Progress />
      <body
        className={cn(
          "flex w-full flex-1 bg-background text-foreground antialiased",
          inter.variable,
          oswald.variable,
          firaCode.variable,
          ptSerif.variable,
        )}
      >
        <TRPCReactProvider>
          <Provider>{props.children}</Provider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
