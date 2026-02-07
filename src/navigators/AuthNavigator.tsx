import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AUTH_ROUTES } from '../constants/routes';

import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignupScreen } from '../screens/auth/SignupScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { ForgotEmailSentScreen } from '../screens/auth/ForgotEmailSentScreen';
import { SignupEmailSentScreen } from '../screens/auth/SignupEmailSentScreen';

const Stack = createNativeStackNavigator();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={AUTH_ROUTES.LOGIN}
      screenOptions={{
        headerShown: false,
      }}
    >
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
      <Stack.Screen
        name={AUTH_ROUTES.FORGOT_EMAIL_SENT}
        component={ForgotEmailSentScreen}
      />
      <Stack.Screen
        name={AUTH_ROUTES.SIGNUP_EMAIL_SENT}
        component={SignupEmailSentScreen}
      />
    </Stack.Navigator>
  );
};
