import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppError } from '../../../types';
import {
  HttpStatus,
  Messages,
  PermissionMessages,
} from '../../../utils/constants';
import { deletePermissionApi } from '../permissionsApi';

export const deletePermission = createAsyncThunk<
  number,
  number,
  { rejectValue: AppError }
>('permissions/deletePermission', async (id, { rejectWithValue }) => {
  try {
    await deletePermissionApi(id);
    return id;
  } catch (error: any) {
    return rejectWithValue({
      frontendMessage: PermissionMessages.ERROR,
      backendMessage: error.message || Messages.UNKNOWN,
      status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});
