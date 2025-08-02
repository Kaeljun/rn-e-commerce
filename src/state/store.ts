import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './slices/cart-slice';
import { api } from '../services/api.service';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userReducer } from './slices/user-slice';
import { filtersReducer } from './slices/search-filters-slice';
import { cartListener } from './middleware/cart-persistence-middleware';
import { orderReducer } from './slices/order-slice';
import { addressApi } from '../services/address.service';
import { addressReducer } from './slices/address-slice';
import { feedbackReducer } from './slices/feedback-slice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    filters: filtersReducer,
    order: orderReducer,
    addresses: addressReducer,
    feedback: feedbackReducer,
    [api.reducerPath]: api.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(cartListener.middleware)
      .concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
