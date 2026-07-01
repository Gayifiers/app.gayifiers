import { View, Text, StyleSheet, Pressable, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

const PRIVACY_URL = 'https://www.uncletullio.co.uk/gayifiers/privacy';
const SUPPORT_URL = 'https://www.uncletullio.co.uk/gayifiers/support';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <Pressable
            style={({ pressed }) => [
              styles.settingsRow,
              pressed && styles.settingsRowPressed,
            ]}
            onPress={() => router.push('/(tabs)/favorites')}
          >
            <View style={styles.rowLeft}>
              <Text style={styles.rowTitle}>Favorites</Text>
              <Text style={styles.rowSubtitle}>View your saved venues</Text>
            </View>
            <ChevronRight size={18} color="#666666" />
          </Pressable>

          <View style={styles.settingsRowDisabled}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowTitle}>Notifications</Text>
              <Text style={styles.rowSubtitle}>Off</Text>
            </View>
          </View>

          <View style={styles.settingsRowDisabled}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowTitle}>App Language</Text>
              <Text style={styles.rowSubtitle}>English</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>

          <Pressable
            style={({ pressed }) => [
              styles.settingsRow,
              pressed && styles.settingsRowPressed,
            ]}
            onPress={() => Linking.openURL(SUPPORT_URL)}
          >
            <Text style={styles.rowTitle}>Support</Text>
            <ChevronRight size={18} color="#666666" />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.settingsRow,
              pressed && styles.settingsRowPressed,
            ]}
            onPress={() => Linking.openURL(PRIVACY_URL)}
          >
            <Text style={styles.rowTitle}>Privacy policy</Text>
            <ChevronRight size={18} color="#666666" />
          </Pressable>

          <View style={styles.settingsRowDisabled}>
            <Text style={styles.rowTitle}>App Version</Text>
            <Text style={styles.rowValueDisabled}>1.0.0</Text>
          </View>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 16,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  settingsRow: {
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
    minHeight: 56,
  },
  settingsRowPressed: {
    opacity: 0.7,
    backgroundColor: '#121212',
  },
  settingsRowDisabled: {
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
    minHeight: 56,
    opacity: 0.85,
  },
  rowLeft: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  rowSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#666666',
    marginTop: 2,
  },
  rowValueDisabled: {
    fontSize: 15,
    fontWeight: '400',
    color: '#666666',
  },
});
