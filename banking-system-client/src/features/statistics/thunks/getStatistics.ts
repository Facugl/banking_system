import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStatistics } from '../services/statisticsApi';
import { StatisticsResponse } from '../types';

export const getStatistics = createAsyncThunk<
  StatisticsResponse,
  void,
  { rejectValue: string }
>('statistics/getStatistics', async (_, thunkAPI) => {
  try {
    return await fetchStatistics();
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch statistics.');
  }
});
