import { createAsyncThunk } from '@reduxjs/toolkit';
import { Account, AccountUpdateRequest } from '../types';
import { updateAccountApi } from '../accountsApi';
import { AppError } from '../../../types';
import { Messages, HttpStatus } from '../../../utils/constants';

export const updateAccount = createAsyncThunk<
  Account,
  { accountNumber: string; account: AccountUpdateRequest },
  { rejectValue: AppError }
>(
  'accounts/updateAccount',
  async ({ accountNumber, account }, { rejectWithValue }) => {
    try {
      return await updateAccountApi(accountNumber, account);
    } catch (error: any) {
      return rejectWithValue({
        frontendMessage: Messages.ACCOUNT_UPDATE_FAILED,
        backendMessage: error.message || Messages.UNKNOWN,
        status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  },
);
