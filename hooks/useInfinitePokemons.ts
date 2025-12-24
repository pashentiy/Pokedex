import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchPokemonsPaginated } from "@/api/pokemon";

const ITEMS_PER_PAGE = 30;

export function useInfinitePokemons() {
  return useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: ({ pageParam = 1 }) => fetchPokemonsPaginated(pageParam, ITEMS_PER_PAGE),
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined;
    },
    initialPageParam: 1,
  });
}
