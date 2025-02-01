import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createRole,
  getRole,
  getRoles,
  updateRole,
  deleteRole,
} from './thunks';
import { RolesState, Role } from './types';

const initialState: RolesState = {
  roles: [],
  isLoading: false,
  error: null,
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRole.fulfilled, (state, action: PayloadAction<Role>) => {
        state.roles.push(action.payload);
      })
      .addCase(getRole.fulfilled, (state, action) => {
        const index = state.roles.findIndex(
          (role) => role.id === action.payload.id,
        );
        if (index >= 0) {
          state.roles[index] = action.payload;
        } else {
          state.roles.push(action.payload);
        }
      })
      .addCase(getRoles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRoles.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.roles = payload;
      })
      .addCase(getRoles.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(updateRole.fulfilled, (state, { payload }) => {
        state.roles = state.roles.map((role) =>
          role.id === payload.id ? payload : role,
        );
      })
      .addCase(deleteRole.fulfilled, (state, { payload }) => {
        state.roles = state.roles.filter((role) => role.id !== payload);
      });
  },
});

// export const { resetError } = rolesSlice.actions;
export default rolesSlice.reducer;
