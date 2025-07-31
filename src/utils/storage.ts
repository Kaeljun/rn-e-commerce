import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartState } from '../state/slices/cart-slice';

export const storeCartState = async (value: CartState) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('cart-state', jsonValue);
  } catch (e) {
    console.log('async storage error: ', e);
  }
};

export const getCartState = async (): Promise<CartState | null | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem('cart-state');
    return jsonValue != null ? (JSON.parse(jsonValue) as CartState) : null;
  } catch (e) {
    console.log('async storage error: ', e);
  }
};
