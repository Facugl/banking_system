import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateModuleApi } from '../services/modulesApi';
import { ModuleRequest, ModuleResponse } from '../types';
import { AxiosError } from 'axios';

export const updateModule = createAsyncThunk<
  ModuleResponse,
  { id: number; module: ModuleRequest }
>(
  'modules/updateModule',
  async ({ id, module: moduleData }, { rejectWithValue }) => {
    try {
      const { data } = await updateModuleApi(id, moduleData);
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Error updating the module.',
      );
    }
  },
);
