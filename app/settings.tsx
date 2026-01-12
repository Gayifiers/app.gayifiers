import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();

  const handleAccountPress = () => {
    Alert.alert(
      'Preview Feature',
      'Account login and membership management will be available in the full version.',
      [{ text: 'OK' }]
    );
  };

  const handleMembershipPress = () => {
    Alert.alert(
      'Preview Feature',
      'Membership features will be unlocked after login in the full version.',
      [{ text: 'OK' }]
    );
  };

  const handleFavoritesPress = () => {
    router.push('/(tabs)/favorites');
  };

  const handleNotificationsPress = () => {
    Alert.alert(
      'Preview Feature',
      'Notifications will be available in a future update.',
      [{ text: 'OK' }]
    );
  };

  const handleLanguagePress = () => {
    Alert.alert(
      'Preview Feature',
      'Language switching will be available in a future update. Currently the app follows your system language.',
      [{ text: 'OK' }]
    );
  };

  const handleAboutPress = () => {
    Alert.alert(
      'Gayifiers',
      'Gayifiers is a curated guide for international gay travelers.\n\nThis is an MVP preview version.',
      [{ text: 'OK' }]
    );
  };

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
          <Text style={styles.sectionTitle}>Account</Text>

          <Pressable
            style={({ pressed }) => [
              styles.settingsRow,
              pressed && styles.settingsRowPressed,
            ]}
            onPress={handleAccountPress}
          >
            <Text style={styles.rowTitle}>Account</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>Guest</Text>
              <ChevronRight size={18} color="#666666" />
            </View>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.settingsRow,
              pressed && styles.settingsRowPressed,
            ]}
            onPress={handleMembershipPress}
          >
            <Text style={styles.rowTitle}>Membership</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>Not activated</Text>
              <ChevronRight size={18} color="#666666" />
            </View>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <Pressable
            style={({ pressed }) => [
              styles.settingsRow,
              pressed && styles.settingsRowPressed,
            ]}
            onPress={handleFavoritesPress}
          >
            <View style={styles.rowLeft}>
              <Text style={styles.rowTitle}>Favorites</Text>
              <Text style={styles.rowSubtitle}>Save places for later</Text>
            </View>
            <ChevronRight size={18} color="#666666" />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.settingsRow,
              pressed && styles.settingsRowPressed,
            ]}
            onPress={handleNotificationsPress}
          >
            <Text style={styles.rowTitle}>Notifications</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>Off</Text>
              <ChevronRight size={18} color="#666666" />
            </View>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.settingsRow,
              pressed && styles.settingsRowPressed,
            ]}
            onPress={handleLanguagePress}
          >
            <View style={styles.rowLeft}>
              <Text style={styles.rowTitle}>App Language</Text>
              <Text style={styles.rowSubtitle}>Multi-language support coming soon</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>System Default</Text>
              <ChevronRight size={18} color="#666666" />
            </View>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>

          <Pressable
            style={({ pressed }) => [
              styles.settingsRow,
              pressed && styles.settingsRowPressed,
            ]}
            onPress={handleAboutPress}
          >
            <Text style={styles.rowTitle}>About Gayifiers</Text>
            <ChevronRight size={18} color="#666666" />
          </Pressable>

          <View style={styles.settingsRowDisabled}>
            <Text style={styles.rowTitle}>App Version</Text>
            <Text style={styles.rowValueDisabled}>v0.1.0 (MVP)</Text>
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
    opacity: 0.5,
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
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowValue: {
    fontSize: 15,
    fontWeight: '400',
    color: '#999999',
  },
  rowValueDisabled: {
    fontSize: 15,
    fontWeight: '400',
    color: '#666666',
  },
});
