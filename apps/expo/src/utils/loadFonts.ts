import { loadAsync } from "expo-font";
import {
  FiraCode_400Regular,
  FiraCode_500Medium,
  FiraCode_700Bold,
} from "@expo-google-fonts/fira-code";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import {
  PTSerif_400Regular,
  PTSerif_700Bold,
} from "@expo-google-fonts/pt-serif";

export async function loadFonts() {
  try {
    console.log("Starting font loading...");

    const fonts = {
      "Inter-Regular": Inter_400Regular,
      "Inter-Medium": Inter_500Medium,
      "Inter-Bold": Inter_700Bold,
      "Oswald-Regular": Oswald_400Regular,
      "Oswald-Medium": Oswald_500Medium,
      "Oswald-Bold": Oswald_700Bold,
      "FiraCode-Regular": FiraCode_400Regular,
      "FiraCode-Medium": FiraCode_500Medium,
      "FiraCode-Bold": FiraCode_700Bold,
      "PTSerif-Regular": PTSerif_400Regular,
      "PTSerif-Bold": PTSerif_700Bold,
    };

    await loadAsync(fonts);
    console.log("Fonts loaded successfully");
    return true;
  } catch (error) {
    console.error("Error loading fonts:", error);
    return false;
  }
}
