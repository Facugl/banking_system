import { createAsyncThunk } from '@reduxjs/toolkit';
import { createPermissionApi } from '../permissionsApi';
import { PermissionRequest, PermissionResponse } from '../types';
import { AppError } from '../../../types';
import {
  HttpStatus,
  Messages,
  PermissionMessages,
} from '../../../utils/constants';

export const createPermission = createAsyncThunk<
  PermissionResponse,
  PermissionRequest,
  { rejectValue: AppError }
>('permission/createPermision', async (permission, { rejectWithValue }) => {
  try {
    return await createPermissionApi(permission);
  } catch (error: any) {
    return rejectWithValue({
      frontendMessage: PermissionMessages.ERROR,
      backendMessage: error.message || Messages.UNKNOWN,
      status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});
