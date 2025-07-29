import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './slices/cart-slice';
import { api } from '../services/api.service';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userReducer } from './slices/user-slice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
