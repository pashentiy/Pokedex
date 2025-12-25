import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text } from "react-native";

import { View } from "@/components/Themed";
import { PokemonWithImage } from "@/schema/pokemon";

interface PokemonCardProps {
  pokemon: PokemonWithImage;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const imageUrl = pokemon.imageUrl;

  return (
    <Link href={`/pokemon/${pokemon.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
          <Text style={styles.textNumber}>#{pokemon.number}</Text>
          <Text style={styles.textPokemonName}>{pokemon.name}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  textNumber: {
    textAlign: "center",
    fontWeight: "bold",
  },
  textPokemonName: {
    textAlign: "center",
    fontSize: 9,
    fontWeight: "bold",
  },
  image: {
    width: "80%",
    height: "80%",
  },
});
