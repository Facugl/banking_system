import { createAsyncThunk } from '@reduxjs/toolkit';
import { createModuleApi } from '../services/modulesApi';
import { ModuleRequest, ModuleResponse } from '../types';
import { AxiosError } from 'axios';

export const createModule = createAsyncThunk<ModuleResponse, ModuleRequest>(
  'modules/createModule',
  async (moduleData: ModuleRequest, { rejectWithValue }) => {
    try {
      const { data } = await createModuleApi(moduleData);
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Error creating the module.',
      );
    }
  },
);
