import { createAsyncThunk } from '@reduxjs/toolkit';
import { Account, AccountStatusRequest } from '../types';
import { changeAccountStatusApi } from '../services/accountsApi';

export const changeAccountStatus = createAsyncThunk<
  Account,
  { accountNumber: string; statusData: AccountStatusRequest }
>(
  'accounts/changeAccountStatus',
  async ({ accountNumber, statusData }, { rejectWithValue }) => {
    try {
      return await changeAccountStatusApi(accountNumber, statusData);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error changing account status.',
      );
    }
  },
);
