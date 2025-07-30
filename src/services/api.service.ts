import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from '../state/slices/user-slice';
import { Filters } from '../state/slices/search-filters-slice';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.15.7:3000/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getProducts: builder.query<Product[], Filters>({
      query: ({ _limit, _page, search, _order, _sort }) => {
        const params = new URLSearchParams();
        params.set('_page', _page.toString());
        params.set('_limit', _limit.toString());
        params.set('_sort', _sort);
        params.set('_order', _order);
        if (search?.trim()) params.set('name', search);
        return `/api/products?${params.toString()}`;
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      // serializeQueryArgs: ({ endpointName }) => endpointName,
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
