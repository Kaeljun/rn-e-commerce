import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../pages/home';
import { SettingsScreen } from '../pages/config';
import { useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from '../utils/adapt-navigation-theme';

const Tab = createBottomTabNavigator();

export default function Routes() {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
