import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, ChevronRight, Settings } from 'lucide-react-native';
import TopNavigation from '@/components/TopNavigation';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const handleFavoritesPress = () => {
    Alert. alert(
      'Preview Feature',
      'Login is required to use Favorites in the full version.',
      [{ text: 'OK' }]
    );
  };

  const handleLanguagePress = () => {
    Alert.alert(
      'Preview Feature',
      'Language switching will be available in a future update.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <TopNavigation />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
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

        <View style={styles.identityCard}>
          <View style={styles.avatarCircle}>
            <User size={32} color="#666666" />
          </View>
          <Text style={styles.identityTitle}>Visitor (Preview Mode)</Text>
          <Text style={styles.identitySubtitle}>
            You're currently browsing Gayifiers as a visitor.
          </Text>
          <Text style={styles.identityNote}>
            Login and membership features will be available in the full version.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Membership Levels</Text>
          <Text style={styles.sectionDescription}>
            Future access levels will include:
          </Text>

          <View style={styles.membershipCard}>
            <Text style={styles.membershipTier}>Visitor</Text>
            <Text style={styles.membershipFeature}>
              Browse venues and previews
            </Text>
          </View>

          <View style={styles.membershipCard}>
            <Text style={styles.membershipTier}>Member</Text>
            <Text style={styles.membershipFeature}>
              Save favorites and unlock full venue details
            </Text>
          </View>

          <View style={styles.membershipCard}>
            <Text style={styles.membershipTier}>Pro</Text>
            <Text style={styles.membershipFeature}>
              Priority access, advanced filters, and exclusive content
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <Pressable
            style={({ pressed }) => [
              styles.preferenceRow,
              pressed && styles.preferenceRowPressed,
            ]}
            onPress={handleFavoritesPress}
          >
            <View style={styles.preferenceLeft}>
              <Text style={styles.preferenceTitle}>Favorites</Text>
              <Text style={styles.preferenceSubtitle}>
                Save places you love (login required)
              </Text>
            </View>
            <ChevronRight size={18} color="#666666" />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.preferenceRow,
              pressed && styles.preferenceRowPressed,
            ]}
            onPress={handleLanguagePress}
          >
            <View style={styles.preferenceLeft}>
              <Text style={styles.preferenceTitle}>Language</Text>
              <Text style={styles.preferenceSubtitle}>
                Multi-language support coming soon
              </Text>
            </View>
            <ChevronRight size={18} color="#666666" />
          </Pressable>
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Gayifiers v0.1 (Preview)</Text>
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
  identityCard: {
    backgroundColor: '#0A0A0A',
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  identityTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  identitySubtitle: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  identityNote: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 16,
    lineHeight: 18,
  },
  membershipCard: {
    backgroundColor: '#0A0A0A',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    marginBottom: 12,
    opacity: 0.6,
  },
  membershipTier: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  membershipFeature: {
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#0A0A0A',
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    minHeight: 64,
  },
  preferenceRowPressed: {
    opacity: 0.7,
    backgroundColor: '#121212',
  },
  preferenceLeft: {
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  preferenceSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 18,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 80,
  },
});
