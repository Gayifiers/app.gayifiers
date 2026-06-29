import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import TopNavigation from '@/components/TopNavigation';
import { PLACES } from '@/data/places';
import { getCategoryLabel } from '@/constants/venues';
import { useFavoritesContext } from '@/contexts/FavoritesContext';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favoriteIds } = useFavoritesContext();
  const savedVenues = PLACES.filter((place) => favoriteIds.includes(place.id));

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <TopNavigation />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Favorites</Text>
          <Text style={styles.subtitle}>
            {savedVenues.length > 0
              ? `${savedVenues.length} saved venue${savedVenues.length === 1 ? '' : 's'}`
              : 'Tap the heart on any venue to save it here.'}
          </Text>
        </View>

        {savedVenues.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyState}>
              <Heart size={64} color="#9D4EDD" strokeWidth={1.5} />
              <Text style={styles.emptyTitle}>No favorites yet</Text>
              <Text style={styles.emptySubtitle}>
                Open a venue and tap the heart icon to add it to your list.
              </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.exploreButton,
                  pressed && styles.exploreButtonPressed,
                ]}
                onPress={() => router.push('/(tabs)/explore')}
              >
                <Text style={styles.exploreButtonText}>Browse venues</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.list}>
            {savedVenues.map((venue) => (
              <Pressable
                key={venue.id}
                style={({ pressed }) => [styles.venueCard, pressed && styles.venueCardPressed]}
                onPress={() => router.push(`/venue/${venue.id}`)}
              >
                {venue.imageUrl ? (
                  <Image source={{ uri: venue.imageUrl }} style={styles.venueImage} />
                ) : null}
                <View style={styles.venueContent}>
                  <Text style={styles.venueName}>{venue.name}</Text>
                  <Text style={styles.venueCategory}>{getCategoryLabel(venue.category)}</Text>
                  <View style={styles.locationRow}>
                    <MapPin size={14} color="#999999" />
                    <Text style={styles.locationText}>{venue.area || venue.city}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#999999',
    lineHeight: 22,
  },
  emptyStateContainer: {
    minHeight: 360,
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
    marginBottom: 24,
  },
  exploreButton: {
    backgroundColor: '#9D4EDD',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  exploreButtonPressed: {
    opacity: 0.85,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: 20,
  },
  venueCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    overflow: 'hidden',
    marginBottom: 16,
  },
  venueCardPressed: {
    opacity: 0.8,
  },
  venueImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#1A1A1A',
  },
  venueContent: {
    padding: 16,
  },
  venueName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  venueCategory: {
    fontSize: 13,
    color: '#5B9BD5',
    fontWeight: '600',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#999999',
  },
  bottomPadding: {
    height: 80,
  },
});
