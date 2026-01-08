// Supabase client setup for future backend integration
// Currently not used - all data is mocked

import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: undefined,
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});
