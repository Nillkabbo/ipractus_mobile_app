import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Lexend_400Regular } from '@expo-google-fonts/lexend';
import { ThemeProvider, useTheme } from './src/hooks/useTheme';
import { RootNavigator } from './src/navigators/RootNavigator';

// App wrapper with theme provider
export default function App() {
  const [fontsLoaded] = useFonts({
    Lexend_400Regular,
  });

  if (!fontsLoaded) {
    return null; // Or loading screen
  }

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer theme={theme}>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}
