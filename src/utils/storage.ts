import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartState } from '../state/slices/cart-slice';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

const EMPTY_CART: CartState = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const getCartState = async (userId: string): Promise<CartState> => {
  const key = `${userId}-cart-state`;

  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue) {
      const parsed = JSON.parse(jsonValue) as CartState;
      return parsed;
    }
  } catch (e) {
    console.error('AsyncStorage error (getCartState):', e);
  }

  return EMPTY_CART;
};

export type Address = {
  cep: string;
  street: string;
  number: string;
  city: string;
  neighborhood: string;
  addressName: string;
};

export const getSavedAddresses = async (userId: string): Promise<Address[]> => {
  try {
    const key = `${userId}-saved-addresses`;
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue) {
      const parsed = JSON.parse(jsonValue);
      return Array.isArray(parsed) ? parsed : [];
    }
    return [];
  } catch (e) {
    console.log('async storage error: ', e);
    return [];
  }
};

export const storeAddress = async (
  value: Address,
  userId: string,
): Promise<Address[]> => {
  try {
    const key = `${userId}-saved-addresses`;
    const current = await getSavedAddresses(userId);
    const updated = current.concat(value);
    await AsyncStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.log('async storage error: ', e);
    return [];
  }
};
