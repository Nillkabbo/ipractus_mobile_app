# Architecture Research

**Domain:** React Native Expo Mobile App with Real-Time Features
**Researched:** 2026-02-03
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Presentation Layer                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │  Feed    │  │  Chat    │  │  Teams   │  │ Profile  │ Screens   │
│  │  Screen  │  │  Screen  │  │  Screen  │  │  Screen  │           │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘           │
│       │            │            │            │                     │
│  ┌────▼────────────────▼────────────────▼────────▼─────┐          │
│  │           Shared Components (UI Kit)                 │          │
│  │  PostCard | MessageBubble | VideoPlayer | Avatar    │          │
│  └──────────────────────────────────────────────────────┘          │
├─────────────────────────────────────────────────────────────────────┤
│                    Navigation Layer (Expo Router)                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  │
│  │   Tabs     │  │   Stack    │  │   Modal    │  │   Drawer   │  │
│  │ Navigator  │  │ Navigator  │  │ Navigator  │  │ (optional) │  │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│                     State Management Layer                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│  │   Redux     │  │  Redux      │  │   Redux     │                │
│  │  Toolkit    │  │  Persist    │  │   Thunk     │                │
│  │   Store     │  │ (storage)   │  │ (async)     │                │
│  └─────────────┘  └─────────────┘  └─────────────┘                │
├─────────────────────────────────────────────────────────────────────┤
│                      Service Layer                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────┐ │
│  │   API       │  │   Socket    │  │   Jitsi     │  │   AWS    │ │
│  │  Service    │  │   Service   │  │   Service   │  │   IVS    │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └──────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│                     Platform/Native Layer                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│  │  React      │  │  Expo       │  │  Native     │                │
│  │  Native     │  │  Modules    │  │  APIs       │                │
│  └─────────────┘  └─────────────┘  └─────────────┘                │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Screens** | Full-page views combining UI and logic | Feature-based directories in `app/` or `src/screens/` |
| **Shared Components** | Reusable UI elements | `src/components/common/` or `src/components/ui/` |
| **Navigation** | Screen routing and deep linking | Expo Router file-based routing |
| **Redux Store** | Global state container | `src/store/` with feature slices |
| **API Service** | HTTP communication abstraction | `src/services/api/` with Axios |
| **Socket Service** | WebSocket/real-time communication | `src/services/socket/` with Socket.IO |
| **Jitsi Service** | Video/audio calling integration | `src/services/jitsi/` wrapper |
| **IVS Service** | Live streaming player | `src/services/ivs/` wrapper |

## Recommended Project Structure

### Feature-Based Structure (Recommended)

Following the web app's proven feature-based organization, adapted for React Native Expo:

