import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Filters = {
  search: string;
  _limit: number;
  _page: number;
  _sort: string;
  _order: string;
};

const initialState = {
  search: '',
  _limit: 10,
  _page: 1,
  _sort: 'name',
  _order: 'asc',
};

const filtersSlice = createSlice({
  name: 'search-filters',
  initialState,
  reducers: {
    setFilters: (_state, action: PayloadAction<Filters>) => action.payload,
    clear: () => initialState,
  },
});

export const { setFilters, clear } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
