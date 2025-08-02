import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const addressApi = createApi({
  reducerPath: 'adressApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://viacep.com.br/ws/',
  }),
  endpoints: builder => ({
    getAddress: builder.query({
      query: (cep: string) => `${cep}/json`,
    }),
  }),
});

export const { useGetAddressQuery, useLazyGetAddressQuery } = addressApi;
