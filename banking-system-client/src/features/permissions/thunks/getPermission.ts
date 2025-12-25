import { createAsyncThunk } from '@reduxjs/toolkit';
import { PermissionResponse } from '../types';
import { getPermissionApi } from '../permissionsApi';
import { AppError } from '../../../types';
import {
  HttpStatus,
  Messages,
  PermissionMessages,
} from '../../../utils/constants';

export const getPermission = createAsyncThunk<
  PermissionResponse,
  number,
  { rejectValue: AppError }
>('permissions/getPermission', async (id, { rejectWithValue }) => {
  try {
    return await getPermissionApi(id);
  } catch (error: any) {
    return rejectWithValue({
      frontendMessage: PermissionMessages.ERROR,
      backendMessage: error.response?.data?.details || Messages.UNKNOWN,
      status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});