```
src/
├── app/                          # Expo Router file-based routing
│   ├── (auth)/                   # Auth group (unauthenticated)
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── _layout.tsx
│   ├── (tabs)/                   # Tab navigation group
│   │   ├── feed.tsx             # Social feed screen
│   │   ├── teams.tsx            # Teams screen
│   │   ├── chat.tsx             # Chat list screen
│   │   ├── media.tsx            # Media library screen
│   │   ├── profile.tsx          # User profile screen
│   │   └── _layout.tsx          # Bottom tab navigation
│   ├── chat/                     # Chat feature routes
│   │   ├── [id].tsx             # Individual chat
│   │   └── _layout.tsx
│   ├── teams/                    # Teams feature routes
│   │   ├── [id].tsx             # Team detail
│   │   └── _layout.tsx
│   ├── live/                     # Live streaming
│   │   ├── [streamId].tsx       # Watch stream
│   │   └── _layout.tsx
│   ├── _layout.tsx               # Root layout
│   └── index.tsx                 # Initial route (redirects)
│
├── components/                    # React Native components
│   ├── common/                   # Shared across features
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Avatar.tsx
│   │   ├── VideoPlayer.tsx
│   │   └── index.ts
│   ├── feed/                     # Feed-specific components
│   │   ├── FeedPost.tsx
│   │   ├── PostCard.tsx
│   │   ├── CreatePostModal.tsx
│   │   └── index.ts
│   ├── chat/                     # Chat-specific components
│   │   ├── MessageBubble.tsx
│   │   ├── ChatInput.tsx
│   │   ├── OnlineIndicator.tsx
│   │   └── index.ts
│   ├── teams/                    # Teams-specific components
│   │   ├── TeamCard.tsx
│   │   ├── TeamMemberList.tsx
│   │   └── index.ts
│   └── media/                    # Media-specific components
│       ├── MediaGrid.tsx
│       ├── AlbumView.tsx
│       └── index.ts
│
├── store/                        # Redux Toolkit setup
│   ├── index.ts                  # Store configuration
│   ├── rootReducer.ts
│   └── slices/                   # Feature slices
│       ├── authSlice.ts
│       ├── feedSlice.ts
│       ├── chatSlice.ts
│       ├── teamSlice.ts
│       ├── mediaSlice.ts
│       └── uiSlice.ts            # Loading, toasts, modals
│
├── services/                     # Service layer
│   ├── api/                      # HTTP API abstraction
│   │   ├── client.ts            # Axios instance
│   │   ├── endpoints.ts         # API endpoints
│   │   ├── auth.service.ts
│   │   ├── feed.service.ts
│   │   ├── chat.service.ts
│   │   ├── team.service.ts
│   │   └── media.service.ts
│   ├── socket/                   # Socket.IO integration
│   │   ├── client.ts            # Socket instance
│   │   ├── events.ts            # Event handlers
│   │   └── managers/
│   │       ├── chatManager.ts   # Chat events
│   │       ├── feedManager.ts   # Feed updates
│   │       └── notificationManager.ts
│   ├── jitsi/                    # Jitsi Meet SDK wrapper
│   │   ├── JitsiService.ts
│   │   └── types.ts
│   └── ivs/                      # AWS IVS player wrapper
│       ├── IVSService.ts
│       └── types.ts
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   ├── useSocket.ts
│   ├── useChat.ts
│   ├── useFeed.ts
│   └── useTheme.ts
│
├── navigation/                   # Navigation types and utilities
│   ├── types.ts
│   └── linking.ts                # Deep linking config
│
├── utils/                        # Utility functions
│   ├── formatting.ts             # Date, number formatting
│   ├── validation.ts             # Form validation
│   ├── storage.ts                # AsyncStorage wrappers
│   └── constants.ts              # App constants
│
├── types/                        # TypeScript type definitions
│   ├── auth.types.ts
│   ├── feed.types.ts
│   ├── chat.types.ts
│   ├── team.types.ts
│   └── media.types.ts
│
├── theme/                        # Theme/styling
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── index.ts
│
└── assets/                       # Static assets
    ├── images/
    ├── fonts/
    └── icons/
```

### Structure Rationale

- **`app/` (Expo Router):** File-based routing matches web's React Router pattern, provides deep linking out of the box, and organizes screens by feature groups using route groups `(auth)`, `(tabs)`
- **`components/` feature-based:** Mirrors web app's proven pattern, each feature folder contains its own components, promotes parallel development
- **`store/slices/`:** Redux Toolkit slices co-located by feature, matching web app's state management approach
- **`services/` abstraction:** Centralized API/Socket/external service layer, consistent with web app's service pattern, enables easy mock data implementation
- **`hooks/`:** Custom hooks for complex state/logic reuse, keeps components clean
- **`theme/`:** Centralized theming for React Native Paper, supports light/dark mode switching
- **`types/`:** TypeScript definitions organized by feature, shared across components and services

## Architectural Patterns

### Pattern 1: Feature-Slice Co-Location

**What:** Each feature has its own Redux slice, components, services, and types grouped conceptually even if in different directories

**When to use:** All features in this app - feed, chat, teams, media

**Trade-offs:**
- Pros: Easy to find all code related to a feature, enables parallel development
- Cons: Some cross-feature sharing requires more discipline

**Example:**
```typescript
// src/store/slices/chatSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ChatService } from '@/services/api/chat.service';

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (chatId: string, { rejectWithValue }) => {
    try {
      return await ChatService.getMessages(chatId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Socket-driven updates
    newMessageReceived: (state, action) => {
      state.messages.push(action.payload);
    },
    onlineStatusChanged: (state, action) => {
      state.onlineUsers = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.loading = false;
      });
  }
});
```

### Pattern 2: Service Layer Abstraction

**What:** All external communication (HTTP, WebSocket, third-party SDKs) goes through service layer

**When to use:** All API calls, Socket.IO events, Jitsi/IVS integrations

**Trade-offs:**
- Pros: Easy to mock for testing, single place to update API contracts, consistent error handling
- Cons: More boilerplate for simple calls

