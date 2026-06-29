import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <FavoritesProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="venue/[id]" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="light" />
        </FavoritesProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
