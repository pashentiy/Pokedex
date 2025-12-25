import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import { SortDropdown } from "@/components/SortDropdown";
import { View } from "@/components/Themed";
import { TypeDropdown } from "@/components/TypeDropdown";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { PokemonError } from "@/components/pokemon/PokemonError";
import { PokemonLoading } from "@/components/pokemon/PokemonLoading";
import { useInfinitePokemons } from "@/hooks/useInfinitePokemons";
import { usePokemonTypes } from "@/hooks/usePokemonTypes";
import { useRestoreInfiniteListPosition } from "@/hooks/useRestoreInfiniteListPosition";
import { PokemonWithImage } from "@/schema/pokemon";
import { PokemonListOrder, PokemonType } from "@/types";
import {
  getOrder,
  getType,
  removeLastPage,
  removeScrollPosition,
  saveOrder,
  saveScrollPosition,
  saveType,
} from "@/utils/scrollPersistence";

export default function TabOneScreen() {
  const [order, setOrder] = useState<PokemonListOrder>("asc");
  const [type, setType] = useState<PokemonType>(null);
  const [isOrderLoaded, setIsOrderLoaded] = useState(false);
  const [isTypeLoaded, setIsTypeLoaded] = useState(false);

  const { data: typesData, isLoading: isTypesLoading } = usePokemonTypes();

  useEffect(() => {
    (async () => {
      const [savedOrder, savedType] = await Promise.all([getOrder(), getType()]);
      setOrder(savedOrder);
      setType(savedType);
      setIsOrderLoaded(true);
      setIsTypeLoaded(true);
    })();
  }, []);

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePokemons(order, type);

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

  const handleTypeChange = async (newType: PokemonType) => {
    await removeScrollPosition();
    await removeLastPage();
    await saveType(newType);
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
    setType(newType);
  };

  const handleScroll = (event: any) => {
    const offset = event.nativeEvent.contentOffset.y;
    saveScrollPosition(offset);
  };

  if (!isOrderLoaded || !isTypeLoaded || isLoading) {
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
      <View style={styles.filtersContainer}>
        <SortDropdown order={order} onOrderChange={handleOrderChange} />
        <TypeDropdown
          type={type}
          types={typesData || []}
          onTypeChange={handleTypeChange}
          isLoading={isTypesLoading}
        />
      </View>
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
  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
