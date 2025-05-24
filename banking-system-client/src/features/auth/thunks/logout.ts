import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutApi } from '../authApi';
import { AuthError } from '../types';

const logout = createAsyncThunk<
  { message: string },
  void,
  { rejectValue: AuthError }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    return await logoutApi();
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data as AuthError);
    }
    return rejectWithValue({
      frontendMessage: 'An unexpected error occurred during logout',
      backendMessage: error.message || 'Unknown error',
      status: error.response?.status || 500,
    } as AuthError);
  }
});

export default logout;
