// Mock venue data for LGBTQ+ travel discovery in Bangkok (MVP)
// All data is static and for demonstration purposes

export type VenueCategory = 'bar_club' | 'sauna' | 'onsen' | 'cafe' | 'restaurant' | 'hotel' | 'spa';

export interface Venue {
  id: string;
  name: string;
  city: string;
  area?: string;
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
  // 曼谷 - Bar & Club
  {
    id: 'dj-station-bangkok',
    name: 'DJ Station',
    city: 'Bangkok',
    area: 'Silom',
    category: 'bar_club',
    description: 'Iconic multi-floor gay club in the heart of Silom, famous for drag shows.',
    distanceLabel: 'Nearby',
    imageUrl: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=800',
    isTrending: true,
    tags: ['dance', 'club', 'party', 'late night'],
    deal: {
      badge: 'Free Drink',
      description: 'One free drink with entry for Plus members',
    },
  },
  {
    id: 'telephone-pub-bangkok',
    name: 'Telephone Pub',
    city: 'Bangkok',
    area: 'Silom',
    category: 'bar_club',
    description: 'Historic gay bar with drag shows and friendly atmosphere.',
    distanceLabel: '0.3 km',
    imageUrl: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['bar', 'drag shows', 'historic', 'friendly'],
  },
  {
    id: 'g-bangkok',
    name: 'G Bangkok',
    city: 'Bangkok',
    area: 'Silom',
    category: 'bar_club',
    description: 'Stylish rooftop bar with stunning city views and cocktails.',
    distanceLabel: '0.5 km',
    imageUrl: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=800',
    isTrending: true,
    tags: ['bar', 'rooftop', 'cocktails', 'trendy'],
    deal: {
      badge: 'Happy Hour',
      description: 'Buy 1 get 1 free on signature cocktails 6-8pm',
    },
  },
  
  // 曼谷 - Sauna
  {
    id: 'babylon-bangkok',
    name: 'Babylon Bangkok',
    city: 'Bangkok',
    area: 'Sathorn',
    category: 'sauna',
    description: 'Premium gay sauna with rooftop pool, garden, and world-class facilities.',
    distanceLabel: '1.2 km',
    imageUrl: 'https://images.pexels.com/photos/3171815/pexels-photo-3171815.jpeg?auto=compress&cs=tinysrgb&w=800',
    isTrending: true,
    tags: ['sauna', 'pool', 'gym', 'relaxing'],
    deal: {
      badge: '20% OFF Entry',
      description: '20% off entry fee for all members',
    },
  },
  {
    id: 'r3-sauna-bangkok',
    name: 'R3 Sauna',
    city: 'Bangkok',
    area: 'Silom',
    category: 'sauna',
    description: 'Popular sauna with steam rooms, massage services, and budget-friendly rates.',
    distanceLabel: '0.8 km',
    imageUrl: 'https://images.pexels.com/photos/3171815/pexels-photo-3171815.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['sauna', 'steam', 'massage', 'budget'],
  },
  
  // 曼谷 - Onsen
  {
    id: 'onsen-spa-bangkok',
    name: 'Onsen Spa Bangkok',
    city: 'Bangkok',
    area: 'Sukhumvit',
    category: 'onsen',
    description: 'Japanese-style onsen with traditional hot springs and quiet atmosphere.',
    distanceLabel: '2.5 km',
    imageUrl: 'https://images.pexels.com/photos/3188/japanese-cherry-trees-flowers-spring.jpg?auto=compress&cs=tinysrgb&w=800',
    tags: ['hot springs', 'relaxing', 'traditional', 'quiet'],
  },
  {
    id: 'yunomori-onsen-bangkok',
    name: 'Yunomori Onsen',
    city: 'Bangkok',
    area: 'Sukhumvit',
    category: 'onsen',
    description: 'Authentic Japanese onsen experience in Bangkok with wellness treatments.',
    distanceLabel: '3.0 km',
    imageUrl: 'https://images.pexels.com/photos/3188/japanese-cherry-trees-flowers-spring.jpg?auto=compress&cs=tinysrgb&w=800',
    isTrending: true,
    tags: ['onsen', 'japanese', 'authentic', 'wellness'],
    deal: {
      badge: 'Member Discount',
      description: '15% off all onsen packages',
    },
  },
  
