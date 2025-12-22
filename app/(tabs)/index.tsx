import { FlatList, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { PokemonError } from "@/components/pokemon/PokemonError";
import { PokemonLoading } from "@/components/pokemon/PokemonLoading";
import { Text, View } from "@/components/Themed";
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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
