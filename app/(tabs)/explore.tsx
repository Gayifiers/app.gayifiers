import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Flame, SlidersHorizontal, Gift, Lock, Sparkles } from 'lucide-react-native';
import { PLACES } from '@/data/places';
import { MOCK_USER, getCategoryLabel, VenueCategory } from '@/constants/venues';
import TopNavigation from '@/components/TopNavigation';
import { STRINGS } from '@/constants/strings';
import { useRouter } from 'expo-router';

const CATEGORIES: { value: VenueCategory | 'all'; label: string }[] = [
  { value: 'all', label: STRINGS.CATEGORY_ALL },
  { value: 'bar_club', label: STRINGS.CATEGORY_BAR_CLUB },
  { value: 'sauna', label: STRINGS.CATEGORY_SAUNA },
  { value: 'spa', label: STRINGS.CATEGORY_SPA },
];

const LOCATIONS = [
  STRINGS.LOCATION_ALL_AREAS,
];

const COMING_SOON_CITIES = [
  { name: 'Tokyo', emoji: '🗼' },
  { name: 'Osaka', emoji: '🏯' },
  { name: 'Seoul', emoji: '🎎' },
  { name: 'Taipei', emoji: '🏮' },
  { name: 'Singapore', emoji: '🦁' },
  { name: 'Hong Kong', emoji: '🇭🇰' },
];

const CURRENT_CITY = {
  name: 'Bangkok',
  emoji: '🇹🇭',
  flag: '🇹🇭'
};

export default function ExploreScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<VenueCategory | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState(STRINGS.LOCATION_ALL_AREAS);
  const userTier = MOCK_USER.membershipTier;
  const isPlus = userTier === 'plus';

  const filteredVenues = PLACES.filter(venue => {
    const categoryMatch = selectedCategory === 'all' || venue.category === selectedCategory;
    const locationMatch = selectedLocation === STRINGS.LOCATION_ALL_AREAS || venue.area === selectedLocation;
    return categoryMatch && locationMatch;
  });

  const handleFilterPress = () => {
    if (!isPlus) {
      Alert.alert(
        STRINGS.ALERT_PLUS_FEATURE_TITLE,
        STRINGS.ALERT_PLUS_FEATURE_MESSAGE,
        [{ text: STRINGS.ALERT_OK }]
      );
    } else {
      Alert.alert(STRINGS.ALERT_FILTERS_TITLE, STRINGS.ALERT_FILTERS_MESSAGE);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <TopNavigation />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.title}>{STRINGS.EXPLORE_TITLE}</Text>
              <Text style={styles.subtitle}>
                {STRINGS.EXPLORE_SUBTITLE}
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

        {/* Current City & Coming Soon */}
        <View style={styles.citySection}>
          <View style={styles.currentCityBanner}>
            <Text style={styles.currentCityEmoji}>{CURRENT_CITY.emoji}</Text>
            <Text style={styles.currentCityText}>
              Currently showing venues in <Text style={styles.currentCityName}>Bangkok</Text>
            </Text>
          </View>

          <View style={styles.comingSoonCompact}>
            <Text style={styles.comingSoonCompactTitle}>Coming Soon</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.comingSoonScroll}
            >
              {COMING_SOON_CITIES.map((city, index) => (
                <View key={index} style={styles.cityChip}>
                  <Text style={styles.cityChipEmoji}>{city.emoji}</Text>
                  <Text style={styles.cityChipName}>{city.name}</Text>
                </View>
              ))}
            </ScrollView>
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

        {LOCATIONS.length > 1 && (
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
        )}

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
                onPress={() => router.push(`/venue/${venue.id}`)}
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

                  {/* Member Insights Section - Replaces Tags */}
                  {isPlus ? (
                    <View style={styles.memberInsightBox}>
                      <Sparkles size={14} color="#9D4EDD" />
                      <Text style={styles.memberInsightText}>
                        Popular with community
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.lockedInsightBox}>
                      <Lock size={12} color="#666666" />
                      <Text style={styles.lockedInsightText}>
                        🔒 Member insights available
                      </Text>
                    </View>
                  )}

                  <View style={styles.venueDetails}>
                    <View style={styles.locationRow}>
                      <MapPin size={14} color="#999999" />
                      <Text style={styles.cityText}>{venue.area || STRINGS.LOCATION_BANGKOK}</Text>
                    </View>
                    <Text style={styles.distanceText}>{venue.distanceLabel}</Text>
                  </View>

                  <Text style={styles.venueDescription} numberOfLines={2}>
                    {venue.description}
                  </Text>

                  {venue.deal && (
                    <View style={styles.dealFooter}>
                      <Gift size={12} color="#666666" />
                      <Text style={styles.dealFooterText}>{STRINGS.SCAN_QR_DEAL}</Text>
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
  // New Member Insight Styles
  memberInsightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(157, 78, 221, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9D4EDD',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  memberInsightText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9D4EDD',
  },
  lockedInsightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#0A0A0A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  lockedInsightText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
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
  citySection: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  currentCityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(157, 78, 221, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(157, 78, 221, 0.3)',
    marginBottom: 16,
    gap: 10,
  },
  currentCityEmoji: {
    fontSize: 24,
  },
  currentCityText: {
    fontSize: 13,
    color: '#999999',
    fontWeight: '500',
  },
  currentCityName: {
    fontSize: 13,
    color: '#9D4EDD',
    fontWeight: '700',
  },
  comingSoonCompact: {
    marginBottom: 8,
  },
  comingSoonCompactTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  comingSoonScroll: {
    gap: 8,
  },
  cityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    gap: 6,
    opacity: 0.6,
  },
  cityChipEmoji: {
    fontSize: 16,
  },
  cityChipName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomPadding: {
    height: 100,
  },
});