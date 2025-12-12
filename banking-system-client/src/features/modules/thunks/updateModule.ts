import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateModuleApi } from '../services/modulesApi';
import { ModuleResponse } from '../types';
import { AxiosError } from 'axios';

export const updateModule = createAsyncThunk<
  ModuleResponse,
  { id: number; name: string; basePath: string }
>(
  'modules/updateModule',
  async ({ id, name, basePath }, { rejectWithValue }) => {
    try {
      const { data } = await updateModuleApi(id, { name, basePath });
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Error updating the module.',
      );
    }
  },
);
