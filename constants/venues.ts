// Mock venue data for LGBTQ+ travel discovery in Bangkok (MVP)
// All data is static and for demonstration purposes

export type VenueCategory = 'bar_club' | 'sauna' | 'spa_wellness' | 'cafe' | 'restaurant' | 'hotel';

export interface Venue {
  id: string;
  name: string;
  city: string;
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
    category: 'bar_club',
    description: 'The legendary gay club in Silom Soi 2, famous for its drag shows.',
    distanceLabel: 'Nearby',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    isTrending: true,
    tags: ['Drag Show', 'Late night', 'Silom', 'Dance floor'],
    deal: {
      badge: 'Free Drink',
      description: 'One free drink with entry for Plus members',
    },
  },
  {
    id: '2',
    name: 'Babylon Bangkok',
    city: 'Bangkok',
    category: 'sauna',
    description: 'World-famous gay sauna and resort with beautiful gardens and pool.',
    distanceLabel: '1.5 km',
    imageUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Sauna', 'Pool', 'Gym', 'Massage'],
    deal: {
      badge: '20% OFF Entry',
      description: '20% off entry fee for all members',
    },
  },
  {
    id: '3',
    name: 'The Stranger Bar',
    city: 'Bangkok',
    category: 'bar_club',
    description: 'House of Drag Queens, offering amazing performances every night.',
    distanceLabel: 'Nearby',
    imageUrl: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=800',
    isTrending: true,
    tags: ['Drag Show', 'Cocktails', 'Silom Soi 4', 'Friendly'],
  },
  {
    id: '4',
    name: 'Chakran Sauna',
    city: 'Bangkok',
    category: 'sauna',
    description: 'Modern and clean sauna located in the Ari area.',
    distanceLabel: '5.2 km',
    imageUrl: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Modern', 'Ari', 'Steam room', 'Dark room'],
  },
  {
    id: '5',
    name: 'V Spa & Wellness',
    city: 'Bangkok',
    category: 'spa_wellness',
    description: 'Premium spa offering specialized treatments for the LGBTQ+ community.',
    distanceLabel: '2.1 km',
    imageUrl: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Massage', 'Facial', 'Wellness', 'Luxury'],
    deal: {
      badge: 'Plus Exclusive',
      description: 'Buy 1 get 1 free on all massage treatments',
    },
  },
  {
    id: '6',
    name: 'Balcony Silom',
    city: 'Bangkok',
    category: 'bar_club',
    description: 'Great outdoor seating and karaoke, perfect for people watching.',
    distanceLabel: 'Nearby',
    imageUrl: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Karaoke', 'Outdoor', 'Silom Soi 4', 'Food'],
  },
];

export const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    venueName: 'DJ Station',
    benefit: 'Free welcome drink',
    description: 'Get a free welcome drink when you show your Plus membership at the door.',
    requiredTier: 'plus',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    venueName: 'Babylon Bangkok',
    benefit: '20% off entry',
    description: 'Enjoy 20% discount on standard entry fees every day.',
    requiredTier: 'free',
    imageUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    venueName: 'V Spa & Wellness',
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
    spa_wellness: 'Spa & Wellness',
    cafe: 'Cafe',
    restaurant: 'Restaurant',
    hotel: 'Hotel',
  };
  return labels[category];
}
