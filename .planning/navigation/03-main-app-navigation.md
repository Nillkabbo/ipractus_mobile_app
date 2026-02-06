# Main App Navigation Documentation

## Overview
Primary navigation structure for authenticated users using bottom tab navigation.

---

## Navigation Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         MAIN APP NAVIGATION                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ╔═══════════════════════════════════════════════════════════════╗ │
│  ║                    TOP APP BAR (Per Screen)                    ║ │
│  ╟───────────────────────────────────────────────────────────────╢ │
│  ║                                                               ║ │
│  ║                     SCROLLABLE CONTENT                         ║ │
│  ║                                                               ║ │
│  ║                                                               ║ │
│  ╟───────────────────────────────────────────────────────────────╢ │
│  ║                    BOTTOM TAB BAR (5 items)                   ║ │
│  ║   ┌────┐  ┌────┐  ┌────────┐  ┌────┐  ┌────┐               ║ │
│  ║   │Home│  │Dis- │  │  (+)   │  │Team│  │Prof│               ║ │
│  ║   │    │  │cov  │  │  Post  │  │s   │  │ile │               ║ │
│  ║   └────┘  └────┘  └────────┘  └────┘  └────┘               ║ │
│  ╚═══════════════════════════════════════════════════════════════╝ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Bottom Tab Navigation

### iPractus Design (Blue)
**File Reference:** `social_feed.html`

**Tab Items:**

| Tab | Icon | Label | Route | Badge |
|-----|------|-------|-------|-------|
| Home | `home` / `grid_view` | Home | SocialFeed | None |
| Discover | `search` / `explore` | Discover | Explore | None |
| Post+ | `add` (FAB) | Post | CreatePost | None |
| Teams | `groups` / `trophy` | Teams | Teams | Notification |
| Profile | `person` | Profile | Profile | None |

**Design Specs:**
```typescript
const bottomNavConfig = {
  activeTintColor: '#137fec',
  inactiveTintColor: '#94a3b8',
  backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light mode
  backgroundColor: 'rgba(16, 25, 34, 0.9)',    // Dark mode
  borderTopColor: 'rgba(0, 0, 0, 0.1)',
  height: 80,
  paddingBottom: 20, // iOS home indicator
};
```

**FAB (Floating Action Button):**
- Positioned: `center`, `-top-20`
- Size: `56px` circular
- Background: `#137fec`
- Shadow: `shadow-lg shadow-primary/30`
- Icon: `add` (filled, 28px)

---

### Pistachio Design (Green)
**File Reference:** `pistachio_dashboard__system_v2.html`

**Tab Items:**

| Tab | Icon | Label | Route |
|-----|------|-------|-------|
| Home | `dashboard` | Home | Dashboard |
| Stats | `monitoring` | Stats | Analytics |
| Add | `add` (FAB) | Add | Create |
| Explore | `map` | Explore | Explore |
| System | `settings` | System | Settings |

**Design Specs:**
```typescript
const pistachioNavConfig = {
  activeTintColor: '#b2f15f',
  inactiveTintColor: '#4E7D96',
  backgroundColor: 'rgba(11, 19, 43, 0.95)', // Obsidian
  borderTopColor: 'rgba(78, 125, 150, 0.2)',
};
```

---

## Tab Screen Details

### 1. Home / Social Feed
**Files:**
- `social_feed.html` (iPractus)
- `pistachio_feed__system_v2.html` (Pistachio)

**Purpose:** Main content feed with user posts

**Top AppBar:**
- Left: Trophy icon (`trophy`) + "iPractus" text
- Right: Notification bell (`notifications`) with badge

**Content Sections:**
1. Composer (Create post input with avatar)
2. Feed posts (cards with user info, media, likes, comments)

**Navigation:**
- Tap notification bell → Notification Center
- Tap post → Post Detail
- Tap user avatar → User Profile
- Tap comment → Comments Screen

---

### 2. Messages
**Files:**
- `messages.html` (iPractus)
- `pistachio_messages__system_v2.html` (Pistachio)

**Purpose:** Chat list and conversations

**TopAppBar:**
- Left: Profile avatar
- Right: Settings icon

**Content Sections:**
1. Story carousel (active users)
2. Chat list (with unread badges, online status)
3. Search bar

**Navigation:**
- Tap chat → 1-on-1 Chat / Group Chat
- Tap settings → Chat Settings
- FAB → New Message / Create Group

---

### 3. Teams
**Files:**
- `find_teams.html`
- `pistachio_teams__system_v2.html`

