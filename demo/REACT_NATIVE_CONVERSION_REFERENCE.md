# iPractus - React Native Conversion Reference

> **Complete Design System Specification** extracted from 80 HTML screens for React Native implementation

---

## Table of Contents

1. [Theme Specifications](#theme-specifications)
2. [Typography System](#typography-system)
3. [Component Library](#component-library)
4. [Navigation Patterns](#navigation-patterns)
5. [Icon System](#icon-system)
6. [Spacing & Layout](#spacing--layout)
7. [Screen Categories](#screen-categories)
8. [Dependencies](#dependencies)
9. [Tailwind to StyleSheet Conversion](#tailwind-to-stylesheet-conversion)

---

## Theme Specifications

### Three Theme Variants

#### 1. Classic Light Theme (Default)
```javascript
const classicLightTheme = {
  primary: '#137fec',
  background: '#f6f7f8',
  surface: '#ffffff',
  text: {
    primary: '#111418',
    secondary: '#617589',
    tertiary: '#9dabb9'
  },
  border: '#e5e7eb',
  shadow: 'rgba(0, 0, 0, 0.1)',
  borderRadius: {
    sm: 4,    // 0.25rem
    md: 8,    // 0.5rem
    lg: 12,   // 0.75rem
    xl: 16,   // 1rem
    full: 9999
  }
}
```

#### 2. Classic Dark Theme
```javascript
const classicDarkTheme = {
  primary: '#1173d4',
  background: '#101922',
  surface: '#1c2127',
  surfaceElevated: '#2d353e',
  text: {
    primary: '#ffffff',
    secondary: '#9ca3af',
    tertiary: '#6b7280'
  },
  border: '#374151',
  shadow: 'rgba(0, 0, 0, 0.3)',
  chatBubble: '#2d353e',
  borderRadius: {
    sm: 4,    // 0.25rem
    md: 8,    // 0.5rem
    lg: 12,   // 0.75rem
    xl: 16,   // 1rem
    full: 9999
  }
}
```

#### 3. Pistachio v2 Theme (Performance/Green)
```javascript
const pistachioTheme = {
  primary: '#B2F15f',           // Bright green - key brand color
  accentCyan: '#66D9E8',
  obsidian: '#0B132B',          // Main background
  obsidianElevated: '#1C2541',  // Cards/surfaces
  stormyBlue: '#4E7D96',        // Secondary elements
  paleYellow: '#E5F1AF',        // Muted text
  background: '#0B132B',
  surface: '#1C2541',
  text: {
    primary: '#ffffff',
    secondary: '#E5F1AF',
    tertiary: '#4E7D96'
  },
  border: '#4E7D96',
  glow: 'rgba(178, 241, 98, 0.3)',
  borderRadius: {
    sm: 16,   // 1rem
    md: 32,   // 2rem
    lg: 48,   // 3rem
    xl: 64,
    full: 9999
  }
}
```

### Theme Provider Implementation
```javascript
// theme/context.js
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children, theme = 'classicLight' }) => {
  const themes = {
    classicLight: classicLightTheme,
    classicDark: classicDarkTheme,
    pistachio: pistachioTheme
  };

  return (
    <ThemeContext.Provider value={themes[theme]}>
      {children}
    </ThemeContext.Provider>
  );
};
```

---

## Typography System

### Font Families

#### Classic Themes
```javascript
const classicFonts = {
  primary: 'Lexend',  // Google Font
  fallback: 'sans-serif'
}
```

#### Pistachio Theme
```javascript
const pistachioFonts = {
  primary: 'Inter',   // Google Font
  fallback: 'sans-serif'
}
```

### React Native Font Setup
```javascript
// fonts.js
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export const useCustomFonts = () => {
  return useFonts({
    'Lexend-Regular': require('./assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Medium': require('./assets/fonts/Lexend-Medium.ttf'),
    'Lexend-SemiBold': require('./assets/fonts/Lexend-SemiBold.ttf'),
    'Lexend-Bold': require('./assets/fonts/Lexend-Bold.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
  });
};
```

### Type Scale

| Tailwind Class | Font Size | Line Height | Font Weight | RN Equivalent |
|---------------|-----------|-------------|-------------|---------------|
| text-xs | 12px | 16px | Normal/Medium | fontSize: 12, lineHeight: 16 |
| text-sm | 14px | 20px | Normal/Medium | fontSize: 14, lineHeight: 20 |
| text-base | 16px | 24px | Normal | fontSize: 16, lineHeight: 24 |
| text-lg | 18px | 28px | Normal/Semibold | fontSize: 18, lineHeight: 28 |
| text-xl | 20px | 28px | Bold | fontSize: 20, lineHeight: 28 |
| text-2xl | 24px | 32px | Bold | fontSize: 24, lineHeight: 32 |
| text-3xl | 30px | 36px | Bold | fontSize: 30, lineHeight: 36 |

---

## Component Library

### 1. Primary Button

**Classic Theme:**
```javascript
const PrimaryButton = ({ title, onPress }) => (
  <TouchableOpacity
    style={{
      backgroundColor: '#137fec',
      height: 56,
      borderRadius: 28,  // full - circular
      paddingHorizontal: 24,
      justifyContent: 'center',
      alignItems: center',
      shadowColor: '#137fec',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 4,
    }}
    onPress={onPress}
    activeOpacity={0.9}
  >
    <Text style={{
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
      fontFamily: 'Lexend-SemiBold'
    }}>
      {title}
    </Text>
  </TouchableOpacity>
);
```

**Pistachio Theme:**
```javascript
const PrimaryButton = ({ title, onPress }) => (
  <TouchableOpacity
    style={{
      backgroundColor: '#B2F15f',
      height: 56,
      borderRadius: 28,
      paddingHorizontal: 24,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'rgba(178, 241, 98, 0.3)',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 8,
    }}
    onPress={onPress}
  >
    <Text style={{
      color: '#0B132B',
      fontSize: 18,
      fontWeight: '700',
      fontFamily: 'Inter-Bold'
    }}>
      {title}
    </Text>
  </TouchableOpacity>
);
```

### 2. Text Input

**Classic Theme:**
```javascript
const TextInput = ({ placeholder, secureTextEntry }) => (
  <View style={{
    flexDirection: 'row',
    height: 56,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    paddingHorizontal: 16,
  }}>
    <MaterialIcons name="search" size={20} color="#9dabb9" />
    <TextInputRN
      style={{
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: '#111418',
        fontFamily: 'Lexend-Regular'
      }}
      placeholder={placeholder}
      placeholderTextColor="#9dabb9"
      secureTextEntry={secureTextEntry}
    />
  </View>
);
```

### 3. OTP Input

```javascript
const OTPInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(''));
  };

  return (
    <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
      {otp.map((digit, index) => (
        <TextInputRN
          key={index}
          style={{
            width: 44,
            height: 56,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '600',
            borderBottomWidth: 2,
            borderBottomColor: digit ? '#137fec' : '#d1d5db',
            color: '#111418',
          }}
          maxLength={1}
          keyboardType="number-pad"
          value={digit}
          onChangeText={(value) => handleChange(value, index)}
        />
      ))}
    </View>
  );
};
```

### 4. Avatar

```javascript
const Avatar = ({ source, size = 'md', status }) => {
  const sizes = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 64,
    '2xl': 80
  };

  return (
    <View style={{ position: 'relative' }}>
      <Image
        source={source}
        style={{
          width: sizes[size],
          height: sizes[size],
          borderRadius: sizes[size] / 2,
          borderWidth: 2,
          borderColor: '#137fec20'
        }}
      />
      {status && (
        <View style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: sizes[size] * 0.3,
          height: sizes[size] * 0.3,
          borderRadius: (sizes[size] * 0.3) / 2,
          backgroundColor: status === 'online' ? '#22c55e' : '#9ca3af',
          borderWidth: 2,
          borderColor: '#ffffff'
        }} />
      )}
    </View>
  );
};
```

### 5. Bottom Tab Bar

```javascript
const BottomTabBar = ({ activeTab, onChange }) => {
  const tabs = [
    { key: 'home', icon: 'home', label: 'Home' },
    { key: 'discover', icon: 'explore', label: 'Discover' },
    { key: 'teams', icon: 'groups', label: 'My Teams' },
    { key: 'profile', icon: 'person', label: 'Profile' },
  ];

  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#ffffff80',
      backdropBlur: 20,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
      paddingHorizontal: 24,
      paddingVertical: 12,
      paddingBottom: 12 + useSafeAreaInsets().bottom,
      flexDirection: 'row',
      justifyContent: 'space-around'
    }}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          onPress={() => onChange(tab.key)}
          style={{ alignItems: 'center', gap: 4 }}
        >
          <MaterialIcons
            name={tab.icon}
            size={24}
            color={activeTab === tab.key ? '#137fec' : '#9ca3af'}
          />
          <Text style={{
            fontSize: 10,
            fontWeight: '500',
            color: activeTab === tab.key ? '#137fec' : '#9ca3af'
          }}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
```

### 6. Achievement Badge

```javascript
const AchievementBadge = ({ unlocked, icon, title, gradient }) => (
  <View style={{ alignItems: 'center', gap: 8 }}>
    <View style={{
      width: '100%',
      aspectRatio: 1,
      borderRadius: 9999,
      backgroundColor: unlocked ? undefined : '#e5e7eb',
      opacity: unlocked ? 1 : 0.5,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      shadowColor: gradient?.from,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 6,
    }}>
      {unlocked && gradient && (
        <LinearGradient
          colors={[gradient.from, gradient.to]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
      )}
      {!unlocked && (
        <View style={{
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0.1)',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <MaterialIcons name="lock" size={24} color="#ffffff" />
        </View>
      )}
      <Image source={icon} style={{ width: '60%', height: '60%' }} />
    </View>
    <Text style={{
      fontSize: 12,
      fontWeight: unlocked ? '700' : '500',
      color: unlocked ? '#111418' : '#617589',
      textAlign: 'center'
    }}>
      {title}
    </Text>
  </View>
);
```

### 7. Team Card

```javascript
const TeamCard = ({ team }) => (
  <View style={{
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f3f4f6'
  }}>
    {/* Image Header */}
    <View style={{ position: 'relative', aspectRatio: 16/9 }}>
      <Image
        source={{ uri: team.image }}
        style={{ width: '100%', height: '100%' }}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'transparent']}
        style={{ position: 'absolute', inset: 0 }}
      />
      <View style={{
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: team.isOpen ? '#137fec' : '#f59e0b',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4
      }}>
        <Text style={{
          color: '#ffffff',
          fontSize: 10,
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: 1
        }}>
          {team.isOpen ? 'Open Team' : 'Invite Only'}
        </Text>
      </View>
    </View>

    {/* Content */}
    <View style={{ padding: 16, gap: 4 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#111418'
          }}>
            {team.name}
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#9dabb9'
          }}>
            {team.sport} • {team.members} Members
          </Text>
        </View>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          backgroundColor: '#f3f4f6',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <MaterialIcons name="groups" size={24} color="#137fec" />
        </View>
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12
      }}>
        {/* Avatar Stack */}
        <View style={{ flexDirection: 'row' }}>
          {team.avatars.slice(0, 3).map((avatar, i) => (
            <Image
              key={i}
              source={{ uri: avatar }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                borderWidth: 2,
                borderColor: '#ffffff',
                marginLeft: i > 0 ? -8 : 0
              }}
            />
          ))}
          <View style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: '#137fec',
            borderWidth: 2,
            borderColor: '#ffffff',
            marginLeft: -8,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{ color: '#ffffff', fontSize: 10, fontWeight: '700' }}>
              +{team.members - 3}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={{
          backgroundColor: team.isOpen ? '#137fec' : '#137fec20',
          paddingHorizontal: 16,
          height: 36,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 100
        }}>
          <Text style={{
            color: team.isOpen ? '#ffffff' : '#137fec',
            fontSize: 14,
            fontWeight: '600'
          }}>
            {team.isOpen ? 'Join Team' : 'Request'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);
```

---

## Navigation Patterns

### Top App Bar

**Standard Header:**
```javascript
const TopAppBar = ({ title, showBack, showNotification }) => {
  const navigation = useNavigation();

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: '#ffffff80',
      backdropBlur: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb'
    }}>
      {showBack && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#111418" />
        </TouchableOpacity>
      )}

      <Text style={{
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        color: '#111418',
        textAlign: 'center'
      }}>
        {title}
      </Text>

      {showNotification && (
        <TouchableOpacity>
          <MaterialIcons name="notifications" size={24} color="#137fec" />
        </TouchableOpacity>
      )}
    </View>
  );
};
```

### React Navigation Setup

```javascript
// navigation/index.js
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#ffffff80',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        height: 68
      }
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Discover" component={DiscoverScreen} />
    <Tab.Screen name="Teams" component={TeamsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Auth" component={AuthScreen} />
    <Stack.Screen name="Main" component={MainTabs} />
    <Stack.Screen name="TeamDetail" component={TeamDetailScreen} />
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);
```

---

## Icon System

### Material Symbols Outlined

```javascript
// Map commonly used icons to react-native-vector-icons
const iconMap = {
  'arrow_back_ios': 'arrow-back',
  'home': 'home',
  'explore': 'explore',
  'groups': 'group',
  'person': 'person',
  'notifications': 'notifications',
  'settings': 'settings',
  'search': 'search',
  'tune': 'tune',
  'sports_basketball': 'sports-basketball',
  'sports_soccer': 'sports-soccer',
  'sports_volleyball': 'sports-volleyball',
  'sports_tennis': 'sports-tennis',
  'sports_baseball': 'sports-baseball',
  'videocam': 'videocam',
  'mail': 'mail',
  'lock': 'lock',
  'check': 'check',
  'star': 'star',
  'favorite': 'favorite',
  'trending_up': 'trending-up',
  'trending_down': 'trending-down',
  'dashboard': 'dashboard',
  'monitoring': 'monitoring',
  'add': 'add',
  'send': 'send',
  'mic': 'mic',
  'info': 'info',
  'more_vert': 'more-vert',
  'calendar_today': 'calendar-today',
  'event_available': 'event-available',
  'share': 'share',
  'close': 'close',
  'edit': 'edit',
  'delete': 'delete',
  'check_circle': 'check-circle',
  'error': 'error',
  'warning': 'warning',
  'info': 'info',
  'play_arrow': 'play-arrow',
  'pause': 'pause',
  'stop': 'stop',
  'speed': 'speed',
  'bolt': 'bolt',
  'military_tech': 'military-tech',
  'emoji_events': 'emoji-events',
  'shield': 'shield',
  'verified': 'verified',
  'location_on': 'location-on',
  'phone': 'phone',
  'message': 'message',
  'camera_alt': 'camera-alt',
  'image': 'image',
  'videocam': 'videocam',
  'attach_file': 'attach-file',
  'sentiment_satisfied': 'sentiment-satisfied',
  'bookmark': 'bookmark',
  'bookmark_border': 'bookmark-border',
  'flag': 'flag',
  'report': 'report',
  'block': 'block',
  'logout': 'logout',
};

// Icon Component with FILL support
const Icon = ({ name, size = 24, color = '#111418', filled = false }) => {
  const materialIconsName = iconMap[name] || name;

  return (
    <MaterialIcons
      name={materialIconsName}
      size={size}
      color={color}
      // For filled icons, use MaterialIcons with appropriate weight
    />
  );
};
```

---

## Spacing & Layout

### Spacing Scale

| Tailwind | Value | Usage |
|----------|-------|-------|
| p-1 | 4px | Tight spacing |
| p-2 | 8px | Compact spacing |
| p-3 | 12px | Comfortable spacing |
| p-4 | 16px | Default spacing |
| p-5 | 20px | Medium spacing |
| p-6 | 24px | Generous spacing |
| p-8 | 32px | Large spacing |

### Common Layout Patterns

```javascript
// Centered container (max-w-md equivalent)
const Container = ({ children }) => (
  <View style={{ maxWidth: 448, alignSelf: 'center', width: '100%' }}>
    {children}
  </View>
);

// Flex row with gap (React Native < 0.71 doesn't support gap)
const RowWithGap = ({ gap = 16, children }) => (
  <View style={{ flexDirection: 'row' }}>
    {React.Children.map(children, (child, i) => (
      <View style={{ marginLeft: i > 0 ? gap : 0 }}>
        {child}
      </View>
    ))}
  </View>
);

// Stack with gap (vertical)
const VStack = ({ gap = 16, children }) => (
  <View>
    {React.Children.map(children, (child, i) => (
      <View style={{ marginTop: i > 0 ? gap : 0 }}>
        {child}
      </View>
    ))}
  </View>
);
```

---

## Screen Categories

### Onboarding (5 screens)
1. `welcome_to_ipractus.html` - Welcome splash
2. `choose_your_role.html` - Role selection
3. `set_up_your_profile.html` - Profile setup
4. `otp_verification.html` - OTP verification
5. `success___achievement.html` - Success/completion

### Authentication (5 screens)
1. `forgot_password.html` - Forgot password
2. `reset_new_password.html` - Reset password
3. `pistachio_forgot_password__v2.html` - Pistachio forgot password
4. `pistachio_otp_verify__v2.html` - Pistachio OTP

### Main App (15+ screens)
1. `ipractus_dashboard.html` - Dashboard
2. `social_feed.html` - Social feed
3. `explore_ipractus.html` - Explore
4. `messages.html` - Messages list
5. `1_on_1_message_chat.html` - 1-on-1 chat
6. `find_teams.html` - Find teams
7. `team_profile.html` - Team profile
8. `team_roster_management.html` - Team roster
9. `connections.html` - Connections/Followers
10. `achievements_gallery.html` - Achievements
11. `my_profile.html` - My profile
12. `edit_profile.html` - Edit profile
13. `media_library.html` - Media library
14. `media_albums.html` - Media albums

### Analytics & Performance (6 screens)
1. `athlete_performance_stats.html` - Athlete stats
2. `coach_performance_analytics.html` - Coach analytics
3. `training_plan_overview.html` - Training plans
4. `practice_drill_detail.html` - Drill detail
5. `log_drill_results.html` - Log results
6. `pistachio_analytics__system_v2.html` - Pistachio analytics

### Events & Scheduling (5 screens)
1. `event_details___rsvp.html` - Event details
2. `team_schedule.html` - Team schedule
3. `training_session_details.html` - Session details
4. `go_live_setup.html` - Go live setup
5. `live_sports.html` - Live sports

### Settings & Support (8 screens)
1. `settings.html` - Settings
2. `privacy_settings.html` - Privacy settings
3. `activity_alerts.html` - Activity alerts
4. `blocked_users.html` - Blocked users
5. `help___support.html` - Help & support
6. `about_ipractus.html` - About
7. `terms_of_service.html` - Terms
8. `privacy_policy.html` - Privacy

### Pistachio v2 (15+ screens)
1. `pistachio_dashboard__system_v2.html` - Dashboard
2. `pistachio_feed__system_v2.html` - Feed
3. `pistachio_profile__system_v2.html` - Profile
4. `pistachio_analytics__system_v2.html` - Analytics
5. `pistachio_athlete_stats__v2.html` - Athlete stats
6. `pistachio_teams__system_v2.html` - Teams
7. `pistachio_roster__system_v2.html` - Roster
8. `pistachio_coach_hub__system_v2.html` - Coach hub
9. `pistachio_plan_overview__v2.html` - Plan overview
10. `pistachio_session_details__v2.html` - Session details
11. `pistachio_drill__system_v2.html` - Drill
12. `pistachio_log_results__v2.html` - Log results
13. `pistachio_messages__system_v2.html` - Messages
14. `pistachio_1_on_1_chat__v2.html` - 1-on-1 chat
15. `pistachio_group_settings__v2.html` - Group settings
16. `pistachio_live__system_v2.html` - Live
17. `pistachio_live_chat__v2.html` - Live chat
18. `pistachio_video_call__system_v2.html` - Video call
19. `pistachio_settings__system_v2.html` - Settings
20. `pistachio_onboarding__system_v2.html` - Onboarding
21. `pistachio_success__system_v2.html` - Success
22. `pistachio_event__system_v2.html` - Event
23. `pistachio_about__system_v2.html` - About
24. `pistachio_refer__system_v2.html` - Refer
25. `pistachio_support__system_v2.html` - Support
26. `pistachio_terms__system_v2.html` - Terms
27. `pistachio_privacy__system_v2.html` - Privacy

### Live Streaming (4 screens)
1. `streamer_dashboard.html` - Streamer dashboard
2. `live_stream_expanded_chat.html` - Live with chat
3. `stream_summary.html` - Stream summary
4. `drill_video_player.html` - Video player

### Other (5 screens)
1. `video_call.html` - Video call
2. `group_invitation_landing.html` - Group invitation
3. `group_chat_settings.html` - Group chat settings
4. `notification_center.html` - Notification center
5. `ipractus_pro_upgrade.html` - Pro upgrade
6. `refer_a_friend.html` - Refer friend

---

## Dependencies

### Core Navigation
```json
{
  "react-navigation": "^6.1.9",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/stack": "^6.3.20",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "react-native-screens": "^3.27.0",
  "react-native-safe-area-context": "^4.7.4",
  "react-native-gesture-handler": "^2.13.4"
}
```

### UI Components
```json
{
  "react-native-vector-icons": "^10.0.2",
  "@react-native-community/blur": "^4.3.0",
  "react-native-linear-gradient": "^2.8.3",
  "react-native-reanimated": "^3.5.4"
}
```

### Charts & Data Visualization
```json
{
  "react-native-chart-kit": "^6.12.0",
  "react-native-svg": "^14.0.0",
  "victory-native": "^36.9.1"
}
```

### Media & Camera
```json
{
  "react-native-image-picker": "^7.1.0",
  "react-native-video": "^5.2.1",
  "expo-camera": "^13.6.0",
  "expo-av": "^13.10.0"
}
```

### Animations
```json
{
  "react-native-reanimated": "^3.5.4",
  "react-native-svg-transformer": "^1.3.0"
}
```

### Utilities
```json
{
  "react-native-keyboard-aware-scroll-view": "^0.9.5",
  "react-native-modal": "^13.0.1",
  "@react-native-async-storage/async-storage": "^1.19.5"
}
```

---

## Tailwind to StyleSheet Conversion

### Common Conversions

| Tailwind | React Native StyleSheet |
|----------|------------------------|
| `bg-white` | `backgroundColor: '#ffffff'` |
| `bg-primary` | `backgroundColor: theme.primary` |
| `text-white` | `color: '#ffffff'` |
| `text-primary` | `color: theme.primary` |
| `p-4` | `padding: 16` |
| `px-4 py-2` | `paddingHorizontal: 16, paddingVertical: 8` |
| `m-4` | `margin: 16` |
| `mx-auto` | `alignSelf: 'center'` (or marginHorizontal: 'auto' in web) |
| `flex` | `flex: 1` |
| `flex-row` | `flexDirection: 'row'` |
| `justify-between` | `justifyContent: 'space-between'` |
| `items-center` | `alignItems: 'center'` |
| `rounded-xl` | `borderRadius: 12` |
| `rounded-full` | `borderRadius: 9999` |
| `shadow-lg` | `shadowOpacity: 0.1, shadowRadius: 12, elevation: 4` |
| `w-full` | `width: '100%'` |
| `h-full` | `height: '100%'` |
| `max-w-md` | `maxWidth: 448` |
| `aspect-square` | `aspectRatio: 1` |
| `gap-4` | Use margin or Spacer component |

### Box Shadow Conversion

```javascript
// Tailwind: shadow-lg
// Convert to:
const shadowStyle = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 12,
  elevation: 4, // Android
};

// Pistachio glow shadow
const glowShadow = {
  shadowColor: '#B2F15f',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.3,
  shadowRadius: 20,
  elevation: 8,
};
```

### Gradient Conversion

```javascript
// Tailwind: bg-gradient-to-br from-blue-500 to-indigo-600
// Convert to LinearGradient from react-native-linear-gradient
<LinearGradient
  colors={['#3b82f6', '#4f46e5']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={{ flex: 1 }}
>
  {/* Content */}
</LinearGradient>
```

### Backdrop Blur Conversion

```javascript
// Tailwind: backdrop-blur-md
// Convert to BlurView from @react-native-community/blur
import { BlurView } from '@react-native-community/blur';

<BlurView
  blurType="light"
  blurAmount={20}
  reducedTransparencyFallbackColor="white"
  style={{ backgroundColor: '#ffffff80' }}
>
  {/* Content */}
</BlurView>
```

---

## Platform-Specific Notes

### iOS Specific
- Use `useSafeAreaInsets()` for safe area padding
- Home indicator at bottom (20px height)
- Status bar spacing (44px or 12px depending on iOS version)
- Blur effects require `@react-native-community/blur`

### Android Specific
- Shadow requires `elevation` prop
- Status bar is translucent by default
- Back navigation handled by hardware back button or `useBackHandler`

---

## Quick Reference Checklist

- [ ] Install all dependencies
- [ ] Set up theme context
- [ ] Configure React Navigation
- [ ] Create reusable components
- [ ] Set up vector icons
- [ ] Configure safe areas
- [ ] Implement bottom tab bar
- [ ] Create screen templates
- [ ] Test on both iOS and Android
- [ ] Verify dark mode support
- [ ] Test Pistachio theme variations

---

## File Structure Recommendation

```
src/
├── components/
│   ├── buttons/
│   │   ├── PrimaryButton.js
│   │   └── SecondaryButton.js
│   ├── inputs/
│   │   ├── TextInput.js
│   │   └── OTPInput.js
│   ├── cards/
│   │   ├── TeamCard.js
│   │   └── AchievementCard.js
│   ├── navigation/
│   │   ├── TopAppBar.js
│   │   └── BottomTabBar.js
│   └── common/
│       ├── Avatar.js
│       ├── Badge.js
│       └── Icon.js
├── screens/
│   ├── onboarding/
│   ├── auth/
│   ├── main/
│   ├── analytics/
│   ├── settings/
│   └── pistachio/
├── navigation/
│   └── index.js
├── theme/
│   ├── context.js
│   ├── colors.js
│   └── typography.js
├── hooks/
│   ├── useTheme.js
│   └── useSafeArea.js
├── utils/
│   └── helpers.js
└── assets/
    ├── fonts/
    └── images/
```

---

**Document Version:** 1.0
**Last Updated:** 2025-02-04
**Total Screens Analyzed:** 80
**Theme Variants:** 3 (Classic Light, Classic Dark, Pistachio v2)
