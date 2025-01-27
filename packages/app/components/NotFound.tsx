import { SafeAreaView, View } from "react-native";
import { Home, SearchX } from "lucide-react-native";
import { Link } from "solito/link";

import { Button, H2, Text } from "@homefront/ui";

export function NotFound() {
  return (
    <SafeAreaView className="w-full flex-1" style={{ flex: 1 }}>
      <View className="min-h-screen-without-header flex-1 items-center justify-center gap-4">
        <SearchX size={48} className="text-gray-500" />
        <H2 className="text-2xl text-gray-500">Page not found</H2>
        <Link href="/home">
          <Button size="lg" hasIcon>
            <Home size={16} className="text-white" />
            <Text>Go home</Text>
          </Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}
