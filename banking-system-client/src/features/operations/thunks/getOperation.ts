import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOperationApi } from '../services/operationsApi';
import { OperationResponse } from '../types';
import { AxiosError } from 'axios';

export const getOperation = createAsyncThunk<OperationResponse, number>(
  'operations/getOperation',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getOperationApi(id);
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Error obtaining the operation.',
      );
    }
  },
);
