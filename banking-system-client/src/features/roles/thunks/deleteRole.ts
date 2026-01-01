import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteRoleApi } from '../rolesApi';
import { AxiosError } from 'axios';

export const deleteRole = createAsyncThunk<number, number>(
  'roles/deleteRole',
  async (id, { rejectWithValue }) => {
    try {
      await deleteRoleApi(id);
      return id;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Error deleting role.',
      );
    }
  },
);
