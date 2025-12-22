import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";

type PokemonErrorProps = {
  message: string;
};

export const PokemonError = ({ message }: PokemonErrorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Error: {message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
