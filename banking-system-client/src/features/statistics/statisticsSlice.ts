import { createSlice } from '@reduxjs/toolkit';
import { getStatistics } from './thunks/getStatistics';
import { StatisticsState } from './types';

const initialState: StatisticsState = {
  statistics: null,
  isLoading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatistics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.statistics = action.payload;
      })
      .addCase(getStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default statisticsSlice.reducer;
