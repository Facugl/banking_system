import { createOperationApi } from './../services/operationsApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OperationCreateRequest, OperationResponse } from '../types';
import { AxiosError } from 'axios';

export const createOperation = createAsyncThunk<
  OperationResponse,
  OperationCreateRequest
>(
  'operation/createOperation',
  async (operation: OperationCreateRequest, { rejectWithValue }) => {
    try {
      const { data } = await createOperationApi(operation);
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.request?.data || 'Failed to create operation.',
      );
    }
  },
);
