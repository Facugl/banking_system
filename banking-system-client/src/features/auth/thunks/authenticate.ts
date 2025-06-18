import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthenticateRequest, AuthResponse } from '../types';
import { authenticateApi } from '../authApi';
import { AppError } from '../../../types';
import { Messages, HttpStatus } from '../../../utils/constants';
import getProfile from '../../customer/thunks/getProfile';

const authenticate = createAsyncThunk<
  AuthResponse,
  AuthenticateRequest,
  { rejectValue: AppError }
>(
  'auth/authenticate',
  async (credentials: AuthenticateRequest, { rejectWithValue, dispatch }) => {
    try {
      const { jwt } = await authenticateApi(credentials);
      sessionStorage.setItem('authToken', jwt);

      await dispatch(getProfile());

      return { jwt };
    } catch (error: any) {
      return rejectWithValue({
        frontendMessage: Messages.AUTHENTICATION_FAILED,
        backendMessage: error.message || Messages.UNKNOWN,
        status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  },
);

export default authenticate;
