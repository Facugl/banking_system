import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRolesApi } from '../rolesApi';
import { RoleResponse } from '../types';
import { AxiosError } from 'axios';

export const getRoles = createAsyncThunk<RoleResponse[]>(
  'roles/getRoles',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getRolesApi();
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to fetch roles.',
      );
    }
  },
);
