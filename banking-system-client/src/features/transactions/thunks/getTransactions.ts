import { createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction } from '../types';
import { getTransactionsApi } from '../transactionApi';
import { AppError } from '../../../types';
import { Messages, HttpStatus } from '../../../utils/constants';

export const getTransactions = createAsyncThunk<
  Transaction[],
  void,
  { rejectValue: AppError }
>('transactions/getTransactions', async (_, { rejectWithValue }) => {
  try {
    return await getTransactionsApi();
  } catch (error: any) {
    return rejectWithValue({
      frontendMessage: Messages.TRANSACTIONS_FETCH_ERROR,
      backendMessage: error.message || Messages.UNKNOWN,
      status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});
