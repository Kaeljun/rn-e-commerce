import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomePage } from '../pages/HomePage/HomePage';
import { SettingsPage } from '../pages/SettingsPage';
import { useColorScheme } from 'react-native';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from '../utils/adapt-navigation-theme';
import { Icon } from 'react-native-paper';
import { TabBar } from '../components/tab-bar/TabBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShoppingCart } from '../pages/ShoppingCart/ShoppingCart';
import { RootStackParamList, TabsParamList } from '../types/react-navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { LoginPage } from '../pages/LoginPage';
import { useGetAuthQuery } from '../services/api.service';
import { NotFoundPage } from '../pages/NotFoundPage';
import { HomePageHeader } from '../pages/HomePage/components/HomePageHeader';
import { HomeFilterPage } from '../pages/HomeFilterPage';
import { PaymentMethodPage } from '../pages/PaymentMethodPage/PaymentMethodPage';
import { DeliverMethodPage } from '../pages/DeliverMethodPage';
import { FinishPurchasePage } from '../pages/FinishPurchasePage';
import { PurchaseHistoryPage } from '../pages/PurchaseHistoryPage';
import { AddAddressPage } from '../pages/AddAddressPage';
import { RegisterPage } from '../pages/RegisterPage';

const Tab = createBottomTabNavigator<TabsParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const PublicStack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Carrinho"
        component={ShoppingCart}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Filtros"
        component={HomeFilterPage}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundPage}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Método de pagamento"
        component={PaymentMethodPage}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Método de entrega"
        component={DeliverMethodPage}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Novo endereço"
        component={AddAddressPage}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Finalizar compra"
        component={FinishPurchasePage}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Histórico de pedidos"
        component={PurchaseHistoryPage}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
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
          header: HomePageHeader,
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

const UnauthenticatedStackNavigator = () => {
  return (
    <PublicStack.Navigator>
      <PublicStack.Screen
        name="Entrar"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <PublicStack.Screen
        name="Cadastrar"
        component={RegisterPage}
        options={{ headerShown: true }}
      />
    </PublicStack.Navigator>
  );
};

export function Routes() {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;
  useGetAuthQuery();
  const user = useSelector((state: RootState) => state.user);

  return (
    <NavigationContainer theme={theme}>
      {user?.id ? <StackNavigator /> : <UnauthenticatedStackNavigator />}
    </NavigationContainer>
  );
}
