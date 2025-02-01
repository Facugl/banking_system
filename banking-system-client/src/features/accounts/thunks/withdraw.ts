import { createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionResponse } from '../../transactions/types';
import { AccountOperationRequest } from '../types';
import { withdrawApi } from '../services/accountsApi';

export const withdraw = createAsyncThunk<
  TransactionResponse,
  { accountNumber: string; operationData: AccountOperationRequest }
>(
  'accounts/withdraw',
  async ({ accountNumber, operationData }, { rejectWithValue }) => {
    try {
      return await withdrawApi(accountNumber, operationData);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error making withdrawal.',
      );
    }
  },
);
