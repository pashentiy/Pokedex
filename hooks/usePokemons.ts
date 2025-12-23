import { fetchPokemons } from "@/api/pokemon";
import { PokemonsWithImage } from "@/schema/pokemon";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function usePokemons(): UseQueryResult<PokemonsWithImage, Error> {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
  });
}
