import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../hooks/useTheme';
import { TAB_ROUTES } from '../constants/routes';

// Tab screens
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { FeedPlaceholderScreen } from '../screens/dashboard/FeedPlaceholderScreen';
import { LivePlaceholderScreen } from '../screens/dashboard/LivePlaceholderScreen';
import { MessagesPlaceholderScreen } from '../screens/dashboard/MessagesPlaceholderScreen';
import { ProfilePlaceholderScreen } from '../screens/dashboard/ProfilePlaceholderScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * Dashboard stack (for nested navigation)
 */
const DashboardStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardMain" component={DashboardScreen} />
    </Stack.Navigator>
  );
};

/**
 * Feed stack (for nested navigation)
 */
const FeedStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FeedMain" component={FeedPlaceholderScreen} />
    </Stack.Navigator>
  );
};

/**
 * Live stack (for nested navigation)
 */
const LiveStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LiveMain" component={LivePlaceholderScreen} />
    </Stack.Navigator>
  );
};

/**
 * Messages stack (for nested navigation)
 */
const MessagesStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MessagesMain" component={MessagesPlaceholderScreen} />
    </Stack.Navigator>
  );
};

/**
 * Profile stack (for nested navigation)
 */
const ProfileStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfilePlaceholderScreen} />
    </Stack.Navigator>
  );
};

/**
 * Main bottom tab navigator with 5 tabs
 */
export const AppNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          switch (route.name) {
            case TAB_ROUTES.DASHBOARD:
              iconName = focused ? 'home' : 'home-outline';
              break;
            case TAB_ROUTES.FEED:
              iconName = focused ? 'list' : 'list-outline';
              break;
            case TAB_ROUTES.LIVE:
              iconName = focused ? 'radio' : 'radio-outline';
              break;
            case TAB_ROUTES.MESSAGES:
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case TAB_ROUTES.PROFILE:
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={TAB_ROUTES.DASHBOARD}
        component={DashboardStack}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name={TAB_ROUTES.FEED}
        component={FeedStack}
        options={{ tabBarLabel: 'Feed' }}
      />
      <Tab.Screen
        name={TAB_ROUTES.LIVE}
        component={LiveStack}
        options={{ tabBarLabel: 'Live' }}
      />
      <Tab.Screen
        name={TAB_ROUTES.MESSAGES}
        component={MessagesStack}
        options={{ tabBarLabel: 'Messages' }}
      />
      <Tab.Screen
        name={TAB_ROUTES.PROFILE}
        component={ProfileStack}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};
