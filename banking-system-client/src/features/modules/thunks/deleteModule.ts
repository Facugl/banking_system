import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteModuleApi } from '../services/modulesApi';
import { AxiosError } from 'axios';

export const deleteModule = createAsyncThunk<number, number>(
  'modules/deleteModule',
  async (id, { rejectWithValue }) => {
    try {
      await deleteModuleApi(id);
      return id;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Error deleting module.',
      );
    }
  },
);
