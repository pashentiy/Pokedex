import { createApiUrl } from "@/constants/Api";
import { Pokemons, PokemonsSchema } from "@/schema/pokemon";

export async function fetchPokemons(): Promise<Pokemons> {
  const response = await fetch(createApiUrl("/"));

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data: unknown = await response.json();
  return PokemonsSchema.parse(data);
}
