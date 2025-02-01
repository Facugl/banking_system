import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerApi } from '../services/authApi';
import { RegisterRequest } from '../types';

export const registerCustomer = createAsyncThunk(
  'auth/registerCustomer',
  async (customer: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await registerApi(customer);
      const { token: token, ...customerData } = response;
      return { token, ...customerData };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Error while registering customer.',
      );
    }
  },
);
