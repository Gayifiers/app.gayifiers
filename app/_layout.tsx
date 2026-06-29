import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000000' }}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <FavoritesProvider>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#000000' } }} />
            <StatusBar style="light" />
          </FavoritesProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
