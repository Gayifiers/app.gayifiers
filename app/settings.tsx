import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, X } from 'lucide-react-native';

type SettingsModal = 'about' | 'trending' | 'privacy' | 'contact' | null;

export default function SettingsScreen() {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<SettingsModal>(null);

  const settingsItems = [
    {
      id: 'about',
      title: 'About Gayifiers',
      modal: 'about' as SettingsModal,
    },
    {
      id: 'trending',
      title: 'How Trending Works',
      modal: 'trending' as SettingsModal,
    },
    {
      id: 'privacy',
      title: 'Privacy & Data',
      modal: 'privacy' as SettingsModal,
    },
    {
      id: 'contact',
      title: 'Contact & Feedback',
      modal: 'contact' as SettingsModal,
    },
  ];

  const renderModalContent = () => {
    switch (activeModal) {
      case 'about':
        return (
          <>
            <Text style={styles.modalTitle}>About Gayifiers</Text>
            <Text style={styles.modalText}>
              Gayifiers is a travel-focused guide for LGBTQ+ venues and gay-friendly spaces.
            </Text>
            <Text style={[styles.modalText, { marginTop: 16 }]}>
              We help you discover safe, welcoming places wherever you travel, connecting you with vibrant communities around the world.
            </Text>
          </>
        );
      case 'trending':
        return (
          <>
            <Text style={styles.modalTitle}>How Trending Works</Text>
            <Text style={styles.modalText}>
              Trending places are based on aggregated and anonymized activity. We do not track real-time locations or show individual users.
            </Text>
            <Text style={[styles.modalText, { marginTop: 16 }]}>
              The trending algorithm considers factors like venue popularity, recent check-ins, and community engagement to surface the most active spots.
            </Text>
            <Text style={[styles.modalText, { marginTop: 16 }]}>
              Your privacy is protected at all times. Individual user data is never exposed or sold to third parties.
            </Text>
          </>
        );
      case 'privacy':
        return (
          <>
            <Text style={styles.modalTitle}>Privacy & Data</Text>
            <Text style={styles.modalText}>
              No account is required in this preview version. We do not collect personal data or track background location.
            </Text>
            <Text style={[styles.modalText, { marginTop: 16 }]}>
              This is an MVP preview designed to demonstrate the app concept. When the full version launches, we will implement optional account features with clear privacy controls.
            </Text>
            <Text style={[styles.modalText, { marginTop: 16 }]}>
              We are committed to building a safe, trustworthy platform that respects your privacy and data rights.
            </Text>
          </>
        );
      case 'contact':
        return (
          <>
            <Text style={styles.modalTitle}>Contact & Feedback</Text>
            <Text style={styles.modalText}>
              We'd love to hear from you. Whether you have questions, feedback, or suggestions for improvement, please reach out:
            </Text>
            <View style={styles.emailContainer}>
              <Text style={styles.emailText}>feedback@gayifiers.com</Text>
            </View>
            <Text style={[styles.modalText, { marginTop: 16 }]}>
              Your input helps us build a better experience for the LGBTQ+ community.
            </Text>
          </>
        );
      default:
        return null;
    }
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
          {settingsItems.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.settingsItem,
                pressed && styles.settingsItemPressed,
              ]}
              onPress={() => setActiveModal(item.modal)}
            >
              <Text style={styles.settingsItemText}>{item.title}</Text>
              <ChevronRight size={20} color="#666666" />
            </Pressable>
          ))}
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Gayifiers v0.1 (Preview)</Text>
        </View>
      </ScrollView>

      <Modal
        visible={activeModal !== null}
        animationType="fade"
        transparent
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setActiveModal(null)}
              >
                <X size={24} color="#FFFFFF" />
              </Pressable>
            </View>
            <ScrollView style={styles.modalContent}>
              {renderModalContent()}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    paddingTop: 16,
  },
  section: {
    paddingHorizontal: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  settingsItemPressed: {
    opacity: 0.7,
    backgroundColor: '#121212',
  },
  settingsItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  versionText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#0A0A0A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1A1A1A',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  modalCloseButton: {
    padding: 4,
  },
  modalContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#CCCCCC',
    fontWeight: '400',
  },
  emailContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#121212',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9D4EDD',
  },
  emailText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9D4EDD',
    textAlign: 'center',
  },
});
