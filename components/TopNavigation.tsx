import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu, Heart, Settings, X } from 'lucide-react-native';

export default function TopNavigation() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-280)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuVisible ? 0 : -320,
      duration: menuVisible ? 300 : 250,
      useNativeDriver: true,
    }).start();
  }, [menuVisible, slideAnim]);

  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.iconButton} onPress={() => setMenuVisible(true)}>
          <Menu size={24} color="#FFFFFF" />
        </Pressable>

        <View style={styles.centerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoLetter}>G</Text>
            </View>
            <Text style={styles.logoText}>Gayifiers</Text>
          </View>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      <Modal
        visible={menuVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
            <Pressable style={styles.menuContent} onPress={(e) => e.stopPropagation()}>
              <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>Menu</Text>
                <Pressable style={styles.closeButton} onPress={() => setMenuVisible(false)}>
                  <X size={24} color="#FFFFFF" />
                </Pressable>
              </View>

              <View style={styles.menuItems}>
                <Pressable
                  style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
                  onPress={() => {
                    setMenuVisible(false);
                    router.push('/(tabs)/explore');
                  }}
                >
                  <Text style={styles.menuItemText}>Explore Bangkok</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
                  onPress={() => {
                    setMenuVisible(false);
                    router.push('/(tabs)/favorites');
                  }}
                >
                  <Heart size={18} color="#FFFFFF" />
                  <Text style={styles.menuItemText}>Favorites</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
                  onPress={() => {
                    setMenuVisible(false);
                    setTimeout(() => router.push('/settings'), 300);
                  }}
                >
                  <Settings size={18} color="#FFFFFF" />
                  <Text style={styles.menuItemText}>Settings</Text>
                </Pressable>
              </View>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  iconButton: {
    padding: 8,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#9D4EDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLetter: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#0A0A0A',
    borderRightWidth: 1,
    borderRightColor: '#1A1A1A',
  },
  menuContent: {
    flex: 1,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  menuItems: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 6,
  },
  menuItemPressed: {
    opacity: 0.7,
    backgroundColor: '#121212',
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
