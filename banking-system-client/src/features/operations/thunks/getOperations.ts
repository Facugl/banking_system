import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOperationsApi } from '../services/operationsApi';
import { OperationResponse } from './../types';
import { AxiosError } from 'axios';

export const getOperations = createAsyncThunk<OperationResponse[]>(
  'operations/getOperations',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getOperationsApi();
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.request?.data || 'Failed to fetch operations.',
      );
    }
  },
);
