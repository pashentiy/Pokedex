import AsyncStorage from "@react-native-async-storage/async-storage";

import { CaughtPokemon } from "@/types";

const CAUGHT_POKEMON_KEY = "@pokedex_caught_pokemon";

export const saveCaughtPokemon = async (pokemon: CaughtPokemon): Promise<void> => {
  try {
    const existing = await getCaughtPokemons();
    const updated = [...existing, pokemon];
    await AsyncStorage.setItem(CAUGHT_POKEMON_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving caught pokemon:", error);
    throw error;
  }
};

export const getCaughtPokemons = async (): Promise<CaughtPokemon[]> => {
  try {
    const data = await AsyncStorage.getItem(CAUGHT_POKEMON_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting caught pokemons:", error);
    return [];
  }
};

export const isCaught = async (pokemonId: number): Promise<boolean> => {
  const caught = await getCaughtPokemons();
  return caught.some((p) => p.id === pokemonId);
};

export const removeCaughtPokemon = async (pokemonId: number): Promise<void> => {
  try {
    const existing = await getCaughtPokemons();
    const updated = existing.filter((p) => p.id !== pokemonId);
    await AsyncStorage.setItem(CAUGHT_POKEMON_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error removing caught pokemon:", error);
    throw error;
  }
};

export const getCaughtPokemonById = async (pokemonId: number): Promise<CaughtPokemon | null> => {
  const caught = await getCaughtPokemons();
  return caught.find((p) => p.id === pokemonId) || null;
};
