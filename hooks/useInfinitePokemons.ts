import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchPokemonsPaginated } from "@/api/pokemon";
import { PokemonListOrder } from "@/types";

const ITEMS_PER_PAGE = 30;

export function useInfinitePokemons(order: PokemonListOrder = "asc") {
  return useInfiniteQuery({
    queryKey: ["pokemons", order],
    queryFn: ({ pageParam = 1 }) => fetchPokemonsPaginated(pageParam, ITEMS_PER_PAGE, order),
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined;
    },
    initialPageParam: 1,
  });
}