**Purpose:** Team discovery and management

**TopAppBar:**
- Title: "Teams" or "Find Teams"
- Right: Filter/sort icon

**Content Sections:**
1. Your Teams (horizontal scroll)
2. Recommended Teams
3. Team Categories

**Navigation:**
- Tap team → Team Profile
- Tap "Join" → Join Team flow
- FAB → Create Team

---

### 4. Profile
**Files:**
- `my_profile.html`
- `pistachio_profile__system_v2.html`

**Purpose:** User profile and settings

**TopAppBar:**
- Left: Back icon (if from elsewhere)
- Title: User display name
- Right: Settings icon

**Content Sections:**
1. Profile header (avatar, name, bio, badges)
2. Stats (followers, following, posts)
3. Tabs: Posts / Media / Teams

**Navigation:**
- Tap settings → Settings Screen
- Tap edit → Edit Profile
- Tap post → Post Detail
- Tap media → Media Library

---

### 5. Discover / Explore
**Files:**
- `explore_ipractus.html`

**Purpose:** Content discovery

**Content Sections:**
1. Trending topics
2. Suggested users
3. Popular posts
4. Categories

**Navigation:**
- Tap user → User Profile
- Tap post → Post Detail
- Tap category → Category Feed

---

## Navigation Implementation (React Navigation)

```typescript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#137fec',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: 'rgba(16, 25, 34, 0.9)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          height: 80,
          paddingBottom: 20,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={SocialFeedScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarLabel: 'Home',
        }}
      />

      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={24} color={color} />
          ),
          tabBarLabel: 'Discover',
        }}
      />

      <Tab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          tabBarIcon: () => (
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: '#137fec',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -20,
                shadowColor: '#137fec',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Ionicons name="add" size={28} color="white" />
            </View>
          ),
          tabBarLabel: 'Post',
        }}
      />

      <Tab.Screen
        name="Teams"
        component={TeamsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="trophy-outline" size={24} color={color} />
          ),
          tabBarLabel: 'Teams',
          tabBarBadge: 3, // Notification count
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};
```

---

## Tab Navigation State

```typescript
interface TabNavigationState {
  activeTab: 'Feed' | 'Discover' | 'CreatePost' | 'Teams' | 'Profile';
  notifications: {
    Teams: number | null;
    Messages: number | null;
    Profile: number | null;
  };
  lastVisited: {
    [key: string]: string; // Screen history per tab
  };
}
```

---

## Deep Linking

```typescript
// Deep link configuration
const linking = {
  prefixes: ['ipractus://', 'https://ipractus.com'],
  config: {
    screens: {
      MainTabs: {
        screens: {
          Feed: 'feed',
          Discover: 'discover',
          CreatePost: 'create',
          Teams: 'teams',
          Profile: 'profile/:userId',
        },
      },
    },
  },
};

// Usage
ipractus://feed              // Opens feed
ipractus://profile/123        // Opens user profile
ipractus://teams              // Opens teams tab
```

---

## Tab Switch Animations

```typescript
// Custom transition config
const tabAnimationConfig = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
```

---

## Implementation Checklist

### Phase 1: Core Navigation
- [ ] Bottom tab navigator setup
- [ ] All 5 tab screens
- [ ] Tab icons (active/inactive states)
- [ ] FAB positioning and styling
- [ ] iOS home indicator spacing

### Phase 2: Screen Content
- [ ] Social Feed with posts
- [ ] Messages list
- [ ] Teams discovery
- [ ] Profile with tabs
- [ ] Discover/explore

### Phase 3: Polish
- [ ] Tab badges
- [ ] Deep linking
- [ ] Tab switch animations
- [ ] Long press actions
- [ ] Haptic feedback

---

## Files to Implement

| Component | File Path | Priority |
|-----------|-----------|----------|
| MainTabs | `src/navigation/MainTabs.tsx` | P0 |
| SocialFeedScreen | `src/screens/feed/SocialFeedScreen.tsx` | P0 (exists) |
| DiscoverScreen | `src/screens/discover/DiscoverScreen.tsx` | P0 |
| CreatePostScreen | `src/screens/create/CreatePostScreen.tsx` | P1 |
| TeamsScreen | `src/screens/teams/TeamsScreen.tsx` | P0 |
| ProfileScreen | `src/screens/profile/ProfileScreen.tsx` | P0 (exists) |
| MessagesScreen | `src/screens/messages/MessagesScreen.tsx` | P0 |
