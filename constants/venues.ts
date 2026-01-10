// Mock venue data for LGBTQ+ travel discovery in Bangkok
// All data is static and for demonstration purposes

export type VenueCategory = 'bar_club' | 'sauna' | 'onsen' | 'cafe' | 'hotel' | 'spa';

export interface Venue {
  id: string;
  name: string;
  city: string;
  area?: string; // Bangkok 的區域，例如 Silom, Sukhumvit
  category: VenueCategory;
  description: string;
  distanceLabel: string;
  imageUrl: string;
  isTrending?: boolean;
  tags: string[];
  deal?: {
    badge: string;
    description: string;
  };
}

export interface Deal {
  id: string;
  venueName: string;
  benefit: string;
  description: string;
  requiredTier: 'free' | 'plus';
  imageUrl: string;
}

export type MembershipTier = 'guest' | 'free' | 'plus';

export const MOCK_VENUES: Venue[] = [
  {
    id: '1',
    name: 'DJ Station',
    city: 'Bangkok',
    area: 'Silom',
    category: 'bar_club',
    description: 'Iconic multi-floor gay club in the heart of Silom',
    distanceLabel: 'Nearby',
    imageUrl: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=800',
    isTrending: true,
    tags: ['Late night', 'Dance floor', 'Young crowd', 'Multiple floors'],
    deal: {
      badge: 'Happy Hour 7-9pm',
      description: '50% off all drinks during happy hour',
    },
  },
  {
    id: '2',
    name: 'Babylon Bangkok',
    city: 'Bangkok',
    area: 'Sathorn',
    category: 'sauna',
    description: 'Premium gay sauna with rooftop pool and garden',
    distanceLabel: '1.2 km',
    imageUrl: 'https://images.pexels.com/photos/3171815/pexels-photo-3171815.jpeg?auto=compress&cs=tinysrgb&w=800',
    isTrending: true,
    tags: ['Pool', 'Sauna', 'Gym', 'Relaxing'],
    deal: {
      badge: '20% OFF Entry',
      description: 'Discounted entry fee for members',
    },
  },
  {
    id: '3',
    name: 'Onsen Spa Bangkok',
    city: 'Bangkok',
    area: 'Sukhumvit',
    category: 'onsen',
    description: 'Japanese-style onsen with traditional hot springs',
    distanceLabel: '2.5 km',
    imageUrl: 'https://images.pexels.com/photos/3188/japanese-cherry-trees-flowers-spring.jpg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Hot springs', 'Relaxing', 'Traditional', 'Quiet'],
  },
  {
    id: '4',
    name: 'Rainbow Coffee',
    city: 'Bangkok',
    area: 'Silom',
    category: 'cafe',
    description: 'LGBTQ+ friendly cafe with pride decor and great coffee',
    distanceLabel: '0.8 km',
    imageUrl: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Brunch', 'WiFi', 'Budget', 'All-day'],
    deal: {
      badge: 'Free Dessert',
      description: 'Free dessert with any coffee order',
    },
  },
  {
    id: '5',
    name: 'Tarntawan Place Hotel',
    city: 'Bangkok',
    area: 'Surawong',
    category: 'hotel',
    description: 'Gay-friendly hotel near Silom nightlife district',
    distanceLabel: '1.5 km',
    imageUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Pool', 'Rooftop', 'Central location', 'Budget'],
  },
  {
    id: '6',
    name: 'Divana Spa',
    city: 'Bangkok',
    area: 'Sukhumvit',
    category: 'spa',
    description: 'Luxury spa with Thai massage and wellness treatments',
    distanceLabel: '3.2 km',
    imageUrl: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    isTrending: true,
    tags: ['Thai massage', 'Luxury', 'Relaxing', 'Aromatherapy'],
    deal: {
      badge: '15% OFF Treatments',
      description: 'Discount on all spa treatments for members',
    },
  },
  {
    id: '7',
    name: 'Telephone Pub',
    city: 'Bangkok',
    area: 'Silom',
    category: 'bar_club',
    description: 'Historic gay bar with drag shows and friendly atmosphere',
    distanceLabel: 'Nearby',
    imageUrl: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Drag shows', 'Historic', 'Mixed crowd', 'Budget'],
  },
  {
    id: '8',
    name: 'The House on Sathorn',
    city: 'Bangkok',
    area: 'Sathorn',
    category: 'hotel',
    description: 'Boutique hotel in restored colonial mansion',
    distanceLabel: '2.1 km',
    imageUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Boutique', 'Historic', 'Luxury', 'Restaurant'],
  },
];

export const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    venueName: 'DJ Station',
    benefit: '20% off drinks',
    description: 'Show your membership for 20% off all drinks Monday-Thursday',
    requiredTier: 'free',
    imageUrl: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    venueName: 'Rainbow Coffee',
    benefit: 'Free dessert with any drink',
    description: 'Complimentary dessert when you order any beverage',
    requiredTier: 'free',
    imageUrl: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    venueName: 'Babylon Bangkok',
    benefit: 'VIP locker upgrade',
    description: 'Free upgrade to VIP locker with premium amenities',
    requiredTier: 'plus',
    imageUrl: 'https://images.pexels.com/photos/3171815/pexels-photo-3171815.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '4',
    venueName: 'Divana Spa',
    benefit: '30% off all treatments',
    description: 'Exclusive discount for Plus members on spa services',
    requiredTier: 'plus',
    imageUrl: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

// Mock user - change membershipTier to test different states
export const MOCK_USER = {
  membershipTier: 'free' as MembershipTier,
};

export function getCategoryLabel(category: VenueCategory): string {
  const labels: Record<VenueCategory, string> = {
    bar_club: 'Bar & Club',
    sauna: 'Sauna',
    onsen: 'Onsen',
    cafe: 'Cafe',
    hotel: 'Hotel & Hostel',
    spa: 'Spa & Wellness',
  };
  return labels[category];
}