  // 曼谷 - Cafe
  {
    id: 'rainbow-coffee-bangkok',
    name: 'Rainbow Coffee',
    city: 'Bangkok',
    area: 'Silom',
    category: 'cafe',
    description: 'LGBTQ+ friendly cafe with pride decor and great coffee.',
    distanceLabel: '0.8 km',
    imageUrl: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['coffee', 'brunch', 'wifi', 'lgbtq-friendly'],
  },
  {
    id: 'casa-lapin-bangkok',
    name: 'Casa Lapin',
    city: 'Bangkok',
    area: 'Sukhumvit',
    category: 'cafe',
    description: 'Trendy minimalist cafe perfect for working and Instagram shots.',
    distanceLabel: '2.8 km',
    imageUrl: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800',
    isTrending: true,
    tags: ['cafe', 'minimalist', 'workspace', 'instagram'],
  },
  
  // 曼谷 - Hotel & Hostel
  {
    id: 'tarntawan-place-bangkok',
    name: 'Tarntawan Place Hotel',
    city: 'Bangkok',
    area: 'Surawong',
    category: 'hotel',
    description: 'Gay-friendly hotel near Silom nightlife district with rooftop pool.',
    distanceLabel: '1.5 km',
    imageUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['hotel', 'pool', 'rooftop', 'central'],
  },
  {
    id: 'the-house-sathorn-bangkok',
    name: 'The House on Sathorn',
    city: 'Bangkok',
    area: 'Sathorn',
    category: 'hotel',
    description: 'Boutique hotel in restored colonial mansion with luxury dining.',
    distanceLabel: '2.1 km',
    imageUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    isTrending: true,
    tags: ['boutique', 'luxury', 'historic', 'restaurant'],
    deal: {
      badge: 'Plus Exclusive',
      description: 'Complimentary afternoon tea for Plus members',
    },
  },
  
  // 曼谷 - Spa & Wellness
  {
    id: 'divana-spa-bangkok',
    name: 'Divana Spa',
    city: 'Bangkok',
    area: 'Sukhumvit',
    category: 'spa',
    description: 'Luxury spa with Thai massage and premium aromatherapy treatments.',
    distanceLabel: '3.2 km',
    imageUrl: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    isTrending: true,
    tags: ['spa', 'massage', 'luxury', 'aromatherapy'],
    deal: {
      badge: 'BOGO Massage',
      description: 'Buy 1 get 1 free on all massage treatments',
    },
  },
  {
    id: 'healthland-spa-bangkok',
    name: 'Health Land Spa',
    city: 'Bangkok',
    area: 'Sathorn',
    category: 'spa',
    description: 'Traditional Thai massage at affordable prices in a professional setting.',
    distanceLabel: '1.8 km',
    imageUrl: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['thai massage', 'affordable', 'traditional', 'wellness'],
  },
];

export const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    venueName: 'DJ Station',
    benefit: 'Free welcome drink',
    description: 'Get a free welcome drink when you show your Plus membership at the door.',
    requiredTier: 'plus',
    imageUrl: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    venueName: 'Babylon Bangkok',
    benefit: '20% off entry',
    description: 'Enjoy 20% discount on standard entry fees every day.',
    requiredTier: 'free',
    imageUrl: 'https://images.pexels.com/photos/3171815/pexels-photo-3171815.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    venueName: 'Divana Spa',
    benefit: 'BOGO Massage',
    description: 'Buy one massage treatment and get the second one free for Plus members.',
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
    restaurant: 'Restaurant',
    hotel: 'Hotel',
    spa: 'Spa & Wellness',
  };
  return labels[category];
}
