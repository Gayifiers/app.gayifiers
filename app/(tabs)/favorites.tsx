import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MapPin, Flame, Gift } from 'lucide-react-native';
import { MOCK_VENUES, MOCK_USER, getCategoryLabel } from '@/constants/venues';
import TopNavigation from '@/components/TopNavigation';

export default function FavoritesScreen() {
  const favoriteVenues = MOCK_VENUES.slice(0, 3);
  const userTier = MOCK_USER.membershipTier;
  const isPlus = userTier === 'plus';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <TopNavigation />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Favorites</Text>
          <Text style={styles.subtitle}>
            Your saved LGBTQ+ friendly venues
          </Text>
        </View>

        {favoriteVenues.length === 0 ? (
          <View style={styles.emptyState}>
            <Heart size={64} color="#333333" />
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyMessage}>
              Start exploring and save your favorite venues
            </Text>
          </View>
        ) : (
          <View style={styles.venuesContainer}>
            {favoriteVenues.map((venue) => (
              <Pressable
                key={venue.id}
                style={({ pressed }) => [
                  styles.venueCard,
                  pressed && styles.venueCardPressed,
                ]}
              >
                <View style={styles.venueContent}>
                  <View style={styles.venueHeader}>
                    <View style={styles.venueHeaderLeft}>
                      <Text style={styles.venueName} numberOfLines={1}>
                        {venue.name}
                      </Text>
                      {venue.isTrending && (
                        <View style={styles.trendingPill}>
                          <Flame size={10} color="#9D4EDD" />
                          <Text style={styles.trendingPillText}>Trending</Text>
                        </View>
                      )}
                    </View>
                    <Pressable style={styles.favoriteButton}>
                      <Heart size={20} color="#9D4EDD" fill="#9D4EDD" />
                    </Pressable>
                  </View>

                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>
                      {getCategoryLabel(venue.category)}
                    </Text>
                  </View>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.tagsContainer}
                    contentContainerStyle={styles.tagsContent}
                  >
                    {venue.tags.map((tag, tagIndex) => (
                      <View
                        key={tagIndex}
                        style={[
                          styles.tagChip,
                          isPlus && styles.tagChipPlus,
                        ]}
                      >
                        <Text style={[
                          styles.tagText,
                          isPlus && styles.tagTextPlus,
                        ]}>
                          {tag}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>

                  <View style={styles.venueDetails}>
                    <View style={styles.locationRow}>
                      <MapPin size={14} color="#999999" />
                      <Text style={styles.cityText}>{venue.city}</Text>
                    </View>
                    <Text style={styles.distanceText}>{venue.distanceLabel}</Text>
                  </View>

                  <Text style={styles.venueDescription} numberOfLines={2}>
                    {venue.description}
                  </Text>

                  {venue.deal && (
                    <View style={styles.dealFooter}>
                      <Gift size={12} color="#666666" />
                      <Text style={styles.dealFooterText}>Scan QR to unlock member deal</Text>
                    </View>
                  )}
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
    lineHeight: 22,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 15,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 22,
  },
  venuesContainer: {
    paddingHorizontal: 20,
  },
  venueCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    marginBottom: 16,
    overflow: 'hidden',
  },
  venueCardPressed: {
    opacity: 0.7,
  },
  venueContent: {
    padding: 16,
  },
  venueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  venueHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
    gap: 8,
  },
  venueName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    flexShrink: 1,
  },
  trendingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(157, 78, 221, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 3,
  },
  trendingPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9D4EDD',
  },
  favoriteButton: {
    padding: 4,
  },
  categoryBadge: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999999',
  },
  tagsContainer: {
    marginBottom: 12,
  },
  tagsContent: {
    gap: 6,
  },
  tagChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: 'transparent',
  },
  tagChipPlus: {
    borderColor: '#9D4EDD',
    backgroundColor: 'rgba(157, 78, 221, 0.08)',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  tagTextPlus: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9D4EDD',
  },
  venueDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cityText: {
    fontSize: 14,
    color: '#999999',
  },
  distanceText: {
    fontSize: 13,
    color: '#9D4EDD',
    fontWeight: '600',
  },
  venueDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  dealFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
  },
  dealFooterText: {
    fontSize: 11,
    color: '#666666',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 100,
  },
});
