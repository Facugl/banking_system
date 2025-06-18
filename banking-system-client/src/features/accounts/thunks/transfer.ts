import { createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionResponse } from '../../transactions/types';
import { TransferRequest } from '../types';
import { transferApi } from '../accountsApi';
import { AppError } from '../../../types';
import { Messages, HttpStatus } from '../../../utils/constants';

export const transfer = createAsyncThunk<
  TransactionResponse,
  { sourceAccountNumber: string; transferData: TransferRequest },
  { rejectValue: AppError }
>(
  'accounts/transfer',
  async ({ sourceAccountNumber, transferData }, { rejectWithValue }) => {
    try {
      return await transferApi(sourceAccountNumber, transferData);
    } catch (error: any) {
      return rejectWithValue({
        frontendMessage: Messages.TRANSFER_FAILED,
        backendMessage: error.message || Messages.UNKNOWN,
        status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  },
);
