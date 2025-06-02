import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStatistics } from '../statisticsApi';
import { StatisticsError, StatisticsResponse } from '../types';

export const getStatistics = createAsyncThunk<
  StatisticsResponse,
  void,
  { rejectValue: StatisticsError }
>('statistics/getStatistics', async (_, { rejectWithValue }) => {
  try {
    return await fetchStatistics();
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data as StatisticsError);
    }
    return rejectWithValue({
      frontendMessage: 'Failed to fetch statistics.',
      backendMessage: error.message || 'Unknown error',
      status: error.response?.status || 500,
    } as StatisticsError);
  }
});
