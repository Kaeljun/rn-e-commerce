import { CartState } from '../../state/slices/cart-slice';
import { Address } from '../../utils/storage';

export type LoginResponse = {
  user: User;
};

export type ViaCepResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export type OrderResponse = {
  paymentMethod: string;
  userId: string;
  cart: CartState;
  address: Address;
  deliveryMethod: string;
  id: string;
  date: Date;
  orderNumber: string;
  pickupAddress: string;
};
