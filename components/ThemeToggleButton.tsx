import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useTheme } from "./ThemeContext";

export function ThemeToggleButton() {
  const { colorScheme, toggleTheme } = useTheme();

  return (
    <Pressable onPress={toggleTheme}>
      {({ pressed }) => (
        <FontAwesome
          name={colorScheme === "dark" ? "circle" : "circle-o"}
          size={25}
          color={Colors[colorScheme ?? "light"].text}
          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
        />
      )}
    </Pressable>
  );
}
