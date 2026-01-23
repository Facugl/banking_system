import { createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionResponse } from '../../transactions/types';
import { TransferRequest } from '../types';
import { transferApi } from '../accountsApi';
import { AppError } from '../../../types';
import { Messages, HttpStatus } from '../../../utils/constants';
import { getTransactions } from '../../transactions/thunks';

export const transfer = createAsyncThunk<
  TransactionResponse,
  { sourceAccountNumber: string; transferData: TransferRequest },
  { rejectValue: AppError }
>(
  'accounts/transfer',
  async (
    { sourceAccountNumber, transferData },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await transferApi(sourceAccountNumber, transferData);

      dispatch(getTransactions());

      return response;
    } catch (error: any) {
      return rejectWithValue({
        frontendMessage: Messages.TRANSFER_FAILED,
        backendMessage: error.message || Messages.UNKNOWN,
        status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  },
);
