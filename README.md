# LGBTQ+ Travel Discovery - Expo App

An Apple-safe travel discovery MVP designed for LGBTQ+ travelers. This is a content-first travel guide that helps you discover welcoming venues and safe spaces around the world.

**This is NOT a dating app, NOT a social network, and does NOT include real-time tracking.**

## Features

### 🌈 Explore Tab
- Discover LGBTQ+ friendly venues worldwide
- Browse bars, clubs, cafes, restaurants, and hotels
- See distance labels for nearby venues
- Beautiful card-based interface with venue photos
- Categories: Bar, Club, Cafe, Restaurant, Hotel, LGBTQ+ Friendly

### 🎟️ Deals Tab
- Exclusive benefits at partner venues
- Membership-gated content (Guest, Free, Plus)
- Preview locked deals with visual indicators
- No payment processing (demonstration only)

### 👤 Profile Tab
- Membership tier information (Guest, Free, Plus)
- Clear explanation of app purpose
- Privacy & location usage transparency
- Membership benefits overview

## Tech Stack

- **Framework**: Expo SDK 54
- **Routing**: Expo Router (file-based routing)
- **Language**: TypeScript
- **UI**: React Native with Lucide icons
- **Backend Ready**: Supabase client setup
- **Platforms**: iOS, Android, Web

## Project Structure

```
app/
├── _layout.tsx              # Root stack layout
├── index.tsx                # Redirect to explore
├── +not-found.tsx           # 404 page
└── (tabs)/
    ├── _layout.tsx          # Tab navigation (3 tabs)
    ├── explore.tsx          # Venue discovery
    ├── deals.tsx            # Membership deals
    └── profile.tsx          # Profile & privacy info

constants/
└── venues.ts                # Mock venue and deal data

lib/
└── supabase.ts              # Supabase client setup
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Install dependencies (already done):
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Open the app:
   - Press `w` for web
   - Scan QR code with Expo Go app for iOS/Android
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

## Apple App Store Compliance

This app is designed with Apple's strict guidelines in mind:

✅ **Compliant Features:**
- Travel and venue discovery focus
- No real-time user tracking or presence
- No user-to-user interaction (no chat, no messaging)
- Location used only for distance display
- Clear privacy notices
- Content-first approach

❌ **Intentionally Excluded:**
- No dating or matching mechanics
- No real-time "who's here now" features
- No messaging or invitations
- No background location tracking
- No user profiles or check-ins
- No map SDKs (Google Maps, Mapbox)

## Privacy & Location

**Location is used ONLY to:**
- Calculate distance to venues (e.g., "Nearby", "1.2 km")
- Sort venues by proximity

**We NEVER:**
- Track your movements in the background
- Store your location history
- Share your location with other users
- Show real-time presence information

This is clearly explained in the Profile tab.

## Configuration

### Mock Data

All data is defined in `constants/venues.ts`:
- 6 mock venues across different cities
- 4 sample deals (2 Free tier, 2 Plus tier)
- Mock user with configurable membership tier

To test different membership states, edit the `MOCK_USER` object:

```typescript
export const MOCK_USER = {
  membershipTier: 'free' as MembershipTier, // Change to 'guest' or 'plus'
};
```

### Supabase Setup

The app includes Supabase client setup for future backend integration:
- Client is configured in `lib/supabase.ts`
- Environment variables are already set in `.env`
- Currently not used (all data is mocked)

## Membership Tiers

### Guest
- Browse venues
- View categories
- See basic information

### Free (Current Demo State)
- All Guest features
- Access to select deals
- Distance information

### Plus
- All Free features
- Access to all exclusive deals
- Priority support
- Early access to new venues

## Build for Production

### Web
```bash
npm run build:web
```

The web build is located in the `dist/` directory.

### iOS/Android
```bash
npx expo prebuild
```

## Design Philosophy

This app is designed to feel like:
- A travel guide (like Lonely Planet)
- A discovery platform (like Yelp for LGBTQ+ venues)
- A membership club (with tiered benefits)

This app is NOT:
- A social network
- A dating app
- A real-time tracking app
- A messaging platform

## Color Scheme

- **Primary**: Pink (#FF6B9D) - Represents inclusivity and pride
- **Background**: Light gray (#FAFAFA) - Clean, editorial style
- **Cards**: White with subtle shadows - Modern, premium feel

## Future Enhancements (Not Implemented)

- Connect to real Supabase database
- Implement authentication flow
- Add search functionality
- Real venue data integration
- Payment processing for Plus tier
- User favorites
- More cities and venues
- User reviews (moderated, no user-to-user interaction)

## Testing Membership Tiers

To test different membership states:

1. Open `constants/venues.ts`
2. Modify the `MOCK_USER.membershipTier` value
3. Restart the app
4. Observe different locked/unlocked states in the Deals tab

## Important Notes

- All venue data is mocked for demonstration
- No actual API calls are made
- No authentication is implemented
- Membership tiers are demonstration only
- Images are linked from Pexels (stock photos)
- No QR code scanning (placeholder UI only)

---

Built with pride using Expo and React Native 🏳️‍🌈
