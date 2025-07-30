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
        console.log('queryArg', queryArg);
        const params = new URLSearchParams();
        params.set('_page', pageParam.toString());
        params.set('_limit', queryArg._limit.toString());
        params.set('_sort', queryArg._sort);
        params.set('_order', queryArg._order);
        if (queryArg.search?.trim()) params.set('name', queryArg.search);
        return `/api/products?${params.toString()}`;
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
  useGetProductsInfiniteQuery,
  useGetProductByIdQuery,
  useGetAuthQuery,
  useGetRefreshQuery,
  useLoginMutation,
} = api;
