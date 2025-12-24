import { Stack, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet } from "react-native";

import { InfoRow } from "@/components/pokemon/InfoRow";
import { StatBar } from "@/components/pokemon/StatBar";
import { Text, View } from "@/components/Themed";
import { STAT_COLORS } from "@/constants/StatColors";
import { usePokemonById } from "@/hooks/usePokemonById";
import { getPokemonTypeColor } from "@/utils/pokemonTypeColors";

const PokemonDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pokemon = usePokemonById(id);

  if (!pokemon) {
    return (
      <View style={styles.errorContainer}>
        <Text>Pokemon not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: pokemon.name,
          headerBackTitle: "Back",
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: pokemon.imageUrl }} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.number}>#{pokemon.number.toString()}</Text>
            <Text style={styles.name}>{pokemon.name}</Text>
          </View>

          <View style={styles.typesContainer}>
            {pokemon.type_one && (
              <View style={[styles.typeBadge, getPokemonTypeColor(pokemon.type_one)]}>
                <Text style={styles.typeText}>{pokemon.type_one}</Text>
              </View>
            )}
            {pokemon.type_two && (
              <View style={[styles.typeBadge, getPokemonTypeColor(pokemon.type_two)]}>
                <Text style={styles.typeText}>{pokemon.type_two}</Text>
              </View>
            )}
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Base Stats</Text>

            <StatBar label="HP" value={pokemon.hit_points} maxValue={255} color={STAT_COLORS.HP} />
            <StatBar
              label="Attack"
              value={pokemon.attack}
              maxValue={255}
              color={STAT_COLORS.ATTACK}
            />
            <StatBar
              label="Defense"
              value={pokemon.defense}
              maxValue={255}
              color={STAT_COLORS.DEFENSE}
            />
            <StatBar
              label="Sp. Attack"
              value={pokemon.special_attack}
              maxValue={255}
              color={STAT_COLORS.SPECIAL_ATTACK}
            />
            <StatBar
              label="Sp. Defense"
              value={pokemon.special_defense}
              maxValue={255}
              color={STAT_COLORS.SPECIAL_DEFENSE}
            />
            <StatBar label="Speed" value={pokemon.speed} maxValue={255} color={STAT_COLORS.SPEED} />
            <StatBar label="Total" value={pokemon.total} maxValue={720} color={STAT_COLORS.TOTAL} />
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Details</Text>
            <InfoRow label="ID" value={pokemon.id.toString()} />
            <InfoRow label="National Dex #" value={pokemon.number.toString()} />
            <InfoRow label="Generation" value={pokemon.generation.toString()} />
            <InfoRow label="Legendary" value={pokemon.legendary ? "Yes" : "No"} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default PokemonDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  number: {
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.6,
    marginBottom: 8,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
  },
  typesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 30,
  },
  typeBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  typeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  infoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
