import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './slices/cart-slice';
import { api } from '../services/api.service';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userReducer } from './slices/user-slice';
import { filtersReducer } from './slices/search-filters-slice';
import { cartListener } from './middleware/cart-persistence-middleware';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    filters: filtersReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(cartListener.middleware)
      .concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
