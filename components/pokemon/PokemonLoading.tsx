import { Text, View } from "@/components/Themed";
import { ActivityIndicator, StyleSheet } from "react-native";

export const PokemonLoading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>{"Pokemon's list\nis loading..."}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    gap: 10,
  },
  text: {
    textAlign: "center",
    lineHeight: 20,
  },
});
