import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteOperationApi } from '../services/operationsApi';
import { AxiosError } from 'axios';

export const deleteOperation = createAsyncThunk<number, number>(
  'operations/deleteOperation',
  async (id, { rejectWithValue }) => {
    try {
      await deleteOperationApi(id);
      return id;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Error deleting operation.',
      );
    }
  },
);
