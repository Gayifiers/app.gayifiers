import { Tabs } from 'expo-router';
import { Compass, Heart, User } from 'lucide-react-native';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        lazy: true,
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
      {/* Hidden until post-approval features ship */}
      <Tabs.Screen name="trending" options={{ href: null }} />
      <Tabs.Screen name="deals" options={{ href: null }} />
    </Tabs>
  );
}
