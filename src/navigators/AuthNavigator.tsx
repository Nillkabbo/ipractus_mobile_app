import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AUTH_ROUTES } from '../constants/routes';

// Auth screens (created in plan 01-04)
import { WelcomeScreen } from '../screens/auth/WelcomeScreen';
import { RoleSelectionScreen } from '../screens/auth/RoleSelectionScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignupScreen } from '../screens/auth/SignupScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';

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
        component={WelcomeScreen}
      />
      <Stack.Screen
        name={AUTH_ROUTES.ROLE}
        component={RoleSelectionScreen}
      />
      <Stack.Screen
        name={AUTH_ROUTES.LOGIN}
        component={LoginScreen}
      />
      <Stack.Screen
        name={AUTH_ROUTES.SIGNUP}
        component={SignupScreen}
      />
      <Stack.Screen
        name={AUTH_ROUTES.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};
