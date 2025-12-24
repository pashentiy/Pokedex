import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { PokemonError } from "@/components/pokemon/PokemonError";
import { PokemonLoading } from "@/components/pokemon/PokemonLoading";
import { View } from "@/components/Themed";
import { useInfinitePokemons } from "@/hooks/useInfinitePokemons";
import { useRestoreInfiniteListPosition } from "@/hooks/useRestoreInfiniteListPosition";
import { PokemonWithImage } from "@/schema/pokemon";
import { saveScrollPosition } from "@/utils/scrollPersistence";

export default function TabOneScreen() {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePokemons();

  const { listRef } = useRestoreInfiniteListPosition({
    pagesCount: data?.pages.length ?? 0,
    lastServerPage: data?.pages.at(-1)?.pagination.page,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
  });

  const handleScroll = (event: any) => {
    const offset = event.nativeEvent.contentOffset.y;
    saveScrollPosition(offset);
  };

  if (isLoading) {
    return <PokemonLoading />;
  }

  if (isError) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return <PokemonError message={message} />;
  }

  const allPokemons: PokemonWithImage[] = data?.pages.flatMap((page) => page.data) ?? [];

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
