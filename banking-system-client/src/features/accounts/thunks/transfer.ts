import { createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionResponse } from '../../transactions/types';
import { TransferRequest } from '../types';
import { transferApi } from '../services/accountsApi';

export const transfer = createAsyncThunk<
  TransactionResponse,
  { sourceAccountNumber: string; transferData: TransferRequest }
>(
  'accounts/transfer',
  async ({ sourceAccountNumber, transferData }, { rejectWithValue }) => {
    try {
      return await transferApi(sourceAccountNumber, transferData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error making transfer.');
    }
  },
);
