import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteAccountApi } from '../services/accountsApi';

export const deleteAccount = createAsyncThunk<string, string>(
  'accounts/deleteAccount',
  async (accountNumber, { rejectWithValue }) => {
    try {
      await deleteAccountApi(accountNumber);
      return accountNumber;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error deleting account.');
    }
  },
);
