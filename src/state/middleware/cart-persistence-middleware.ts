import { isAnyOf } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { add, decrement, increment, remove } from '../slices/cart-slice';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const cartListener = createListenerMiddleware();
const cartActionMatchers = isAnyOf(add, remove, decrement, increment);
cartListener.startListening({
  matcher: cartActionMatchers,
  effect: async (_action, listenerApi) => {
    const { cart } = listenerApi.getState() as RootState;
    await AsyncStorage.setItem('cart-state', JSON.stringify(cart));
  },
});
