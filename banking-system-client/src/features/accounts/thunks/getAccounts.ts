import { createAsyncThunk } from '@reduxjs/toolkit';
import { Account } from '../types';
import { getAccountsApi } from '../accountsApi';
import { AppError } from '../../../types';
import { Messages, HttpStatus } from '../../../utils/constants';

export const getAccounts = createAsyncThunk<
  Account[],
  void,
  { rejectValue: AppError }
>('accounts/getAccounts', async (_, { rejectWithValue }) => {
  try {
    return await getAccountsApi();
  } catch (error: any) {
    return rejectWithValue({
      frontendMessage: Messages.ACCOUNT_FETCH_ERROR,
      backendMessage: error.message || Messages.UNKNOWN,
      status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});
