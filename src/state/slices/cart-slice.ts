import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { resetStore } from '../actions';
import { getCartState } from '../../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CartAction = 'add' | 'remove' | 'decrement' | 'changeByAmount';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export type CartProduct = Product & { quantity: number };

export interface CartState {
  products: CartProduct[];
  totalItems: number;
  totalPrice: number;
}

export const loadCart = createAsyncThunk(
  'cart/load',
  async (userId: string) => await getCartState(userId),
);

export const clearCart = createAsyncThunk(
  'cart/clear',
  async (userId: string) =>
    await AsyncStorage.removeItem(`${userId}-cart-state`),
);

const initialState: CartState = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      const product = {
        ...action.payload,
        quantity: 1,
      };
      const existingProduct = state.products.find(p => p.id === product.id);
      if (!existingProduct) {
        state.products.push(product);
        state.totalItems += 1;
        state.totalPrice += product.price;
      }
    },
    increment: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingProduct = state.products.find(p => p.id === productId);
      if (existingProduct) {
        existingProduct.quantity += 1;
        state.totalItems += 1;
        state.totalPrice += existingProduct.price;
      }
    },
    decrement: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingProduct = state.products.find(p => p.id === productId);
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        state.totalItems -= 1;
        state.totalPrice -= existingProduct.price;
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingProduct = state.products.find(p => p.id === productId);
      if (existingProduct) {
        state.totalItems -= existingProduct.quantity;
        state.totalPrice -= existingProduct.price * existingProduct.quantity;
        state.products = state.products.filter(p => p.id !== productId);
      }
    },
    setCart: (_state, action: PayloadAction<CartState>) => action.payload,
  },
  extraReducers: builder => {
    builder.addCase(loadCart.fulfilled, (_, action) => action.payload);
    builder.addCase(resetStore, () => initialState);
    builder.addCase(clearCart.fulfilled, () => initialState);
  },
});

export const { add, decrement, increment, remove, setCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
