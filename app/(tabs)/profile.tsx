import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Shield, Heart, Crown, Info, Settings } from 'lucide-react-native';
import { MOCK_USER } from '@/constants/venues';
import TopNavigation from '@/components/TopNavigation';
import { STRINGS } from '@/constants/strings';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const userTier = MOCK_USER.membershipTier;

  const tierColors = {
    guest: '#666666',
    free: '#9D4EDD',
    plus: '#FFD700',
  };

  const tierBackgrounds = {
    guest: '#1A1A1A',
    free: '#1A0F26',
    plus: '#1A1A0D',
  };

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case 'guest':
        return STRINGS.TIER_GUEST;
      case 'free':
        return STRINGS.TIER_FREE_MEMBER;
      case 'plus':
        return STRINGS.TIER_PLUS_MEMBER;
      default:
        return STRINGS.TIER_GUEST;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <TopNavigation />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{STRINGS.PROFILE_TITLE}</Text>
          <Pressable
            style={({ pressed }) => [
              styles.settingsButton,
              pressed && styles.settingsButtonPressed,
            ]}
            onPress={() => router.push('/settings')}
          >
            <Settings size={24} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.profileCard}>
          <View style={[
            styles.avatarCircle,
            { backgroundColor: tierBackgrounds[userTier] }
          ]}>
            <User size={32} color={tierColors[userTier]} />
          </View>

          <Text style={styles.userName}>{STRINGS.USER_NAME}</Text>

          <View style={[
            styles.tierBadge,
            { backgroundColor: tierBackgrounds[userTier] }
          ]}>
            {userTier === 'plus' && <Crown size={16} color={tierColors[userTier]} />}
            <Text style={[styles.tierText, { color: tierColors[userTier] }]}>
              {getTierLabel(userTier)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{STRINGS.ABOUT_TITLE}</Text>
          <View style={styles.infoCard}>
            <Heart size={20} color="#9D4EDD" />
            <Text style={styles.infoText}>
              {STRINGS.ABOUT_DESCRIPTION}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{STRINGS.PRIVACY_TITLE}</Text>
          <View style={styles.privacyCard}>
            <Shield size={20} color="#9D4EDD" />
            <View style={styles.privacyTextContainer}>
              <Text style={styles.privacyTitle}>{STRINGS.PRIVACY_SUBTITLE}</Text>
              <Text style={styles.privacyText}>
                {STRINGS.PRIVACY_DESCRIPTION}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{STRINGS.MEMBERSHIP_TITLE}</Text>

          <View style={styles.tierInfoCard}>
            <View style={styles.tierInfoHeader}>
              <Text style={styles.tierInfoTitle}>{STRINGS.TIER_GUEST_NAME}</Text>
              <Text style={styles.tierInfoPrice}>{STRINGS.TIER_GUEST_PRICE}</Text>
            </View>
            <Text style={styles.tierInfoFeature}>{STRINGS.TIER_GUEST_FEATURE_1}</Text>
            <Text style={styles.tierInfoFeature}>{STRINGS.TIER_GUEST_FEATURE_2}</Text>
          </View>

          <View style={styles.tierInfoCard}>
            <View style={styles.tierInfoHeader}>
              <Text style={styles.tierInfoTitle}>{STRINGS.TIER_FREE_NAME}</Text>
              <Text style={styles.tierInfoPrice}>{STRINGS.TIER_FREE_PRICE}</Text>
            </View>
            <Text style={styles.tierInfoFeature}>{STRINGS.TIER_FREE_FEATURE_1}</Text>
            <Text style={styles.tierInfoFeature}>{STRINGS.TIER_FREE_FEATURE_2}</Text>
            <Text style={styles.tierInfoFeature}>{STRINGS.TIER_FREE_FEATURE_3}</Text>
          </View>

          <View style={[styles.tierInfoCard, styles.tierInfoCardPlus]}>
            <View style={styles.tierInfoHeader}>
              <View style={styles.tierTitleRow}>
                <Text style={styles.tierInfoTitle}>{STRINGS.TIER_PLUS_NAME}</Text>
                <Crown size={18} color="#FFD700" />
              </View>
              <Text style={styles.tierInfoPrice}>{STRINGS.TIER_PLUS_PRICE}</Text>
            </View>
            <Text style={styles.tierInfoFeature}>{STRINGS.TIER_PLUS_FEATURE_1}</Text>
            <Text style={styles.tierInfoFeature}>{STRINGS.TIER_PLUS_FEATURE_2}</Text>
            <Text style={styles.tierInfoFeature}>{STRINGS.TIER_PLUS_FEATURE_3}</Text>
            <Text style={styles.tierInfoFeature}>{STRINGS.TIER_PLUS_FEATURE_4}</Text>
          </View>
        </View>

        <View style={styles.disclaimer}>
          <Info size={16} color="#999999" />
          <Text style={styles.disclaimerText}>
            {STRINGS.DISCLAIMER}
          </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  settingsButtonPressed: {
    opacity: 0.7,
  },
  profileCard: {
    backgroundColor: '#0A0A0A',
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
    borderWidth: 1,
  },
  tierText: {
    fontSize: 14,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#0A0A0A',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
  },
  privacyCard: {
    flexDirection: 'row',
    backgroundColor: '#0A0A0A',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    gap: 12,
  },
  privacyTextContainer: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  privacyText: {
    fontSize: 13,
    color: '#999999',
    lineHeight: 19,
  },
  tierInfoCard: {
    backgroundColor: '#0A0A0A',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  tierInfoCardPlus: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  tierInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  tierTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tierInfoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tierInfoPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999999',
  },
  tierInfoFeature: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 6,
  },
  disclaimer: {
    flexDirection: 'row',
    backgroundColor: '#0A0A0A',
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    gap: 8,
    marginBottom: 24,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    color: '#666666',
    lineHeight: 16,
  },
  bottomPadding: {
    height: 100,
  },
});