**Example:**
```typescript
// src/services/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: __DEV__ ? 'https://mockapi.example.com' : 'https://api.example.com',
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// src/services/api/chat.service.ts
import apiClient from './client';
import { MockChatData } from '@/mocks/chat.mock';

export const ChatService = {
  async getMessages(chatId: string) {
    if (__DEV__ && USE_MOCK_DATA) {
      return MockChatData.getMessages(chatId);
    }
    return apiClient.get(`/chats/${chatId}/messages`);
  },

  async sendMessage(chatId: string, content: string, media?: string) {
    if (__DEV__ && USE_MOCK_DATA) {
      return MockChatData.sendMessage(chatId, content, media);
    }
    return apiClient.post(`/chats/${chatId}/messages`, { content, media });
  },

  async getChats() {
    if (__DEV__ && USE_MOCK_DATA) {
      return MockChatData.getChats();
    }
    return apiClient.get('/chats');
  }
};
```

### Pattern 3: Socket.IO Event Manager

**What:** Dedicated managers for handling Socket.IO events per feature, updating Redux store

**When to use:** Real-time chat, feed updates, notifications

**Trade-offs:**
- Pros: Centralized socket logic, easy to test, clean separation of concerns
- Cons: Additional abstraction layer

**Example:**
```typescript
// src/services/socket/managers/chatManager.ts
import { socket } from '../client';
import { store } from '@/store';
import { chatActions } from '@/store/slices/chatSlice';

export class ChatManager {
  static initialize() {
    // Listen for new messages
    socket.on('chat:message', (message) => {
      store.dispatch(chatActions.newMessageReceived(message));
    });

    // Listen for online status
    socket.on('chat:user_online', (userId) => {
      store.dispatch(chatActions.userCameOnline(userId));
    });

    socket.on('chat:user_offline', (userId) => {
      store.dispatch(chatActions.userWentOffline(userId));
    });

    // Listen for typing status
    socket.on('chat:typing', (data) => {
      store.dispatch(chatActions.userTyping(data));
    });
  }

  static cleanup() {
    socket.off('chat:message');
    socket.off('chat:user_online');
    socket.off('chat:user_offline');
    socket.off('chat:typing');
  }

  // Emit methods
  static joinChat(chatId: string) {
    socket.emit('chat:join', { chatId });
  }

  static leaveChat(chatId: string) {
    socket.emit('chat:leave', { chatId });
  }

  static sendMessage(chatId: string, content: string) {
    socket.emit('chat:send_message', { chatId, content });
  }

  static startTyping(chatId: string) {
    socket.emit('chat:typing_start', { chatId });
  }

  static stopTyping(chatId: string) {
    socket.emit('chat:typing_stop', { chatId });
  }
}
```

### Pattern 4: Expo Router File-Based Navigation

**What:** Routes are defined by file structure in `app/` directory

**When to use:** All navigation in the app

**Trade-offs:**
- Pros: Less boilerplate than React Navigation v5, deep linking built-in, familiar to Next.js developers
- Cons: Learning curve if coming from traditional React Navigation

**Example:**
```typescript
// app/(tabs)/_layout.tsx - Bottom tab navigation
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#6200EE',
    }}>
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name="teams"
        options={{
          title: 'Teams',
          tabBarIcon: ({ color }) => <Ionicons name="people" size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <Ionicons name="chatbubbles" size={28} color={color} />,
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined
        }}
      />
      <Tabs.Screen
        name="media"
        options={{
          title: 'Media',
          tabBarIcon: ({ color }) => <Ionicons name="images" size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />
        }}
      />
    </Tabs>
  );
}

// app/chat/[id].tsx - Dynamic route for individual chats
import { useLocalSearchParams, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { useChat } from '@/hooks/useChat';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { messages, loading } = useChat(id);

  if (loading) return <LoadingSpinner />;

  return (
    <View>
      <Stack.Screen options={{ title: `Chat ${id}` }} />
      <ChatMessageList messages={messages} />
      <ChatInput chatId={id} />
    </View>
  );
}
```

### Pattern 5: Jitsi Video Call Service

**What:** Wrapper service around Jitsi Meet SDK for video calling

**When to use:** 1-on-1 video/audio calls

**Trade-offs:**
- Pros: Encapsulates Jitsi complexity, consistent interface, easy to test/maintain
- Cons: Native module dependency, requires config handling

