import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000000' }}>
      <SafeAreaProvider>
        <FavoritesProvider>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#000000' } }} />
          <StatusBar style="light" />
        </FavoritesProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
