import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateRoleApi } from '../rolesApi';
import { RoleResponse } from '../types';
import { AxiosError } from 'axios';

export const updateRole = createAsyncThunk<
  RoleResponse,
  { id: number; name: string }
>('roles/updateRole', async ({ id, name }, { rejectWithValue }) => {
  try {
    const { data } = await updateRoleApi(id, {name});
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    return rejectWithValue(
      axiosError.response?.data || 'Error updating the role.',
    );
  }
});
