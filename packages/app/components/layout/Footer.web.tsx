import { Link } from "solito/link";

import { Logotype, Text } from "@homefront/ui";

export function Footer() {
  return (
    <footer>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-4 px-4 py-10 sm:h-20 sm:flex-row sm:py-0">
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Logotype height={18} className="flex" />
          <Link href="/about">
            <Text className="text-sm font-bold text-primary">About</Text>
          </Link>
          <Link href="/privacy">
            <Text className="text-sm font-bold text-primary">Privacy</Text>
          </Link>
          <Link href="/terms">
            <Text className="text-sm font-bold text-primary">Terms</Text>
          </Link>
        </nav>
      </div>
    </footer>
  );
}
