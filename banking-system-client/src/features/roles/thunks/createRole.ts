import { createAsyncThunk } from '@reduxjs/toolkit';
import { createRoleApi } from '../rolesApi';
import { RoleRequest, RoleResponse } from '../types';
import { AxiosError } from 'axios';

export const createRole = createAsyncThunk<RoleResponse, RoleRequest>(
  'roles/createRole',
  async (role: RoleRequest, { rejectWithValue }) => {
    try {
      const { data } = await createRoleApi(role);
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to create role.',
      );
    }
  },
);
