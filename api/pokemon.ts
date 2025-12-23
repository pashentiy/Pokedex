import { createApiUrl } from "@/constants/Api";
import { PokemonsSchema, PokemonsWithImage } from "@/schema/pokemon";

export async function fetchPokemons(): Promise<PokemonsWithImage> {
  const response = await fetch(createApiUrl("/"));

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data: unknown = await response.json();
  const parsedData = PokemonsSchema.parse(data);

  const pokemonsWithImage = parsedData.map((pokemon) => ({
    ...pokemon,
    imageUrl: getPokemonImageUrlByDexNumber(pokemon.number),
  }));

  return pokemonsWithImage;
}

function getPokemonImageUrlByDexNumber(dexNumber: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dexNumber}.png`;
}
