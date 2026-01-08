import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Compass, TrendingUp, Heart, User, Lock } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#9D4EDD',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 1,
          borderTopColor: '#1A1A1A',
          height: Math.max(80, Platform.OS === 'ios' ? 90 : 80),
          paddingBottom: 34,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Compass size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="trending"
        options={{
          title: 'Trending',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.trendingIconContainer}>
              <TrendingUp size={size} color={color} />
              {!focused && <Lock size={10} color="#9D4EDD" style={styles.lockBadge} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Heart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="deals"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  trendingIconContainer: {
    position: 'relative',
  },
  lockBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
  },
});
