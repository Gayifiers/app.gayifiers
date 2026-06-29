import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'gayifiers:favorites';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          setFavoriteIds(JSON.parse(raw) as string[]);
        }
      })
      .finally(() => setLoaded(true));
  }, []);

  const persist = useCallback(async (ids: string[]) => {
    setFavoriteIds(ids);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, []);

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds]
  );

  const toggleFavorite = useCallback(
    async (id: string) => {
      const next = favoriteIds.includes(id)
        ? favoriteIds.filter((item) => item !== id)
        : [...favoriteIds, id];
      await persist(next);
    },
    [favoriteIds, persist]
  );

  return { favoriteIds, loaded, isFavorite, toggleFavorite };
}
