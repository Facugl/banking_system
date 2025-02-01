import { createAsyncThunk } from '@reduxjs/toolkit';
import { Account } from '../types';
import { getAccountsApi } from '../services/accountsApi';

export const getAccounts = createAsyncThunk<Account[]>(
  'accounts/getAccounts',
  async (_, { rejectWithValue }) => {
    try {
      return await getAccountsApi();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch accounts.',
      );
    }
  },
);
