import { createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionResponse } from '../../transactions/types';
import { AccountOperationRequest } from '../types';
import { depositApi } from '../accountsApi';
import { Messages, HttpStatus } from '../../../utils/constants';
import { AppError } from '../../../types';

export const deposit = createAsyncThunk<
  TransactionResponse,
  { accountNumber: string; operationData: AccountOperationRequest },
  { rejectValue: AppError }
>(
  'accounts/deposit',
  async ({ accountNumber, operationData }, { rejectWithValue }) => {
    try {
      return await depositApi(accountNumber, operationData);
    } catch (error: any) {
      return rejectWithValue({
        frontendMessage: Messages.DEPOSIT_FAILED,
        backendMessage: error.message || Messages.UNKNOWN,
        status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  },
);
