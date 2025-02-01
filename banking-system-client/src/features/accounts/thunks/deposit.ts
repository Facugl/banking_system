import { createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionResponse } from '../../transactions/types';
import { AccountOperationRequest } from '../types';
import { depositApi } from '../services/accountsApi';

export const deposit = createAsyncThunk<
  TransactionResponse,
  { accountNumber: string; operationData: AccountOperationRequest }
>(
  'accounts/deposit',
  async ({ accountNumber, operationData }, { rejectWithValue }) => {
    try {
      return await depositApi(accountNumber, operationData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error making deposit.');
    }
  },
);
