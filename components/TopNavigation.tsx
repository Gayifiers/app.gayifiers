import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { Menu, Search, Crown, Heart, Settings, Info, X, CheckCircle } from 'lucide-react-native';
import { MOCK_USER } from '@/constants/venues';

export default function TopNavigation() {
  const [menuVisible, setMenuVisible] = useState(false);
  const userTier = MOCK_USER.membershipTier;
  const isPlus = userTier === 'plus';
  const translateX = useSharedValue(-320);

  useEffect(() => {
    if (menuVisible) {
      translateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    } else {
      translateX.value = withTiming(-320, {
        duration: 250,
        easing: Easing.in(Easing.ease),
      });
    }
  }, [menuVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={styles.iconButton}
          onPress={() => setMenuVisible(true)}
        >
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

        <View style={styles.rightButtons}>
          <Pressable style={styles.iconButton}>
            <Search size={22} color="#FFFFFF" />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Crown size={22} color="#FFD700" />
          </Pressable>
        </View>
      </View>

      <Modal
        visible={menuVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <Animated.View style={[styles.menuContainer, animatedStyle]}>
            <Pressable style={styles.menuContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setMenuVisible(false)}
              >
                <X size={24} color="#FFFFFF" />
              </Pressable>
            </View>

            <View style={styles.membershipCard}>
              <View style={styles.membershipContent}>
                <View style={styles.membershipIcon}>
                  {isPlus ? (
                    <Crown size={18} color="#000000" />
                  ) : (
                    <CheckCircle size={18} color="#666666" />
                  )}
                </View>
                <View style={styles.membershipInfo}>
                  <Text style={styles.membershipLabel}>Membership</Text>
                  <Text style={styles.membershipTier}>
                    {isPlus ? 'Plus Member' : 'Free Member'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.menuItems}>
              <Pressable
                style={({ pressed }) => [
                  styles.menuItem,
                  pressed && styles.menuItemPressed,
                ]}
                onPress={() => setMenuVisible(false)}
              >
                <Heart size={18} color="#FFFFFF" />
                <Text style={styles.menuItemText}>My Favorites</Text>
              </Pressable>

              {!isPlus && (
                <Pressable
                  style={({ pressed }) => [
                    styles.menuItem,
                    styles.upgradeMenuItem,
                    pressed && styles.menuItemPressed,
                  ]}
                  onPress={() => setMenuVisible(false)}
                >
                  <Crown size={18} color="#000000" />
                  <Text style={styles.upgradeMenuItemText}>Upgrade to Plus</Text>
                </Pressable>
              )}

              <Pressable
                style={({ pressed }) => [
                  styles.menuItem,
                  pressed && styles.menuItemPressed,
                ]}
                onPress={() => setMenuVisible(false)}
              >
                <Settings size={18} color="#FFFFFF" />
                <Text style={styles.menuItemText}>Settings</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.menuItem,
                  pressed && styles.menuItemPressed,
                ]}
                onPress={() => setMenuVisible(false)}
              >
                <Info size={18} color="#FFFFFF" />
                <Text style={styles.menuItemText}>About Gayifiers</Text>
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
  rightButtons: {
    flexDirection: 'row',
    gap: 4,
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
    width: 320,
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
  membershipCard: {
    margin: 16,
    padding: 12,
    backgroundColor: '#121212',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  membershipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  membershipIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#9D4EDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  membershipInfo: {
    flex: 1,
  },
  membershipLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 2,
  },
  membershipTier: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  menuItems: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: 'transparent',
    borderWidth: 0,
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
  upgradeMenuItem: {
    backgroundColor: '#9D4EDD',
    borderWidth: 0,
  },
  upgradeMenuItemText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
});
