import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Heart, MapPin, Tag, CheckCircle, Flame, Lock, Sparkles } from 'lucide-react-native';
import { PLACES } from '@/data/places';
import { MOCK_USER, getCategoryLabel } from '@/constants/venues';

export default function VenueDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const userTier = MOCK_USER.membershipTier;
  const isPlus = userTier === 'plus';

  const venue = PLACES.find(v => v.id === id);

  if (!venue) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Venue not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const displayedDescription = isPlus ? venue.description : venue.previewText;
  const displayedDistance = isPlus ? venue.distanceLabel : venue.areaLabel;
  const displayedTags = isPlus ? (venue?.tags || []) : (venue?.previewTags || []);

  const handleFavorite = () => {
    Alert.alert(
      'Preview Feature',
      'Login required in the full version',
      [{ text: 'OK' }]
    );
  };

  const handleLockedContent = () => {
    Alert.alert(
      'Upgrade to Plus',
      'Unlock member insights and exclusive features',
      [
        { text: 'Maybe Later', style: 'cancel' },
        { text: 'Learn More', onPress: () => {} }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color="#FFFFFF" />
          </Pressable>
          <Pressable
            style={styles.headerButton}
            onPress={handleFavorite}
          >
            <Heart size={24} color="#9D4EDD" />
          </Pressable>
        </View>

        {venue.imageUrl && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: venue.imageUrl }}
              style={styles.heroImage}
            />
            {venue.isTrending && isPlus && (
              <View style={styles.trendingBadge}>
                <Flame size={14} color="#FFA500" />
                <Text style={styles.trendingText}>Trending</Text>
              </View>
            )}
            {venue.isTrending && !isPlus && (
              <View style={styles.memberInsightBadge}>
                <Lock size={12} color="#9D4EDD" />
                <Text style={styles.memberInsightText}>Member insight</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.venueName}>{venue.name}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {getCategoryLabel(venue.category)}
              </Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <MapPin size={16} color="#9D4EDD" />
            <Text style={styles.cityText}>
              {venue.city}{venue.area ? ` · ${venue.area}` : ''}
            </Text>
            <Text style={styles.distanceText}>• {displayedDistance}</Text>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.description}>{displayedDescription}</Text>
            {!isPlus && (
              <Pressable
                style={({ pressed }) => [
                  styles.unlockButton,
                  pressed && styles.unlockButtonPressed,
                ]}
                onPress={handleLockedContent}
              >
                <Lock size={14} color="#9D4EDD" />
                <Text style={styles.unlockButtonText}>
                  See why members save this place
                </Text>
              </Pressable>
            )}
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Details</Text>

            {venue.area && (
              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <MapPin size={16} color="#999999" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Area</Text>
                  <Text style={styles.infoValue}>{venue.area}</Text>
                </View>
              </View>
            )}

            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Tag size={16} color="#999999" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Category</Text>
                <Text style={styles.infoValue}>
                  {getCategoryLabel(venue.category)}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <CheckCircle size={16} color="#999999" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Community</Text>
                <Text style={styles.infoValue}>LGBTQ+ Friendly</Text>
              </View>
            </View>

            {venue.isTrending && (
              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  {isPlus ? (
                    <Flame size={16} color="#FFA500" />
                  ) : (
                    <Lock size={16} color="#9D4EDD" />
                  )}
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Status</Text>
                  <Text style={[styles.infoValue, isPlus ? { color: '#FFA500' } : { color: '#9D4EDD' }]}>
                    {isPlus ? 'Trending Now' : '🔒 Member insight – Used by members to decide'}
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.tagsSection}>
            <View style={styles.tagsSectionHeader}>
              <Text style={styles.sectionTitle}>Highlights</Text>
              {!isPlus && (
                <View style={styles.previewBadge}>
                  <Text style={styles.previewBadgeText}>Preview</Text>
                </View>
              )}
            </View>
            <View style={styles.tagsGrid}>
              {(displayedTags || []).map((tag, index) => (
                <View key={index} style={styles.tagChip}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
              {!isPlus && (venue?.tags?.length || 0) > 2 && (
                <Pressable
                  style={({ pressed }) => [
                    styles.lockedTagChip,
                    pressed && styles.lockedTagChipPressed,
                  ]}
                  onPress={handleLockedContent}
                >
                  <Lock size={12} color="#9D4EDD" />
                  <Text style={styles.lockedTagText}>
                    +{(venue?.tags?.length || 0) - 2} more insights
                  </Text>
                </Pressable>
              )}
            </View>
          </View>

          {venue.membershipHint && (
            <View style={styles.membershipHintCard}>
              <Sparkles size={16} color="#9D4EDD" />
              <Text style={styles.membershipHintText}>
                {venue.membershipHint}
              </Text>
            </View>
          )}

          {venue.deal && (
            <View style={styles.dealSection}>
              <View style={styles.dealBadge}>
                <Text style={styles.dealBadgeText}>MEMBER PERK</Text>
              </View>
              <Text style={styles.dealTitle}>
                {isPlus ? venue.deal.badge : 'Exclusive member benefit available'}
              </Text>
              {isPlus ? (
                <Text style={styles.dealDescription}>
                  {venue.deal.description}
                </Text>
              ) : (
                <View>
                  <Text style={styles.dealDescriptionBlurred}>
                    Members can see specific details about this perk and how to claim it
                  </Text>
                  <Pressable
                    style={({ pressed }) => [
                      styles.insightsButton,
                      pressed && styles.insightsButtonPressed,
                    ]}
                    onPress={handleLockedContent}
                  >
                    <Sparkles size={14} color="#9D4EDD" />
                    <Text style={styles.insightsButtonText}>
                      Unlock member insights & perks
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          )}

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>
              {isPlus
                ? 'This is a preview version showing member features'
                : 'Viewing as visitor. Members get detailed insights and confidence from community knowledge'}
            </Text>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  imageContainer: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 280,
    backgroundColor: '#1A1A1A',
  },
  trendingBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  trendingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFA500',
  },
  memberInsightBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#9D4EDD',
  },
  memberInsightText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9D4EDD',
  },
  content: {
    paddingHorizontal: 20,
  },
  titleSection: {
    marginTop: 24,
    marginBottom: 12,
  },
  venueName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 34,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#9D4EDD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  cityText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9D4EDD',
  },
  distanceText: {
    fontSize: 14,
    color: '#666666',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#CCCCCC',
    marginBottom: 12,
  },
  unlockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(157, 78, 221, 0.08)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9D4EDD',
    alignSelf: 'flex-start',
  },
  unlockButtonPressed: {
    opacity: 0.7,
  },
  unlockButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9D4EDD',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  infoSection: {
    marginBottom: 32,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  infoIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0A0A0A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tagsSection: {
    marginBottom: 24,
  },
  tagsSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  previewBadge: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  previewBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#666666',
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#0A0A0A',
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999999',
  },
  lockedTagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(157, 78, 221, 0.08)',
    borderWidth: 1,
    borderColor: '#9D4EDD',
  },
  lockedTagChipPressed: {
    opacity: 0.7,
  },
  lockedTagText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9D4EDD',
  },
  membershipHintCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: 'rgba(157, 78, 221, 0.08)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#9D4EDD',
    marginBottom: 24,
  },
  membershipHintText: {
    fontSize: 13,
    color: '#9D4EDD',
    fontWeight: '600',
    flex: 1,
  },
  dealSection: {
    padding: 20,
    backgroundColor: '#0A0A0A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#9D4EDD',
    marginBottom: 24,
  },
  dealBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#9D4EDD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  dealBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: 0.5,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  dealDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#CCCCCC',
  },
  dealDescriptionBlurred: {
    fontSize: 13,
    lineHeight: 19,
    color: '#666666',
    marginBottom: 12,
  },
  insightsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(157, 78, 221, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9D4EDD',
    alignSelf: 'flex-start',
  },
  insightsButtonPressed: {
    opacity: 0.7,
  },
  insightsButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9D4EDD',
  },
  disclaimer: {
    padding: 12,
    backgroundColor: '#0A0A0A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    marginBottom: 24,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 16,
  },
  bottomPadding: {
    height: 40,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#9D4EDD',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});