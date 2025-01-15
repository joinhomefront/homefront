import { View } from "react-native";
import { Link } from "solito/link";

import { H1, LogoAlt, Logotype } from "@homefront/ui";

export function AuthHeader() {
  return (
    <View className="mx-auto min-h-[56px] w-full max-w-md justify-center bg-white px-5 py-2 md:max-w-full">
      <View className="w-fit">
        <Link href="/">
          <View className="flex flex-row items-center space-x-3 hover:opacity-80">
            <LogoAlt height={32} width={48} className="flex" />
            <Logotype height={24} className="flex" />
            <H1 className="sr-only">Homefront</H1>
          </View>
        </Link>
      </View>
    </View>
  );
}
