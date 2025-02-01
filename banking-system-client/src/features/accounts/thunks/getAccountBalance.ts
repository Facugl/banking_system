import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAccountBalanceApi } from '../services/accountsApi';

export const getAccountBalance = createAsyncThunk<number, string>(
  'accounts/getAccountBalance',
  async (accountNumber, { rejectWithValue }) => {
    try {
      return await getAccountBalanceApi(accountNumber);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error fetching account balance.',
      );
    }
  },
);
