import { useQuery } from "@tanstack/react-query";

import { fetchPokemonTypes } from "@/api/pokemon";

export function usePokemonTypes() {
  return useQuery({
    queryKey: ["pokemonTypes"],
    queryFn: fetchPokemonTypes,
    staleTime: Infinity,
  });
}
