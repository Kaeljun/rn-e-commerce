import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState } from './cart-slice';
import { AddressForm } from '../../schemas/address.schema';
import { resetStore } from '../actions';

type Address = AddressForm;

export type Order = {
  paymentMethod: string;
  cart: CartState;
  address: Address;
  deliveryMethod: string;
  pickupAddress: string;
};

const initialState: Order = {
  paymentMethod: '',
  cart: {
    products: [],
    totalItems: 0,
    totalPrice: 0,
  },
  deliveryMethod: '',
  pickupAddress: '',
  address: {
    city: '',
    street: '',
    addressName: '',
    neighborhood: '',
    number: '',
    cep: '',
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderInfo: (_state, action: PayloadAction<Order>) => action.payload,
    setOrderPaymentMethod: (state, action: PayloadAction<string>) => {
      return { ...state, paymentMethod: action.payload };
    },
    setOrderProducts: (state, action: PayloadAction<CartState>) => {
      return { ...state, cart: action.payload };
    },
    setOrderAddress: (state, action: PayloadAction<Address>) => {
      return { ...state, address: action.payload };
    },
    setOrderDeliveryMethod: (state, action: PayloadAction<string>) => {
      return { ...state, deliveryMethod: action.payload };
    },
    setOrderPickupAddress: (state, action: PayloadAction<string>) => {
      return { ...state, pickupAddress: action.payload };
    },
    clearOrderInfo: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(resetStore, () => initialState);
  },
});

export const {
  setOrderInfo,
  clearOrderInfo,
  setOrderPaymentMethod,
  setOrderAddress,
  setOrderProducts,
  setOrderDeliveryMethod,
  setOrderPickupAddress,
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
