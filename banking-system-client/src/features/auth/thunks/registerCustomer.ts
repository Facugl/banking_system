import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerApi } from '../authApi';
import { RegisterRequest, AuthResponse } from '../types';
import { AppError } from '../../../types';
import { Messages, HttpStatus } from '../../../utils/constants';
import getProfile from '../../customer/thunks/getProfile';

const registerCustomer = createAsyncThunk<
  AuthResponse,
  RegisterRequest,
  { rejectValue: AppError }
>('users', async (customer: RegisterRequest, { rejectWithValue, dispatch }) => {
  try {
    const { jwt } = await registerApi(customer);
    sessionStorage.setItem('authToken', jwt);

    await dispatch(getProfile());

    return { jwt };
  } catch (error: any) {
    return rejectWithValue({
      frontendMessage: Messages.REGISTRATION_FAILED,
      backendMessage: error.message || Messages.UNKNOWN,
      status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export default registerCustomer;
