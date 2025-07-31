import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
      if (!existingProduct) state.products.push(product);
      if (existingProduct) existingProduct.quantity += 1;
      state.totalItems += product.quantity;
      state.totalPrice += product.price * product.quantity;
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
      if (existingProduct) {
        existingProduct.quantity -= 1;
        state.totalItems -= 1;
      }
      if (existingProduct && existingProduct.quantity <= 0) {
        state.products = state.products.filter(p => p.id !== productId);
      }
      state.totalPrice -= existingProduct ? existingProduct.price : 0;
    },
    remove: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingProduct = state.products.find(p => p.id === productId);
      if (existingProduct) {
        state.totalItems -= existingProduct.quantity;
        state.totalPrice -= existingProduct.price * existingProduct.quantity;
        state.products = state.products.filter(p => p.id !== productId);
      }
      state.totalItems = Math.max(state.totalItems, 0);
      state.totalPrice = Math.max(state.totalPrice, 0);
    },
    setCart: (state, action: PayloadAction<CartState>) => action.payload,
  },
});

export const { add, decrement, increment, remove, setCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
