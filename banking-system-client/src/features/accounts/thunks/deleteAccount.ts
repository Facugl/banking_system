import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteAccountApi } from '../accountsApi';
import { AppError } from '../../../types';
import { Messages, HttpStatus } from '../../../utils/constants';

export const deleteAccount = createAsyncThunk<
  string,
  string,
  { rejectValue: AppError }
>('accounts/deleteAccount', async (accountNumber, { rejectWithValue }) => {
  try {
    await deleteAccountApi(accountNumber);
    return accountNumber;
  } catch (error: any) {
    return rejectWithValue({
      frontendMessage: Messages.ACCOUNT_DELETE_FAILED,
      backendMessage: error.message || Messages.UNKNOWN,
      status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});
