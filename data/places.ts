import { VenueCategory } from '@/constants/venues';

export interface Place {
  id: string;
  name: string;
  city: string;
  area?: string;
  category: VenueCategory;
  tags: string[];
  hasDeal: boolean;
  isTrending: boolean;
  description?: string;
  distanceLabel?: string;
  imageUrl?: string;
}

export const PLACES: Place[] = [
  // 曼谷 - Bar & Club
  {
    id: 'dj-station-bangkok',
    name: 'DJ Station',
    city: 'Bangkok',
    area: 'Silom',
    category: 'bar_club',
    tags: ['dance', 'club', 'party', 'late night'],
    hasDeal: true,
    isTrending: true,
    description: 'Iconic multi-floor gay club in the heart of Silom',
    distanceLabel: 'Nearby',
    imageUrl: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'telephone-pub-bangkok',
    name: 'Telephone Pub',
    city: 'Bangkok',
    area: 'Silom',
    category: 'bar_club',
    tags: ['bar', 'drag shows', 'historic', 'friendly'],
    hasDeal: false,
    isTrending: false,
    description: 'Historic gay bar with drag shows and friendly atmosphere',
    distanceLabel: '0.3 km',
    imageUrl: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'g-bangkok',
    name: 'G Bangkok',
    city: 'Bangkok',
    area: 'Silom',
    category: 'bar_club',
    tags: ['bar', 'rooftop', 'cocktails', 'trendy'],
    hasDeal: true,
    isTrending: true,
    description: 'Stylish rooftop bar with stunning city views',
    distanceLabel: '0.5 km',
    imageUrl: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  
  // 曼谷 - Sauna
  {
    id: 'babylon-bangkok',
    name: 'Babylon Bangkok',
    city: 'Bangkok',
    area: 'Sathorn',
    category: 'sauna',
    tags: ['sauna', 'pool', 'gym', 'relaxing'],
    hasDeal: true,
    isTrending: true,
    description: 'Premium gay sauna with rooftop pool and garden',
    distanceLabel: '1.2 km',
    imageUrl: 'https://images.pexels.com/photos/3171815/pexels-photo-3171815.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'r3-sauna-bangkok',
    name: 'R3 Sauna',
    city: 'Bangkok',
    area: 'Silom',
    category: 'sauna',
    tags: ['sauna', 'steam', 'massage', 'budget'],
    hasDeal: false,
    isTrending: false,
    description: 'Popular sauna with steam rooms and massage services',
    distanceLabel: '0.8 km',
    imageUrl: 'https://images.pexels.com/photos/3171815/pexels-photo-3171815.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  
  // 曼谷 - Spa & Wellness
  {
    id: 'divana-spa-bangkok',
    name: 'Divana Spa',
    city: 'Bangkok',
    area: 'Sukhumvit',
    category: 'spa',
    tags: ['spa', 'massage', 'luxury', 'aromatherapy'],
    hasDeal: true,
    isTrending: true,
    description: 'Luxury spa with Thai massage and wellness treatments',
    distanceLabel: '3.2 km',
    imageUrl: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'healthland-spa-bangkok',
    name: 'Health Land Spa',
    city: 'Bangkok',
    area: 'Sathorn',
    category: 'spa',
    tags: ['thai massage', 'affordable', 'traditional', 'wellness'],
    hasDeal: false,
    isTrending: false,
    description: 'Traditional Thai massage at affordable prices',
    distanceLabel: '1.8 km',
    imageUrl: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];
