import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateRoleApi } from '../services/rolesApi';
import { RoleRequest, RoleResponse } from '../types';
import { AxiosError } from 'axios';

export const updateRole = createAsyncThunk<
  RoleResponse,
  { id: number; role: RoleRequest }
>('roles/updateRole', async ({ id, role }, { rejectWithValue }) => {
  try {
    const { data } = await updateRoleApi(id, role);
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    return rejectWithValue(
      axiosError.response?.data || 'Error updating the role.',
    );
  }
});
