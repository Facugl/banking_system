import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRoleApi } from '../rolesApi';
import { RoleResponse } from '../types';
import { AxiosError } from 'axios';

export const getRole = createAsyncThunk<RoleResponse, number>(
  'roles/getRole',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getRoleApi(id);
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Error obtaining the role.',
      );
    }
  },
);
