import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tag, Lock, Crown } from 'lucide-react-native';
import { MOCK_DEALS, MOCK_USER } from '@/constants/venues';
import TopNavigation from '@/components/TopNavigation';

export default function DealsScreen() {
  const userTier = MOCK_USER.membershipTier;

  const canAccessDeal = (requiredTier: 'free' | 'plus') => {
    if (userTier === 'guest') return false;
    if (userTier === 'free') return requiredTier === 'free';
    return true;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <TopNavigation />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Deals</Text>
          <Text style={styles.subtitle}>
            Exclusive benefits at partner venues
          </Text>
        </View>

        <View style={[
          styles.tierBanner,
          userTier === 'guest' && styles.tierBannerGuest,
          userTier === 'free' && styles.tierBannerFree,
          userTier === 'plus' && styles.tierBannerPlus,
        ]}>
          {userTier === 'plus' && <Crown size={20} color="#FFD700" />}
          {userTier !== 'plus' && <Tag size={20} color="#999999" />}
          <View style={styles.tierTextContainer}>
            <Text style={styles.tierTitle}>
              {userTier === 'guest' && 'Guest Access'}
              {userTier === 'free' && 'Free Member'}
              {userTier === 'plus' && 'Plus Member'}
            </Text>
            <Text style={styles.tierSubtitle}>
              {userTier === 'guest' && 'Sign up to unlock deals'}
              {userTier === 'free' && 'Upgrade to Plus for all deals'}
              {userTier === 'plus' && 'All deals unlocked'}
            </Text>
          </View>
        </View>

        {userTier === 'guest' && (
          <View style={styles.emptyState}>
            <Lock size={64} color="#333333" />
            <Text style={styles.emptyTitle}>Deals Locked</Text>
            <Text style={styles.emptyMessage}>
              Create a free account to access exclusive partner deals and benefits
            </Text>
          </View>
        )}

        {userTier !== 'guest' && (
          <View style={styles.dealsContainer}>
            {MOCK_DEALS.map((deal) => {
              const hasAccess = canAccessDeal(deal.requiredTier);

              return (
                <Pressable
                  key={deal.id}
                  style={({ pressed }) => [
                    styles.dealCard,
                    !hasAccess && styles.dealCardLocked,
                    pressed && styles.dealCardPressed,
                  ]}
                >
                  {!hasAccess && (
                    <View style={styles.lockOverlay}>
                      <Lock size={32} color="#9D4EDD" />
                      <Text style={styles.lockText}>Plus Only</Text>
                    </View>
                  )}

                  <View style={styles.dealContent}>
                    <View style={styles.benefitBadge}>
                      <Tag size={14} color="#9D4EDD" />
                      <Text style={styles.benefitText}>{deal.benefit}</Text>
                    </View>

                    <Text style={styles.dealVenueName}>{deal.venueName}</Text>

                    {hasAccess ? (
                      <Text style={styles.dealDescription}>
                        {deal.description}
                      </Text>
                    ) : (
                      <Text style={styles.dealDescriptionLocked}>
                        Unlock with Plus membership to see details
                      </Text>
                    )}

                    <View style={styles.tierRequiredBadge}>
                      <Text style={styles.tierRequiredText}>
                        {deal.requiredTier === 'free' ? 'Free' : 'Plus'}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
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
  tierBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
  },
  tierBannerGuest: {
    backgroundColor: '#0A0A0A',
    borderColor: '#1A1A1A',
  },
  tierBannerFree: {
    backgroundColor: '#0A0A0A',
    borderColor: '#1A1A1A',
  },
  tierBannerPlus: {
    backgroundColor: '#1A1A0D',
    borderColor: '#FFD700',
  },
  tierTextContainer: {
    flex: 1,
  },
  tierTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  tierSubtitle: {
    fontSize: 14,
    color: '#999999',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
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
  dealsContainer: {
    paddingHorizontal: 20,
  },
  dealCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    overflow: 'hidden',
    marginBottom: 16,
  },
  dealCardLocked: {
    opacity: 0.6,
  },
  dealCardPressed: {
    opacity: 0.7,
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  lockText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#9D4EDD',
  },
  dealContent: {
    padding: 16,
  },
  benefitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    gap: 6,
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9D4EDD',
  },
  dealVenueName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  dealDescription: {
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
    marginBottom: 12,
  },
  dealDescriptionLocked: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  tierRequiredBadge: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  tierRequiredText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999999',
  },
  bottomPadding: {
    height: 32,
  },
});
