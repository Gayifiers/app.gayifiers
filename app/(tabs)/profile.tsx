import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings } from 'lucide-react-native';
import TopNavigation from '@/components/TopNavigation';
import { useRouter } from 'expo-router';

const PRIVACY_URL = 'https://www.uncletullio.co.uk/gayifiers/privacy';
const SUPPORT_URL = 'https://www.uncletullio.co.uk/gayifiers/support';

export default function ProfileScreen() {
  const router = useRouter();

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
          <Text style={styles.identityTitle}>Welcome to Gayifiers</Text>
          <Text style={styles.identitySubtitle}>
            Browse curated LGBTQ+ friendly venues in Bangkok. No account required.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this app</Text>
          <Text style={styles.sectionDescription}>
            Gayifiers helps travelers discover welcoming bars, clubs, saunas, and wellness venues with clear descriptions, photos, and area context.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <Pressable
            style={({ pressed }) => [styles.linkRow, pressed && styles.linkRowPressed]}
            onPress={() => Linking.openURL(SUPPORT_URL)}
          >
            <Text style={styles.linkTitle}>Contact support</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.linkRow, pressed && styles.linkRowPressed]}
            onPress={() => Linking.openURL(PRIVACY_URL)}
          >
            <Text style={styles.linkTitle}>Privacy & data</Text>
          </Pressable>
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Gayifiers 1.0</Text>
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
    borderColor: '#2A2A2F',
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
    fontSize: 14,
    color: '#999999',
    lineHeight: 22,
  },
  linkRow: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#0A0A0A',
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  linkRowPressed: {
    opacity: 0.7,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
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
