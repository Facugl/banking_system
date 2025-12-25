import { OperationMessages } from './../../utils/constants';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  createPermission,
  getPermission,
  getPermissions,
  deletePermission,
} from './thunks';
import { PermissionResponse, PermisionsState } from './types';
import { AppError } from '../../types';
import { HttpStatus, Messages } from '../../utils/constants';

const initialState: PermisionsState = {
  permissions: [],
  isLoading: false,
  error: null,
};

const permisionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        createPermission.fulfilled,
        (state, action: PayloadAction<PermissionResponse>) => {
          state.permissions.push(action.payload);
        },
      )
      .addCase(
        getPermission.fulfilled,
        (state, { payload }: PayloadAction<PermissionResponse>) => {
          const index = state.permissions.findIndex(
            (role) => role.id === payload.id,
          );
          if (index >= 0) {
            state.permissions[index] = payload;
          } else {
            state.permissions.push(payload);
          }
        },
      )
      .addCase(getPermission.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getPermissions.fulfilled,
        (state, { payload }: PayloadAction<PermissionResponse[]>) => {
          state.isLoading = false;
          state.permissions = payload;
        },
      )
      .addCase(
        getPermissions.rejected,
        (state, { payload }: PayloadAction<AppError | undefined>) => {
          state.isLoading = false;
          state.error = payload ?? {
            frontendMessage: OperationMessages.ERROR,
            backendMessage: Messages.UNKNOWN,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          };
        },
      )
      .addCase(
        deletePermission.fulfilled,
        (state, { payload }: PayloadAction<number>) => {
          state.permissions = state.permissions.filter(
            (permission) => permission.id !== payload,
          );
        },
      );
  },
});

export default permisionsSlice.reducer;