**Example:**
```typescript
// src/services/jitsi/JitsiService.ts
import JitsiMeet, { JitsiMeetOptions } from 'react-native-jitsi-meet';

export interface CallConfig {
  roomName: string;
  subject?: string;
  userInfo: {
    displayName: string;
    email?: string;
    avatar?: string;
  };
  audioOnly?: boolean;
}

export class JitsiService {
  private static initialized = false;

  static initialize() {
    if (this.initialized) return;

    const options: JitsiMeetOptions = {
      // App-specific configuration
      appURL: 'https://meet.jit.si',
      // Override default app group if needed
      // appGroup: 'group.com.yourcompany.yourapp'
    };

    JitsiMeet.initialize(options);
    this.initialized = true;
  }

  static async startCall(config: CallConfig): Promise<void> {
    if (!this.initialized) {
      this.initialize();
    }

    const options: JitsiMeetOptions = {
      room: config.roomName,
      userInfo: config.userInfo,
      subject: config.subject,
      audioOnly: config.audioOnly ?? false,
      // Config flags
      configOverrides: {
        'startWithAudioMuted': false,
        'startWithVideoMuted': false,
        'chatEnabled': true,
        'inviteEnabled': false,
        'tileViewEnabled': true,
      },
      // Feature flags
      featureFlags: {
        'live-streaming.enabled': false,
        'recording.enabled': false,
      }
    };

    try {
      await JitsiMeet.call(options);
    } catch (error) {
      console.error('Jitsi call error:', error);
      throw error;
    }
  }

  static endCall() {
    JitsiMeet.endCall();
  }
}
```

### Pattern 6: AWS IVS Live Streaming Service

**What:** Wrapper around AWS IVS Player SDK for live streaming

**When to use:** Watching live streams

**Trade-offs:**
- Pros: Native performance, AWS-managed infrastructure
- Cons: Additional native dependency

**Example:**
```typescript
// src/services/ivs/IVSService.ts
import { AmazonIvsPlayer } from 'amazon-ivs-react-native-player';

export class IVSService {
  static async createPlayer(streamUrl: string, playerId: string) {
    try {
      const player = await AmazonIvsPlayer.create(playerId);
      await player.load(streamUrl);
      return player;
    } catch (error) {
      console.error('IVS player creation error:', error);
      throw error;
    }
  }

  static async play(player: AmazonIvsPlayer) {
    await player.play();
  }

  static async pause(player: AmazonIvsPlayer) {
    await player.pause();
  }

  static async cleanup(player: AmazonIvsPlayer) {
    await player.delete();
  }

  static setupQualityCallbacks(
    player: AmazonIvsPlayer,
    onQualityChange: (quality: string) => void
  ) {
    player.addEventListener('onQualityChange', (data) => {
      onQualityChange(data.quality);
    });
  }
}
```

## Data Flow

### Request Flow

```
[User Action]
    ↓
[Screen Component]
    ↓ (dispatch action)
[Redux Thunk]
    ↓ (call service)
[API Service]
    ↓ (Axios request)
[External API]
    ↓ (response)
[API Service]
    ↓ (return data)
[Redux Thunk]
    ↓ (dispatch success)
[Redux Slice]
    ↓ (update state)
[Screen Component]
    ↓ (re-render from selector)
[UI Update]
```

### Real-Time Flow (Socket.IO)

```
[Backend Event]
    ↓ (WebSocket)
[Socket Service]
    ↓ (event emit)
[Socket Manager]
    ↓ (dispatch action)
[Redux Slice]
    ↓ (update state)
[Screen Component]
    ↓ (re-render from selector)
[UI Update]
```

### Video Call Flow

```
[User initiates call]
    ↓
[Chat Screen]
    ↓ (call service)
[JitsiService.startCall()]
    ↓ (launch native)
[Jitsi Meet SDK]
    ↓ (video call UI)
[User in call]
    ↓ (call ends)
[JitsiService.endCall()]
    ↓ (return to app)
[Chat Screen]
```

### Live Stream Flow

```
[User opens stream]
    ↓
[LiveStream Screen]
    ↓ (call service)
[IVSService.createPlayer()]
    ↓ (load stream)
[AWS IVS Player]
    ↓ (play video)
[User watching]
    ↓ (exit stream)
[IVSService.cleanup()]
    ↓ (cleanup player)
[LiveStream Screen]
```

### Key Data Flows

