import { createContext, useContext, type ReactNode } from 'react';
import { useFavorites } from '@/hooks/useFavorites';

type FavoritesContextValue = ReturnType<typeof useFavorites>;

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const value = useFavorites();
  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within FavoritesProvider');
  }
  return context;
}
