import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Address, getSavedAddresses } from '../../utils/storage';
import { resetStore } from '../actions';

export const loadAddresses = createAsyncThunk(
  'addresses/load',
  async (userId: string) => await getSavedAddresses(userId),
);

const initialState = [] as Address[];

const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadAddresses.fulfilled, (_, action) => action.payload);
    builder.addCase(resetStore, () => initialState);
  },
});

export const addressReducer = addressesSlice.reducer;
