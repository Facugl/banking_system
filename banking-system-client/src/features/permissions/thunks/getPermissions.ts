import { createAsyncThunk } from '@reduxjs/toolkit';
import { PermissionResponse } from '../types';
import { getPermissionsApi } from '../permissionsApi';
import { AppError } from '../../../types';
import {
  HttpStatus,
  Messages,
  PermissionMessages,
} from '../../../utils/constants';

export const getPermissions = createAsyncThunk<
  PermissionResponse[],
  void,
  { rejectValue: AppError }
>('permissions/getPermissions', async (_, { rejectWithValue }) => {
  try {
    return await getPermissionsApi();
  } catch (error: any) {
    return rejectWithValue({
      frontendMessage: PermissionMessages.ERROR,
      backendMessage: error.message || Messages.UNKNOWN,
      status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});
