import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import { SortDropdown } from "@/components/SortDropdown";
import { View } from "@/components/Themed";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { PokemonError } from "@/components/pokemon/PokemonError";
import { PokemonLoading } from "@/components/pokemon/PokemonLoading";
import { useInfinitePokemons } from "@/hooks/useInfinitePokemons";
import { useRestoreInfiniteListPosition } from "@/hooks/useRestoreInfiniteListPosition";
import { PokemonWithImage } from "@/schema/pokemon";
import { PokemonListOrder } from "@/types";
import {
  getOrder,
  removeLastPage,
  removeScrollPosition,
  saveOrder,
  saveScrollPosition,
} from "@/utils/scrollPersistence";

export default function TabOneScreen() {
  const [order, setOrder] = useState<PokemonListOrder>("asc");
  const [isOrderLoaded, setIsOrderLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const savedOrder = await getOrder();
      setOrder(savedOrder);
      setIsOrderLoaded(true);
    })();
  }, []);

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePokemons(order);

  const allPokemons: PokemonWithImage[] = data?.pages.flatMap((page) => page.data) ?? [];

  const { listRef } = useRestoreInfiniteListPosition({
    pagesCount: data?.pages.length ?? 0,
    lastServerPage: data?.pages.at(-1)?.pagination.page,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
  });

  const handleOrderChange = async (newOrder: PokemonListOrder) => {
    await removeScrollPosition();
    await removeLastPage();
    await saveOrder(newOrder);
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
    setOrder(newOrder);
  };

  const handleScroll = (event: any) => {
    const offset = event.nativeEvent.contentOffset.y;
    saveScrollPosition(offset);
  };

  if (!isOrderLoaded || isLoading) {
    return <PokemonLoading />;
  }

  if (isError) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return <PokemonError message={message} />;
  }

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SortDropdown order={order} onOrderChange={handleOrderChange} />
      <FlatList
        ref={listRef}
        data={allPokemons}
        keyExtractor={(item: PokemonWithImage) => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: PokemonWithImage }) => <PokemonCard pokemon={item} />}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
