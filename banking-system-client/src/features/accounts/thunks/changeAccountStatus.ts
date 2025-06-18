import { createAsyncThunk } from '@reduxjs/toolkit';
import { Account, AccountStatusRequest } from '../types';
import { changeAccountStatusApi } from '../accountsApi';
import { AppError } from '../../../types';
import { Messages, HttpStatus } from '../../../utils/constants';

export const changeAccountStatus = createAsyncThunk<
  Account,
  { accountNumber: string; status: AccountStatusRequest },
  { rejectValue: AppError }
>(
  'accounts/changeAccountStatus',
  async ({ accountNumber, status }, { rejectWithValue }) => {
    try {
      return await changeAccountStatusApi(accountNumber, status);
    } catch (error: any) {
      return rejectWithValue({
        frontendMessage: Messages.ACCOUNT_STATUS_UPDATE_FAILED,
        backendMessage: error.message || Messages.UNKNOWN,
        status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  },
);
