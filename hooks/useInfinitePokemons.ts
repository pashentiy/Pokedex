import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchPokemonsPaginated } from "@/api/pokemon";
import { PokemonListOrder, PokemonType } from "@/types";

const ITEMS_PER_PAGE = 30;

export function useInfinitePokemons(order: PokemonListOrder = "asc", type: PokemonType = null) {
  return useInfiniteQuery({
    queryKey: ["pokemons", order, type],
    queryFn: ({ pageParam = 1 }) => fetchPokemonsPaginated(pageParam, ITEMS_PER_PAGE, order, type),
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined;
    },
    initialPageParam: 1,
  });
}
