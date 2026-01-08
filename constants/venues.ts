// Mock venue data for LGBTQ+ travel discovery
// All data is static and for demonstration purposes

export type VenueCategory = 'bar' | 'club' | 'cafe' | 'restaurant' | 'hotel' | 'friendly';

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
    name: 'The Rainbow Lounge',
    city: 'Tokyo',
    category: 'bar',
    description: 'Popular LGBTQ+ bar in Shinjuku district',
    distanceLabel: 'Nearby',
    imageUrl: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=800',
    isTrending: true,
    tags: ['Late night', 'Cocktails', 'Young crowd', 'Dance floor'],
    deal: {
      badge: 'Happy Hour 5-8pm',
      description: '50% off all cocktails during happy hour',
    },
  },
  {
    id: '2',
    name: 'Pride Cafe',
    city: 'Bangkok',
    category: 'cafe',
    description: 'Welcoming cafe with rainbow pride decor',
    distanceLabel: '1.2 km',
    imageUrl: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Brunch', 'WiFi', 'Budget', 'All-day'],
    deal: {
      badge: '20% OFF Coffee',
      description: 'All coffee drinks 20% off with membership',
    },
  },
  {
    id: '3',
    name: 'Club Unity',
    city: 'Taipei',
    category: 'club',
    description: 'Vibrant nightclub with inclusive atmosphere',
    distanceLabel: '2.5 km',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    isTrending: true,
    tags: ['Dark room', 'Late night', 'DJ', 'Bear-friendly'],
    deal: {
      badge: 'Free Entry Before 11pm',
      description: 'No cover charge for early arrivals',
    },
  },
  {
    id: '4',
    name: 'Friendly Bistro',
    city: 'Seoul',
    category: 'restaurant',
    description: 'LGBTQ+-friendly dining experience',
    distanceLabel: '3.1 km',
    imageUrl: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Fine dining', 'Reservations', 'Romantic'],
  },
  {
    id: '5',
    name: 'Safe Haven Hotel',
    city: 'Singapore',
    category: 'hotel',
    description: 'Welcoming accommodation for LGBTQ+ travelers',
    distanceLabel: '4.2 km',
    imageUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Pool', 'Spa', 'Rooftop bar', 'Luxury'],
  },
  {
    id: '6',
    name: 'Spectrum Bar',
    city: 'Hong Kong',
    category: 'bar',
    description: 'Inclusive bar with diverse crowd',
    distanceLabel: 'Nearby',
    imageUrl: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=800',
    isTrending: true,
    tags: ['Mixed crowd', 'Karaoke', 'Budget', 'Friendly'],
  },
];

export const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    venueName: 'The Rainbow Lounge',
    benefit: '20% off drinks',
    description: 'Show your membership for 20% off all drinks Monday-Thursday',
    requiredTier: 'free',
    imageUrl: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    venueName: 'Pride Cafe',
    benefit: 'Free dessert with meal',
    description: 'Complimentary dessert when you order any main course',
    requiredTier: 'free',
    imageUrl: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    venueName: 'Club Unity',
    benefit: 'Skip the line + 1 free drink',
    description: 'VIP entry and welcome drink for Plus members',
    requiredTier: 'plus',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '4',
    venueName: 'Safe Haven Hotel',
    benefit: '30% off room rate',
    description: 'Exclusive discount for Plus members on all room types',
    requiredTier: 'plus',
    imageUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

// Mock user - change membershipTier to test different states
export const MOCK_USER = {
  membershipTier: 'free' as MembershipTier,
};

export function getCategoryLabel(category: VenueCategory): string {
  const labels: Record<VenueCategory, string> = {
    bar: 'Bar',
    club: 'Club',
    cafe: 'Cafe',
    restaurant: 'Restaurant',
    hotel: 'Hotel',
    friendly: 'LGBTQ+ Friendly',
  };
  return labels[category];
}