1. **Authentication Flow:** Login screen → Auth Service → API → Store token → Redux Persist → Redirect to main app
2. **Feed Flow:** Feed screen → Feed Service → API → Redux Slice → Feed Components (flat list)
3. **Chat Message Flow:** User sends → Chat Service → Socket emit → Backend → Socket broadcast → Chat Manager → Redux → UI update
4. **Video Call Flow:** User taps call → Generate room ID → Jitsi Service → Native SDK → Call UI → Return with result
5. **Live Stream Flow:** User selects stream → Stream URL → IVS Service → Native Player → Watch stream

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k users | Single Redux store, in-memory caching, mock data sufficient |
| 1k-100k users | Add pagination, implement AsyncStorage caching, optimize images, add code splitting |
| 100k+ users | Consider state normalization, implement aggressive caching, lazy route loading, background sync |

### Scaling Priorities

1. **First bottleneck:** Image/media loading - implement lazy loading, caching, compression
2. **Second bottleneck:** Real-time message volume - implement message pagination, virtual scrolling
3. **Third bottleneck:** Navigation performance - code split by route, lazy load screens

## Code Splitting Considerations

### Route-Based Splitting (Expo Router)

Expo Router automatically code-splits by route. Each screen file becomes its own bundle.

```typescript
// app/feed.tsx - automatically split
import { View } from 'react-native';

export default function FeedScreen() {
  // Heavy components can be lazy loaded
  const FeedPostList = useMemo(() =>
    require('@/components/feed/FeedPostList').default,
  []);

  return <FeedPostList />;
}
```

### Component Lazy Loading

For heavy components like video players or rich editors:

```typescript
// Lazy load video player component
import { lazy, Suspense } from 'react';

const VideoPlayer = lazy(() => import('@/components/common/VideoPlayer'));

function FeedPost({ videoUrl }) {
  return (
    <Suspense fallback={<VideoPlaceholder />}>
      {videoUrl && <VideoPlayer url={videoUrl} />}
    </Suspense>
  );
}
```

### Service Lazy Loading

External SDKs can be loaded on demand:

```typescript
// Lazy load Jitsi SDK only when needed
export class JitsiService {
  static async ensureInitialized() {
    if (!this.initialized) {
      const { default: JitsiMeet } = await import('react-native-jitsi-meet');
      this.initialize(JitsiMeet);
    }
  }
}
```

## Anti-Patterns

### Anti-Pattern 1: Prop Drilling State

**What people do:** Passing state through multiple component layers without Redux

**Why it's wrong:** Hard to maintain, difficult to debug, performance issues

**Do this instead:** Use Redux for global state, React Context for theme/navigation, props only for component-specific UI state

### Anti-Pattern 2: Direct API Calls in Components

**What people do:** Calling axios/fetch directly in screen components

**Why it's wrong:** Can't mock easily, inconsistent error handling, no centralized config

**Do this instead:** Always use service layer, create service methods for each API endpoint

### Anti-Pattern 3: Monolithic Redux Slice

**What people do:** Putting all state in one massive slice

**Why it's wrong:** Hard to maintain, actions collide, poor performance

**Do this instead:** Feature-based slices (auth, feed, chat, teams, media, ui)

### Anti-Pattern 4: Hardcoded Navigation Strings

**What people do:** Using string literals for navigation

**Why it's wrong:** Typos cause runtime errors, refactoring is hard

**Do this instead:** Use Expo Router's typed navigation or create navigation constants

```typescript
// Don't do this
navigation.navigate('ChatDetail', { chatId: '123' });

// Do this
import type { ChatStackParamList } from '@/navigation/types';
navigation.navigate<'ChatStack', 'ChatDetail'>('ChatDetail', { chatId: '123' });
```

### Anti-Pattern 5: Ignoring Platform Differences

**What people do:** Treating iOS and Android identically

**Why it's wrong:** UX patterns differ, permissions work differently

**Do this instead:** Use Platform module or Platform-specific files

