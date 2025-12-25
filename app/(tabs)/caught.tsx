import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { Text, View } from "@/components/Themed";
import { PokemonWithImage } from "@/schema/pokemon";
import { CaughtPokemon } from "@/types";
import { getCaughtPokemons } from "@/utils/caughtPokemonStorage";

export default function CaughtPokemonScreen() {
  const [caughtPokemons, setCaughtPokemons] = useState<CaughtPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadCaughtPokemons();
    }, []),
  );

  const loadCaughtPokemons = async () => {
    setIsLoading(true);
    const caught = await getCaughtPokemons();
    setCaughtPokemons(caught);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Loading...</Text>
      </View>
    );
  }

  if (caughtPokemons.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Pokemon caught yet!</Text>
        <Text style={styles.emptySubtext}>Go catch some Pokemon! 🎣</Text>
      </View>
    );
  }

  // Convert CaughtPokemon to PokemonWithImage for PokemonCard
  const pokemonData: PokemonWithImage[] = caughtPokemons.map((caught) => ({
    id: caught.id,
    number: caught.number,
    name: caught.name,
    imageUrl: caught.imageUrl,
    type_one: "",
    type_two: "",
    total: 0,
    hit_points: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0,
    generation: 0,
    legendary: false,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Caught Pokemon ({caughtPokemons.length})</Text>
      </View>
      <FlatList
        data={pokemonData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    opacity: 0.6,
  },
});
