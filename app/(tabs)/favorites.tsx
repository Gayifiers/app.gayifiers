import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';
import TopNavigation from '@/components/TopNavigation';

export default function FavoritesScreen() {
  const handleEmptyStatePress = () => {
    Alert.alert(
      'Preview Feature',
      'Favorites will be unlocked in the full version.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <TopNavigation />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Favorites</Text>
        </View>

        <Pressable
          style={styles.emptyStateContainer}
          onPress={handleEmptyStatePress}
        >
          <View style={styles.emptyState}>
            <Heart size={64} color="#9D4EDD" strokeWidth={1.5} />
            <Text style={styles.emptyTitle}>Your favorites will appear here</Text>
            <Text style={styles.emptySubtitle}>
              Favorites let you keep track of venues you want to visit on your trip.
            </Text>
            <Text style={styles.helperText}>
              Favorites will be available in the full version.
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyState: {
    alignItems: 'center',
    maxWidth: 340,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  helperText: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

