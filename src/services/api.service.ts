import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from '../state/slices/user-slice';
import { Filters } from '../state/slices/search-filters-slice';
import { LoginResponse, OrderResponse } from './types/responses';
import { Order } from '../state/slices/order-slice';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { resetStore } from '../state/actions';
import { loadAddresses } from '../state/slices/address-slice';
import { loadCart } from '../state/slices/cart-slice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.15.8:3000/',
  credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      'public/refresh-token',
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      const user = refreshResult.data as User;
      api.dispatch(setUser(user));
      api.dispatch(loadAddresses(user.id));
      api.dispatch(loadCart(user.id));
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery('api/logout', api, extraOptions);
      api.dispatch(resetStore());
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Order'],
  endpoints: builder => ({
    getProducts: builder.infiniteQuery<Product[], Filters, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam(
          lastPage,
          _allPages,
          lastPageParam,
          _allPageParams,
          queryArg,
        ) {
          if (lastPage.length < queryArg._limit) return undefined;
          return lastPageParam + 1;
        },
        getPreviousPageParam(
          _firstPage,
          _allPages,
          firstPageParam,
          _allPageParams,
          _queryArg,
        ) {
          return firstPageParam > 0 ? firstPageParam - 1 : undefined;
        },
      },
      query: ({ pageParam, queryArg }) => {
        const params = new URLSearchParams();
        params.set('_page', pageParam.toString());
        params.set('_limit', queryArg._limit.toString());
        params.set('_sort', queryArg._sort);
        params.set('_order', queryArg._order);
        if (queryArg.search?.trim()) params.set('name', queryArg.search);
        return `api/products?${params.toString()}`;
      },
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
          dispatch(loadAddresses(data.user.id));
          dispatch(loadCart(data.user.id));
        },
      },
    ),
    getAuth: builder.query<User, void>({
      query: () => 'api/auth',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setUser(data));
        dispatch(loadAddresses(data.id));
        dispatch(loadCart(data.id));
      },
    }),
    getRefresh: builder.query<User, void>({
      query: () => 'public/refresh',
    }),
    order: builder.mutation<OrderResponse, Order>({
      query: ({ ...body }) => ({
        url: `api/order`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
    getOrder: builder.query<OrderResponse[], void>({
      query: () => 'api/order',
      providesTags: ['Order'],
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({
        url: `api/logout`,
        method: 'POST',
        body: {},
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(resetStore());
      },
    }),
    register: builder.mutation<
      { message: string },
      { email: string; password: string }
    >({
      query: ({ ...body }) => ({
        url: `public/register`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetProductsInfiniteQuery,
  useGetProductByIdQuery,
  useGetAuthQuery,
  useGetRefreshQuery,
  useLoginMutation,
  useOrderMutation,
  useGetOrderQuery,
  useLogOutMutation,
  useRegisterMutation,
} = api;
