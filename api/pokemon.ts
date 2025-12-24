import { createApiUrl } from "@/constants/Api";
import {
  PaginatedPokemonsResponseSchema,
  PaginatedPokemonsWithImageResponse,
} from "@/schema/pokemon";

export async function fetchPokemonsPaginated(
  page: number,
  limit: number = 30,
): Promise<PaginatedPokemonsWithImageResponse> {
  const url = createApiUrl(`/pokemon?page=${page}&limit=${limit}`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data: unknown = await response.json();
  const parsedData = PaginatedPokemonsResponseSchema.parse(data);

  const pokemonsWithImage = parsedData.data.map((pokemon) => ({
    ...pokemon,
    imageUrl: getPokemonImageUrlByDexNumber(pokemon.number),
  }));

  return {
    data: pokemonsWithImage,
    pagination: parsedData.pagination,
  };
}

function getPokemonImageUrlByDexNumber(dexNumber: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dexNumber}.png`;
}
