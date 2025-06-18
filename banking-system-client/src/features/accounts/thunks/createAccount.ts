import { createAsyncThunk } from '@reduxjs/toolkit';
import { Account, AccountCreateRequest } from '../types';
import { createAccountApi } from '../accountsApi';
import { Messages, HttpStatus } from '../../../utils/constants';
import { AppError } from '../../../types';

export const createAccount = createAsyncThunk<
  Account,
  AccountCreateRequest,
  { rejectValue: AppError }
>('accounts/createAccount', async (account, { rejectWithValue }) => {
  try {
    return await createAccountApi(account);
  } catch (error: any) {
    return rejectWithValue({
      frontendMessage: Messages.ACCOUNT_CREATE_FAILED,
      backendMessage: error.message || Messages.UNKNOWN,
      status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});
