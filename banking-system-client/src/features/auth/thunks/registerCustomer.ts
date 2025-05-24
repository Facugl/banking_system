import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerApi } from '../authApi';
import { AuthError, RegisterRequest, RegisterResponse } from '../types';

const registerCustomer = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  { rejectValue: AuthError }
>('users', async (customer: RegisterRequest, { rejectWithValue }) => {
  try {
    const response = await registerApi(customer);
    const { jwt, ...customerData } = response;
    return { jwt, ...customerData };
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data as AuthError);
    }
    return rejectWithValue({
      frontendMessage: 'An unexpected error occurred during registration',
      backendMessage: error.message || 'Unknown error',
      status: error.response?.status || 500,
    } as AuthError);
  }
});

export default registerCustomer;
