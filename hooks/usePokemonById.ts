import { PokemonWithImage } from "@/schema/pokemon";
import { useInfinitePokemons } from "./useInfinitePokemons";

export function usePokemonById(id: string): PokemonWithImage | undefined {
  const { data } = useInfinitePokemons();

  const allPokemons = data?.pages.flatMap((page) => page.data) ?? [];

  return allPokemons.find((pokemon: PokemonWithImage) => pokemon.id.toString() === id);
}
