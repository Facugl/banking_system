import { createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction } from '../types';
import { getTransactionApi } from '../transactionApi';
import { Messages, HttpStatus } from '../../../utils/constants';
import { AppError } from '../../../types';

export const getTransaction = createAsyncThunk<
  Transaction,
  string,
  { rejectValue: AppError }
>('customer/getTransaction', async (transactionNumber, { rejectWithValue }) => {
  try {
    return await getTransactionApi(transactionNumber);
  } catch (error: any) {
    return rejectWithValue({
      frontendMessage: Messages.TRANSACTION_FETCH_ERROR,
      backendMessage: error.message || Messages.UNKNOWN,
      status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});