```typescript
import { Platform } from 'react-native';

const styles = {
  container: {
    padding: Platform.select({
      ios: 20,
      android: 16,
    })
  }
};
```

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **API Backend** | Axios service layer with interceptors | Mock data support via __DEV__ flag |
| **Socket.IO** | Singleton socket instance with event managers | Initialize on app start, cleanup on logout |
| **Jitsi Meet** | Service wrapper around react-native-jitsi-meet | Requires native module, handle permissions |
| **AWS IVS** | Service wrapper around amazon-ivs-react-native-player | Native SDK integration |
| **AsyncStorage** | Wrapper service for Redux Persist | Used for auth tokens, preferences |
| **Expo Notifications** | Service wrapper for push token registration | Handle permissions per platform |
| **Media Upload** | Service wrapping FormData + fetch or SDK | Progress tracking, error handling |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **Screens ↔ Components** | Props + callbacks | Keep components pure, screens handle orchestration |
| **Screens ↔ Redux** | useDispatch, useSelector | Use typed hooks from store |
| **Services ↔ Redux** | Thunk actions | Services know nothing about Redux |
| **Socket Managers ↔ Redux** | Direct dispatch | Managers can dispatch actions directly |
| **Features** | Redux slices | Cross-feature communication via shared state or navigation params |

## Build Order Considerations for 4-Week Delivery

### Week 1: Foundation Infrastructure

**Order:**
1. Project setup (Expo, TypeScript, ESLint, Prettier)
2. Navigation structure (Expo Router with tab layout)
3. Redux store setup with core slices (auth, ui)
4. Theme system (React Native Paper theme)
5. Service layer base (API client, error handling)
6. Mock data infrastructure

**Why:** Establish patterns that all features will follow

### Week 2: Core Features (Feed + Auth)

**Order:**
1. Authentication screens (login, register)
2. Auth service + mock implementation
3. Redux auth slice with persist
4. Feed screen with flat list
5. Feed service + mock posts
6. Feed components (PostCard, VideoPlayer)
7. Create post functionality

**Why:** Auth is foundational, feed demonstrates UI patterns

### Week 3: Real-Time Features (Chat + Teams)

**Order:**
1. Chat screen list
2. Chat detail screen with message list
3. Socket service + managers
4. Chat service + mock messages
5. Redux chat slice with real-time updates
6. Teams screen
7. Team detail screen
8. Teams service + mock data

**Why:** Build synchronous features before asynchronous ones

### Week 4: Advanced Features (Video + Streaming + Polish)

**Order:**
1. Jitsi integration
2. Video call UI + service
3. Live stream screen
4. AWS IVS integration
5. Media library screen
6. Media upload service
7. Performance optimization
8. Build configurations (TestFlight, APK)

**Why:** Most complex integrations last, after core patterns proven

## Asset Management

### Images

```
assets/images/
├── common/
│   ├── logo.png
│   ├── placeholder.png
│   └── avatar-default.png
├── icons/
│   ├── tab-icon-feed.png
│   ├── tab-icon-chat.png
│   └── ...
└── onboarding/
    ├── step1.png
    └── step2.png
```

**Usage:**
```typescript
// Use require() for static images
<Image source={require('@/assets/images/logo.png')} />

// Use URI for dynamic/user images
<Image source={{ uri: user.avatarUrl }} />
```

### Fonts

```
assets/fonts/
├── Inter-Regular.ttf
├── Inter-Medium.ttf
├── Inter-Bold.ttf
└── custom-font.ttf
```

**Setup in app.json:**
```json
{
  "expo": {
    "fonts": [
      "./assets/fonts/Inter-Regular.ttf",
      "./assets/fonts/Inter-Medium.ttf",
      "./assets/fonts/Inter-Bold.ttf"
    ]
  }
}
```

**Theme integration:**
```typescript
// theme/typography.ts
export const fonts = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  bold: 'Inter-Bold',
};
```

### Optimization Strategies

1. **Image compression:** Use tools like TinyPNG before adding to assets
2. **WebP format:** Use WebP for better compression (iOS 14+, Android 4.3+)
3. **Lazy loading:** Load images below viewport on-demand
4. **Caching:** Implement aggressive caching for user avatars and media thumbnails
5. **Responsive sizing:** Serve different sizes based on device capabilities

## Sources

### Architecture & Structure

