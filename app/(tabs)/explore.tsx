import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Flame, SlidersHorizontal, Gift, Crown } from 'lucide-react-native';
import { MOCK_VENUES, MOCK_USER, getCategoryLabel, VenueCategory } from '@/constants/venues';
import TopNavigation from '@/components/TopNavigation';

const CATEGORIES: { value: VenueCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'bar', label: 'Bars' },
  { value: 'club', label: 'Clubs' },
  { value: 'cafe', label: 'Cafes' },
  { value: 'restaurant', label: 'Restaurants' },
  { value: 'hotel', label: 'Hotels' },
];

const LOCATIONS = [
  'All Locations',
  'Tokyo',
  'Bangkok',
  'Taipei',
  'Seoul',
  'Singapore',
  'Hong Kong',
];

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState<VenueCategory | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const userTier = MOCK_USER.membershipTier;
  const isPlus = userTier === 'plus';

  const filteredVenues = MOCK_VENUES.filter(venue => {
    const categoryMatch = selectedCategory === 'all' || venue.category === selectedCategory;
    const locationMatch = selectedLocation === 'All Locations' || venue.city === selectedLocation;
    return categoryMatch && locationMatch;
  });

  const handleFilterPress = () => {
    if (!isPlus) {
      Alert.alert(
        'Plus Feature',
        'Filtering by tags is available for Plus members',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert('Filters', 'Filter modal would open here');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <TopNavigation />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.title}>Explore</Text>
              <Text style={styles.subtitle}>
                LGBTQ+ venues near you
              </Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.filterButton,
                pressed && styles.filterButtonPressed,
              ]}
              onPress={handleFilterPress}
            >
              <SlidersHorizontal size={20} color={isPlus ? '#9D4EDD' : '#666666'} />
            </Pressable>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {CATEGORIES.map((category) => (
            <Pressable
              key={category.value}
              style={[
                styles.filterPill,
                selectedCategory === category.value && styles.filterPillActive,
              ]}
              onPress={() => setSelectedCategory(category.value)}
            >
              <Text style={[
                styles.filterPillText,
                selectedCategory === category.value && styles.filterPillTextActive,
              ]}>
                {category.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.locationContainer}
          contentContainerStyle={styles.locationContent}
        >
          {LOCATIONS.map((location) => (
            <Pressable
              key={location}
              style={[
                styles.locationPill,
                selectedLocation === location && styles.locationPillActive,
              ]}
              onPress={() => setSelectedLocation(location)}
            >
              <Text style={[
                styles.locationPillText,
                selectedLocation === location && styles.locationPillTextActive,
              ]}>
                {location}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.section}>
          {filteredVenues.map((venue, index) => {
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
                    {venue.isTrending && (
                      <View style={styles.trendingBadge}>
                        <Flame size={12} color="#FFA500" />
                      </View>
                    )}
                  </View>
                )}

                <View style={styles.venueContent}>
                  <View style={styles.venueHeader}>
                    <Text style={styles.venueName} numberOfLines={1}>
                      {venue.name}
                    </Text>
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
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  filterButtonPressed: {
    opacity: 0.7,
  },
  filterContainer: {
    marginBottom: 24,
  },
  filterContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterPill: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    marginRight: 8,
  },
  filterPillActive: {
    backgroundColor: '#9D4EDD',
    borderColor: '#9D4EDD',
  },
  filterPillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999999',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },
  locationContainer: {
    marginBottom: 24,
  },
  locationContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  locationPill: {
    backgroundColor: '#0A0A0A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    marginRight: 8,
  },
  locationPillActive: {
    backgroundColor: '#9D4EDD',
    borderColor: '#9D4EDD',
  },
  locationPillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999999',
  },
  locationPillTextActive: {
    color: '#FFFFFF',
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
  imageContainer: {
    position: 'relative',
  },
  venueImage: {
    width: '100%',
    height: 180,
  },
  trendingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 165, 0, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
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
    marginBottom: 12,
  },
  venueName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
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
