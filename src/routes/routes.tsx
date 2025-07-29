import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { HomePage } from '../pages/HomePage';
import { SettingsPage } from '../pages/SettingsPage';
import { useColorScheme, View } from 'react-native';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from '../utils/adapt-navigation-theme';
import { Badge, Icon, IconButton, Text } from 'react-native-paper';
import { TabBar } from '../components/tab-bar/TabBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShoppingCart } from '../pages/ShoppingCart';
import { RootStackParamList, TabsParamList } from '../types/react-navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { LoginPage } from '../pages/LoginPage';

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
  const cart = useSelector((state: RootState) => state.cart);
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
              <>
                <IconButton
                  icon="cart"
                  size={26}
                  onPress={() => navigation.navigate('ShoppingCart')}
                />
                <Badge
                  visible={cart.totalItems > 0}
                  style={{ position: 'absolute', bottom: 10, right: 5 }}
                  children={cart.totalItems}
                />
              </>
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
  const user = useSelector((state: RootState) => state.user);

  return (
    <NavigationContainer theme={theme}>
      {user?.id ? <StackNavigator /> : <LoginPage />}
    </NavigationContainer>
  );
}
