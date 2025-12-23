import { FlatList, StyleSheet } from "react-native";

import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { PokemonError } from "@/components/pokemon/PokemonError";
import { PokemonLoading } from "@/components/pokemon/PokemonLoading";
import { View } from "@/components/Themed";
import { usePokemons } from "@/hooks/usePokemons";

export default function TabOneScreen() {
  const { data, isLoading, isError, error } = usePokemons();

  if (isLoading) {
    return <PokemonLoading />;
  }

  if (isError) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return <PokemonError message={message} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
