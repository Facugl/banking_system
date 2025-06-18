import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutApi } from '../authApi';
import { AppError } from '../../../types';
import { Messages, HttpStatus } from '../../../utils/constants';

const logout = createAsyncThunk<
  { message: string },
  void,
  { rejectValue: AppError }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    return await logoutApi();
  } catch (error: any) {
    return rejectWithValue({
      frontendMessage: Messages.LOGOUT_FAILED,
      backendMessage: error.message || Messages.UNKNOWN,
      status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export default logout;
