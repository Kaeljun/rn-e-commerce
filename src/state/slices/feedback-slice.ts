import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resetStore } from '../actions';

const initialState = {
  visible: false,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setShowFeedback: (_state, action: PayloadAction<{ visible: boolean }>) =>
      action.payload,
  },
});

export const { setShowFeedback } = feedbackSlice.actions;
export const feedbackReducer = feedbackSlice.reducer;
