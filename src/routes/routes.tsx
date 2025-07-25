import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { HomePage } from '../pages/HomePage';
import { SettingsPage } from '../pages/SettingsPage';
import { Alert, useColorScheme, View } from 'react-native';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from '../utils/adapt-navigation-theme';
import { Icon, IconButton, Text } from 'react-native-paper';
import { TabBar } from '../components/tab-bar/TabBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShoppingCart } from '../pages/ShoppingCart';
import {
  RootStackParamList,
  RootStackScreenProps,
  TabsParamList,
  TabsScreenProps,
} from '../types/react-navigation';

const Tab = createBottomTabNavigator<TabsParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShoppingCart"
        component={ShoppingCart}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="NotFound"
        component={() => (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>Page Not Found</Text>
          </View>
        )}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const navigation = useNavigation();
  return (
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
          headerRight: () => {
            return (
              <IconButton
                icon="cart"
                onPress={() => navigation.navigate('ShoppingCart')}
              />
            );
          },
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
  );
};

export function Routes() {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;
  return (
    <NavigationContainer theme={theme}>
      <StackNavigator />
    </NavigationContainer>
  );
}
