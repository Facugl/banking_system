import { createAsyncThunk } from '@reduxjs/toolkit';
import { ModuleResponse } from '../types';
import { AxiosError } from 'axios';
import { getModuleApi } from '../modulesApi';

export const getModule = createAsyncThunk<ModuleResponse, number>(
  'modules/getModule',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getModuleApi(id);
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Error obtaining the module.',
      );
    }
  },
);
