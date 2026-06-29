import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(tabs)/explore');
  }, [router]);

  return (
    <View style={{ flex: 1, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="#9D4EDD" size="large" />
    </View>
  );
}
