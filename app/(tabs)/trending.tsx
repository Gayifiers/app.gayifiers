import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lock, TrendingUp, Crown, MapPin, Flame, Gift } from 'lucide-react-native';
import TopNavigation from '@/components/TopNavigation';
import { MOCK_VENUES, MOCK_USER, getCategoryLabel } from '@/constants/venues';

export default function TrendingScreen() {
  const userTier = MOCK_USER.membershipTier;
  const isPlus = userTier === 'plus';
  const trendingVenues = MOCK_VENUES.filter(venue => venue.isTrending);

  if (!isPlus) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <TopNavigation />
        <View style={styles.container}>
          <View style={styles.lockContainer}>
            <View style={styles.iconCircle}>
              <Lock size={48} color="#9D4EDD" />
            </View>

            <TrendingUp size={64} color="#333333" style={styles.trendingIcon} />

            <Text style={styles.title}>Trending Spots</Text>
            <Text style={styles.subtitle}>
              Discover popular LGBTQ+ venues trending this week
            </Text>

            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>Trending this week</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>Popular recently</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>Frequently visited by travelers</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>Curated recommendations</Text>
              </View>
            </View>

            <Pressable style={styles.upgradeButton}>
              <Crown size={20} color="#000000" />
              <Text style={styles.upgradeButtonText}>Upgrade to Plus</Text>
            </Pressable>

            <Text style={styles.priceText}>
              Unlock all premium features and exclusive deals
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <TopNavigation />
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Trending</Text>
          <Text style={styles.headerSubtitle}>
            Popular venues this week
          </Text>
        </View>

        <View style={styles.section}>
          {trendingVenues.map((venue, index) => {
            const showImage = index % 3 !== 2;

            return (
              <Pressable
                key={venue.id}
                style={({ pressed }) => [
                  styles.venueCard,
                  pressed && styles.venueCardPressed,
                ]}
              >
                {showImage && (
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: venue.imageUrl }}
                      style={styles.venueImage}
                    />
                  </View>
                )}

                <View style={styles.venueContent}>
                  <View style={styles.venueHeader}>
                    <View style={styles.venueHeaderLeft}>
                      <Text style={styles.venueName} numberOfLines={1}>
                        {venue.name}
                      </Text>
                      <View style={styles.trendingPill}>
                        <Flame size={10} color="#9D4EDD" />
                        <Text style={styles.trendingPillText}>Trending</Text>
                      </View>
                    </View>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>
                        {getCategoryLabel(venue.category)}
                      </Text>
                    </View>
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
                        style={styles.tagChipPlus}
                      >
                        <Text style={styles.tagTextPlus}>
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
            );
          })}
        </View>

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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#999999',
    lineHeight: 22,
  },
  lockContainer: {
    alignItems: 'center',
    maxWidth: 400,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#0A0A0A',
    borderWidth: 2,
    borderColor: '#9D4EDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  trendingIcon: {
    position: 'absolute',
    top: -20,
    opacity: 0.1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  featuresList: {
    width: '100%',
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9D4EDD',
    marginRight: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#CCCCCC',
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9D4EDD',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  priceText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  venueCard: {
    backgroundColor: '#0A0A0A',
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    overflow: 'hidden',
  },
  venueCardPressed: {
    opacity: 0.7,
  },
  imageContainer: {
    position: 'relative',
  },
  venueImage: {
    width: '100%',
    height: 180,
  },
  dealBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  dealBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  venueContent: {
    padding: 16,
  },
  venueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
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
  categoryBadge: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
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
  tagChipPlus: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#9D4EDD',
    backgroundColor: 'rgba(157, 78, 221, 0.08)',
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
