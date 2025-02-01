import { createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { AuthenticateRequest, DecodedToken } from '../types';
import { authenticateApi } from '../services/authApi';

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async (credentials: AuthenticateRequest, { rejectWithValue }) => {
    try {
      const response = await authenticateApi(credentials);
      const token = response.jwt;
      const decoded: DecodedToken = jwtDecode(token);

      return { token, role: decoded.role };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed, please try again.',
      );
    }
  },
);
