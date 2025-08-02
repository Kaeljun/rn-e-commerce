import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabsParamList>;
  Carrinho: undefined;
  Filtros: undefined;
  NotFound: undefined;
  'Método de entrega': undefined;
  'Método de pagamento': undefined;
  'Finalizar compra': undefined;
  'Histórico de pedidos': undefined;
  'Novo endereço': undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type TabsParamList = {
  Início: undefined;
  Configurações: undefined;
};

export type TabsScreenProps<T extends keyof TabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
