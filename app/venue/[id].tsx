import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Flame, Gift, Heart } from 'lucide-react-native';
import { PLACES } from '@/data/places';
import { getCategoryLabel } from '@/constants/venues';
import { useFavoritesContext } from '@/contexts/FavoritesContext';

export default function VenueDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const venue = PLACES.find((place) => place.id === id);

  if (!venue) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text style={styles.errorTitle}>Venue not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Pressable style={styles.headerButton} onPress={() => router.back()}>
          <ArrowLeft size={22} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {venue.name}
        </Text>
        <Pressable
          style={styles.headerButton}
          onPress={() => toggleFavorite(venue.id)}
        >
          <Heart
            size={22}
            color={isFavorite(venue.id) ? '#9D4EDD' : '#FFFFFF'}
            fill={isFavorite(venue.id) ? '#9D4EDD' : 'transparent'}
          />
        </Pressable>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {venue.imageUrl ? (
          <Image source={{ uri: venue.imageUrl }} style={styles.heroImage} />
        ) : null}

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{venue.name}</Text>
            {venue.isTrending ? (
              <View style={styles.trendingBadge}>
                <Flame size={14} color="#FFA500" />
                <Text style={styles.trendingText}>Trending</Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.category}>{getCategoryLabel(venue.category)}</Text>

          <View style={styles.locationRow}>
            <MapPin size={16} color="#999999" />
            <Text style={styles.locationText}>
              {venue.area ? `${venue.area}, ${venue.city}` : venue.city}
            </Text>
          </View>

          {venue.description ? (
            <Text style={styles.description}>{venue.description}</Text>
          ) : null}

          {venue.tags.length > 0 ? (
            <View style={styles.tagsRow}>
              {venue.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {venue.hasDeal ? (
            <View style={styles.dealBox}>
              <Gift size={16} color="#5B9BD5" />
              <Text style={styles.dealText}>Partner offer available at this venue</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  container: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: 240,
    backgroundColor: '#1A1A1A',
  },
  content: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 8,
  },
  name: {
    flex: 1,
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  trendingText: {
    color: '#FFA500',
    fontSize: 12,
    fontWeight: '600',
  },
  category: {
    fontSize: 14,
    color: '#5B9BD5',
    fontWeight: '600',
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  locationText: {
    color: '#CCCCCC',
    fontSize: 15,
  },
  distance: {
    color: '#666666',
    fontSize: 13,
    marginBottom: 16,
  },
  description: {
    color: '#999999',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  dealBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#0A0A0A',
    borderWidth: 1,
    borderColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
  },
  dealText: {
    flex: 1,
    color: '#CCCCCC',
    fontSize: 14,
    lineHeight: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#5B9BD5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
