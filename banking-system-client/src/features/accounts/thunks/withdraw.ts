import { createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionResponse } from '../../transactions/types';
import { AccountOperationRequest } from '../types';
import { withdrawApi } from '../accountsApi';
import { AppError } from '../../../types';
import { Messages, HttpStatus } from '../../../utils/constants';
import { getTransactions } from '../../transactions/thunks';

export const withdraw = createAsyncThunk<
  TransactionResponse,
  { accountNumber: string; operationData: AccountOperationRequest },
  { rejectValue: AppError }
>(
  'accounts/withdraw',
  async ({ accountNumber, operationData }, { dispatch, rejectWithValue }) => {
    try {
      const response = await withdrawApi(accountNumber, operationData);

      dispatch(getTransactions());

      return response;
    } catch (error: any) {
      return rejectWithValue({
        frontendMessage: Messages.WITHDRAW_FAILED,
        backendMessage: error.message || Messages.UNKNOWN,
        status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  },
);
