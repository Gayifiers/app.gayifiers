import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PLACES } from '@/data/places';
import { getCategoryLabel, VenueCategory } from '@/constants/venues';
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

const CURRENT_CITY = {
  name: 'Bangkok',
  emoji: '🇹🇭',
  flag: '🇹🇭'
};

export default function ExploreScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<VenueCategory | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState(STRINGS.LOCATION_ALL_AREAS);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const filteredVenues = PLACES.filter(venue => {
    const categoryMatch = selectedCategory === 'all' || venue.category === selectedCategory;
    const locationMatch = selectedLocation === STRINGS.LOCATION_ALL_AREAS || venue.area === selectedLocation;
    return categoryMatch && locationMatch;
  });

  const handleFilterPress = () => setFilterModalVisible(true);

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
              <Ionicons name="options-outline" size={20} color="#9D4EDD" />
            </Pressable>
          </View>
        </View>

        {/* Current city */}
        <View style={styles.citySection}>
          <View style={styles.currentCityBanner}>
            <Text style={styles.currentCityEmoji}>{CURRENT_CITY.emoji}</Text>
            <Text style={styles.currentCityText}>
              Currently showing venues in <Text style={styles.currentCityName}>Bangkok</Text>
            </Text>
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
                        <Ionicons name="flame" size={12} color="#FFA500" />
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

                  <View style={styles.tagsRow}>
                    {venue.tags.slice(0, 3).map((tag) => (
                      <View key={tag} style={styles.tagChip}>
                        <Text style={styles.tagChipText}>{tag}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.venueDetails}>
                    <View style={styles.locationRow}>
                      <Ionicons name="location-outline" size={14} color="#999999" />
                      <Text style={styles.cityText}>{venue.area || STRINGS.LOCATION_BANGKOK}</Text>
                    </View>
                  </View>

                  <Text style={styles.venueDescription} numberOfLines={2}>
                    {venue.description}
                  </Text>

                  {venue.hasDeal && (
                    <View style={styles.dealFooter}>
                      <Ionicons name="gift-outline" size={12} color="#666666" />
                      <Text style={styles.dealFooterText}>Partner offer available</Text>
                    </View>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <Pressable style={styles.filterModalOverlay} onPress={() => setFilterModalVisible(false)}>
          <Pressable style={styles.filterModalSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.filterModalHeader}>
              <Text style={styles.filterModalTitle}>{STRINGS.ALERT_FILTERS_TITLE}</Text>
              <Pressable onPress={() => setFilterModalVisible(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </Pressable>
            </View>

            {CATEGORIES.map((category) => (
              <Pressable
                key={category.value}
                style={styles.filterModalRow}
                onPress={() => {
                  setSelectedCategory(category.value);
                  setFilterModalVisible(false);
                }}
              >
                <Text style={styles.filterModalRowText}>{category.label}</Text>
                {selectedCategory === category.value && (
                  <Ionicons name="checkmark" size={20} color="#9D4EDD" />
                )}
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
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
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tagChip: {
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagChipText: {
    fontSize: 11,
    color: '#AAAAAA',
    fontWeight: '500',
  },
  venueDetails: {
    flexDirection: 'row',
    alignItems: 'center',
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
  bottomPadding: {
    height: 100,
  },
  filterModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  filterModalSheet: {
    backgroundColor: '#0A0A0A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  filterModalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
  },
  filterModalRowText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});