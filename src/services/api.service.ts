import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from '../state/slices/user-slice';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.15.7:3000/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'api/products',
    }),
    getProductById: builder.query({
      query: (id: string) => `api/products/${id}`,
    }),
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: ({ ...body }) => ({
          url: `public/login`,
          method: 'POST',
          body,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
        },
      },
    ),
    getAuth: builder.query<User, void>({
      query: () => 'api/auth',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setUser(data));
      },
    }),
    getRefresh: builder.query<void, void>({
      query: () => 'public/refresh',
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetAuthQuery,
  useGetRefreshQuery,
  useLoginMutation,
} = api;
