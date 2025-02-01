import { createAsyncThunk } from '@reduxjs/toolkit';
import { Account, AccountCreateRequest } from '../types';
import { createAccountApi } from '../services/accountsApi';

export const createAccount = createAsyncThunk<Account, AccountCreateRequest>(
  'accounts/createAccount',
  async (account, { rejectWithValue }) => {
    try {
      return await createAccountApi(account);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Failed to create account.',
      );
    }
  },
);
