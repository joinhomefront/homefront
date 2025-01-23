import { useCallback } from "react";
import { Linking, Platform, Pressable, View, ViewProps } from "react-native";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  style?: any;
  className?: string;
}

export function Link({ href, children, style = {}, ...props }: LinkProps) {
  const handlePress = useCallback(async () => {
    if (Platform.OS === "web") {
      // Use the <a> tag for web
      window.open(href, "_blank");
    } else {
      // Use Linking for native
      const supported = await Linking.canOpenURL(href);
      if (supported) {
        await Linking.openURL(href);
      } else {
        console.warn(`Can't open this URL: ${href}`);
      }
    }
  }, [href]);

  if (Platform.OS === "web") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", ...style }}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Pressable onPress={handlePress} {...props}>
      {children}
    </Pressable>
  );
}
