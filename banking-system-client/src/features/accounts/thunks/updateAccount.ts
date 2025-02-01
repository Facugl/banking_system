import { createAsyncThunk } from '@reduxjs/toolkit';
import { Account, AccountUpdateRequest } from '../types';
import { updateAccountApi } from '../services/accountsApi';

export const updateAccount = createAsyncThunk<
  Account,
  { accountNumber: string; accountData: AccountUpdateRequest }
>(
  'accounts/updateAccount',
  async ({ accountNumber, accountData }, { rejectWithValue }) => {
    try {
      return await updateAccountApi(accountNumber, accountData);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error updating the account.',
      );
    }
  },
);
