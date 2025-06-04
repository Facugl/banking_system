import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthenticateRequest, AuthenticateResponse, AuthError } from '../types';
import { authenticateApi } from '../authApi';
import { decodeToken } from '../../../utils/jwt';

const authenticate = createAsyncThunk<
  AuthenticateResponse,
  AuthenticateRequest,
  { rejectValue: AuthError }
>(
  'auth/authenticate',
  async (credentials: AuthenticateRequest, { rejectWithValue }) => {
    try {
      const response = await authenticateApi(credentials);
      const jwt = response.jwt;
      const { role, username, name } = decodeToken(jwt);

      return { jwt, role: role || '', username, name };
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data as AuthError);
      }
      return rejectWithValue({
        frontendMessage: 'An unexpected error occurred during authentication',
        backendMessage: error.message || 'Unknown error',
        status: error.response?.status || 500,
      } as AuthError);
    }
  },
);

export default authenticate;
