import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AUTH_ROUTES } from '../constants/routes';

// Auth screens (created in plan 01-04)
// Using placeholder components for now - will be replaced with actual screens
const PlaceholderScreen = ({ name }: { name: string }) => (
  null // Placeholder - actual screens created in plan 01-04
);

const Stack = createNativeStackNavigator();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={AUTH_ROUTES.WELCOME}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={AUTH_ROUTES.WELCOME}
        component={() => PlaceholderScreen({ name: 'Welcome' })}
      />
      <Stack.Screen
        name={AUTH_ROUTES.ROLE}
        component={() => PlaceholderScreen({ name: 'RoleSelection' })}
      />
      <Stack.Screen
        name={AUTH_ROUTES.LOGIN}
        component={() => PlaceholderScreen({ name: 'Login' })}
      />
      <Stack.Screen
        name={AUTH_ROUTES.SIGNUP}
        component={() => PlaceholderScreen({ name: 'Signup' })}
      />
      <Stack.Screen
        name={AUTH_ROUTES.FORGOT_PASSWORD}
        component={() => PlaceholderScreen({ name: 'ForgotPassword' })}
      />
    </Stack.Navigator>
  );
};

// TODO: Replace placeholder components with actual screen imports in plan 01-04:
// import { WelcomeScreen } from '../screens/auth/WelcomeScreen';
// import { RoleSelectionScreen } from '../screens/auth/RoleSelectionScreen';
// import { LoginScreen } from '../screens/auth/LoginScreen';
// import { SignupScreen } from '../screens/auth/SignupScreen';
// import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
