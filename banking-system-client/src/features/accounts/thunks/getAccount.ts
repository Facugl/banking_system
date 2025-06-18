import { createAsyncThunk } from '@reduxjs/toolkit';
import { Account } from '../types';
import { getAccountApi } from '../accountsApi';
import { AppError } from '../../../types';
import { Messages, HttpStatus } from '../../../utils/constants';

export const getAccount = createAsyncThunk<
  Account,
  string,
  { rejectValue: AppError }
>('accounts/getAccount', async (accountNumber, { rejectWithValue }) => {
  try {
    return await getAccountApi(accountNumber);
  } catch (error: any) {
    return rejectWithValue({
      frontendMessage:
        error.response?.data?.message || Messages.ACCOUNT_FETCH_ERROR,
      backendMessage: error.response?.data?.details || Messages.UNKNOWN,
      status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});