- [Expo App Folder Structure Best Practices](https://expo.dev/blog/expo-app-folder-structure-best-practices) - Official Expo guide (September 2025)
- [React Native EXPO Folder Structure For Large Scale Apps](https://www.linkedin.com/pulse/react-native-expo-folder-structure-large-scale-apps-md-alishan-ali-l2afc) - LinkedIn Pulse (2025)
- [Clean Architecture for Large React-Native Apps](https://medium.com/react-native-journal/clean-architecture-for-large-react-native-apps-building-scalable-maintainable-codebases-f2a1c1ae33d4) - React Native Journal
- [React Native Architecture in 2026](https://www.linkedin.com/posts/react-native-experts_react-native-architecture-in-2026-how-modern-activity-7414959358213779456-enQX) - LinkedIn (January 2026)

### State Management

- [Simplifying State Management in React Native Using Redux Toolkit](https://medium.com/react-native-journal/simplifying-state-management-in-react-native-using-redux-toolkit-without-boilerplate-ca3e62b59ea0) - React Native Journal
- [Redux for Global State Management in React Native](https://javascript.plainenglish.io/redux-for-global-state-management-in-react-native-38ac8edd9c5a) - JavaScript in Plain English (January 2026)
- [React State Management in 2025: What You Actually Need](https://www.developerway.com/posts/react-state-management-2025) - The Developer Way (September 2025)

### Navigation

- [Expo Router Core Concepts](https://docs.expo.dev/router/basics/core-concepts/) - Official Expo Documentation (July 2025)
- [Expo Router v6: A New Era of Native Feel](https://expo.dev/blog/expo-router-v6) - Expo Blog (September 2025)

### Real-Time & Socket.IO

- [Real-Time Chat Application Using Socket.IO (2026 PDF)](https://ijarcce.com/wp-content/uploads/2026/01/IJARCCE.2026.15174-REAL.pdf) - IJARCCE (January 2026)
- [Building a Chat App with Socket.IO and React Native](https://dev.to/novu/building-a-chat-app-with-socketio-and-react-native-k1b) - Dev.to
- [How to Make Real-Time Chat App Using React Native Socket.IO](https://medium.com/@odanicola/how-to-make-real-time-chat-app-using-react-native-socketio-and-mongodb-part-2-97d6a4982f6e) - Medium

### Video Calling (Jitsi)

- [Integrating Video Calls in React Native with Jitsi Meet](https://dev.to/stephen_adebayo_df57fd4ea/integrating-video-calls-in-react-native-with-jitsi-meet-4907) - Dev.to (July 2025)
- [Jitsi Meet Architecture Documentation](https://jitsi.github.io/handbook/docs/architecture/) - Official Jitsi Docs (Updated January 2026)
- [Introducing the Jitsi Meet React Native SDK](https://jitsi.org/blog/introducing-the-jitsi-meet-react-native-sdk/) - Jitsi Official Blog

### Live Streaming (AWS IVS)

- [Receiving a Live Stream With Amazon IVS in React Native](https://www.callstack.com/blog/receiving-live-stream-with-amazon-ivs-in-react-native) - Callstack Blog
- [Amazon IVS React Native Player](https://github.com/aws/amazon-ivs-react-native-player) - Official GitHub Repository
- [IVS Player SDK: Android Guide](https://docs.aws.amazon.com/ivs/latest/LowLatencyUserGuide/player-android.html) - AWS Docs (Updated January 2026)

### Code Splitting & Performance

- [How to Speed Up React Native Apps with Code Splitting](https://www.linkedin.com/posts/dilnawazkhan1996_reactnative-typescript-codesplitting-activity-7322834601071067136-VRKJ) - LinkedIn (April 2025)
- [5 Best Ways to Reduce React Native App Size Effectively in 2026](https://vocal.media/geeks/5-best-ways-to-reduce-react-native-app-size-effectively-in-2026) - Vocal Media (2026)
- [React Native in 2026: Trends & Predictions](https://blog.swmansion.com/react-native-in-2026-trends-and-our-predictions-463a837420c7) - Software Mansion (January 2026)

### Asset Management

- [Mastering Font Families in React Native Expo](https://medium.com/@ibukunogundipe2/mastering-font-families-in-react-native-expo-the-ultimate-guide-d5db2e3cc299) - Medium
- [How to Add Custom Fonts in React Native](https://blog.logrocket.com/how-to-add-custom-fonts-react-native/) - LogRocket Blog (April 2025)
- [Stop Hardcoding Colors and Fonts: Asset-Driven UI in React Native](https://javascript.plainenglish.io/stop-hardcoding-colors-and-fonts-asset-driven-ui-in-reactnative-bf7799403da8) - JavaScript in Plain English (September 2025)

---

*Architecture research for: React Native Expo Mobile App with Real-Time Features*
*Researched: 2026-02-03*
