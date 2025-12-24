import { useEffect, useRef, useState } from "react";
import type { FlatList } from "react-native";

import { getLastPage, getScrollPosition, saveLastPage } from "@/utils/scrollPersistence";

type UseRestoreArgs = {
  pagesCount: number;
  lastServerPage?: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export function useRestoreInfiniteListPosition({
  pagesCount,
  lastServerPage,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseRestoreArgs) {
  const listRef = useRef<FlatList>(null);

  const [restore, setRestore] = useState<{ offset: number; page: number } | null>(null);
  const didScrollRestoreRef = useRef(false);

  useEffect(() => {
    (async () => {
      const [offset, page] = await Promise.all([getScrollPosition(), getLastPage()]);
      setRestore({ offset, page });
    })();
  }, []);

  useEffect(() => {
    if (typeof lastServerPage === "number") {
      saveLastPage(lastServerPage);
    }
  }, [lastServerPage]);

  useEffect(() => {
    if (!restore) return;
    if (pagesCount >= restore.page) return;

    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [restore, pagesCount, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!restore) return;
    if (didScrollRestoreRef.current) return;
    if (pagesCount < restore.page) return;

    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({ offset: restore.offset, animated: false });
      didScrollRestoreRef.current = true;
    });
  }, [restore, pagesCount]);

  return { listRef };
}
