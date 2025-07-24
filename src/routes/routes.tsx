import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomePage } from '../pages/HomePage';
import { SettingsPage } from '../pages/SettingsPage';
import { useColorScheme } from 'react-native';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from '../utils/adapt-navigation-theme';
import { Icon } from 'react-native-paper';
import { TabBar } from '../components/tab-bar/TabBar';

const Tab = createBottomTabNavigator();

export function Routes() {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        initialRouteName="Início"
        tabBar={props => <TabBar {...props} />}
      >
        <Tab.Screen
          name="Início"
          component={HomePage}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon source="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Configurações"
          component={SettingsPage}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon source="cog" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
