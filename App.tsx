import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Lexend_400Regular } from '@expo-google-fonts/lexend';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AuthProvider } from './src/contexts/AuthContext';
import { RootNavigator } from './src/navigators/RootNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    Lexend_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  return (
    <>
      <StatusBar style="auto" />
      <RootNavigator />
    </>
  );
}
