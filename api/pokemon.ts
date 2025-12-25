import { createApiUrl } from "@/constants/Api";
import {
  PaginatedPokemonsResponseSchema,
  PaginatedPokemonsWithImageResponse,
  PokemonTypesResponseSchema,
} from "@/schema/pokemon";
import { PokemonListOrder, PokemonType, PokemonTypeName } from "@/types";

export async function fetchPokemonsPaginated(
  page: number,
  limit: number = 30,
  order: PokemonListOrder,
  type: PokemonType = null,
): Promise<PaginatedPokemonsWithImageResponse> {
  let url = createApiUrl(`/pokemon?page=${page}&limit=${limit}&order=${order}`);
  if (type) {
    url += `&type=${encodeURIComponent(type)}`;
  }
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

export async function fetchPokemonTypes(): Promise<PokemonTypeName[]> {
  const url = createApiUrl("/types");
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data: unknown = await response.json();
  const parsedData = PokemonTypesResponseSchema.parse(data);

  return parsedData.types;
}

function getPokemonImageUrlByDexNumber(dexNumber: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dexNumber}.png`;
}
