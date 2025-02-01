import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutApi } from '../services/authApi';

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      return await logoutApi();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed.');
    }
  },
);
