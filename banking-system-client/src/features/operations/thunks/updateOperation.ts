import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateOperationApi } from '../operationsApi';
import { OperationResponse, OperationUpdateRequest } from '../types';
import { AxiosError } from 'axios';

export const updateOperation = createAsyncThunk<
  OperationResponse,
  { id: number; data: OperationUpdateRequest }
>('operations/updateOperation', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await updateOperationApi(id, data);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    return rejectWithValue(
      axiosError.response?.data || 'Error updating the operation.',
    );
  }
});
