import { createAsyncThunk } from '@reduxjs/toolkit';
import { Account } from '../types';
import { getAccountApi } from '../services/accountsApi';

export const getAccount = createAsyncThunk<Account, string>(
  'accounts/getAccount',
  async (accountNumber, { rejectWithValue }) => {
    try {
      return await getAccountApi(accountNumber);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch account.',
      );
    }
  },
);
