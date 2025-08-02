import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resetStore } from '../actions';

const initialState = {
  id: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<User>) => action.payload,
    clearUser: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(resetStore, () => initialState);
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
