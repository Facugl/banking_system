import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllModulesApi } from '../services/modulesApi';
import { ModuleResponse } from '../types';
import { AxiosError } from 'axios';

export const getModules = createAsyncThunk<ModuleResponse[]>(
  'modules/getModules',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAllModulesApi();
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Error obtaining modules.',
      );
    }
  },
);
