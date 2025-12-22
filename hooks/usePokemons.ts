import { fetchPokemons } from "@/api/pokemon";
import { Pokemons } from "@/schema/pokemon";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function usePokemons(): UseQueryResult<Pokemons, Error> {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
  });
}
