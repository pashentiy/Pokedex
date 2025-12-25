import { PokemonWithImage } from "@/schema/pokemon";
import { PokemonListOrder, PokemonType } from "@/types";
import { useInfinitePokemons } from "./useInfinitePokemons";

export function usePokemonById(
  id: string,
  order: PokemonListOrder = "asc",
  type: PokemonType = null,
): PokemonWithImage | undefined {
  const { data } = useInfinitePokemons(order, type);

  const allPokemons = data?.pages.flatMap((page) => page.data) ?? [];

  return allPokemons.find((pokemon: PokemonWithImage) => pokemon.id.toString() === id);
}
