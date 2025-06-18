import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAccountBalanceApi } from '../accountsApi';
import { Messages, HttpStatus } from '../../../utils/constants';
import { AppError } from '../../../types';

export const getAccountBalance = createAsyncThunk<
  number,
  string,
  { rejectValue: AppError }
>('accounts/getAccountBalance', async (accountNumber, { rejectWithValue }) => {
  try {
    return await getAccountBalanceApi(accountNumber);
  } catch (error: any) {
    return rejectWithValue({
      frontendMessage: Messages.FETCH_ACCOUNT_BALANCE_FAILED,
      backendMessage: error.message || Messages.UNKNOWN,
      status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});
