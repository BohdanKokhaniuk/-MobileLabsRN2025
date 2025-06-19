import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { lightTheme, darkTheme } from './themes/themes';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <AppNavigator toggleTheme={() => setIsDark(!isDark)} />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
