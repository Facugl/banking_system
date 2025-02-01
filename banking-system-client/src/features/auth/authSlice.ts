import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authenticate } from './thunks/authenticate';
import { logout } from './thunks/logout';
import { registerCustomer } from './thunks/registerCustomer';
import { AuthState, RegisterResponse } from './types';

const initialState: AuthState = {
  token: '',
  isLoading: false,
  success: false,
  error: null,
  id: 0,
  username: '',
  name: '',
  role: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = '';
      state.role = '';
      state.isLoading = false;
      state.success = false;
      state.error = null;
      sessionStorage.removeItem('authToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(
        authenticate.fulfilled,
        (state, action: PayloadAction<{ token: string; role: string }>) => {
          const { token, role } = action.payload;

          state.isLoading = false;
          state.success = true;
          state.error = null;
          state.token = token;
          state.role = role;
          sessionStorage.setItem('authToken', token);
        },
      )
      .addCase(authenticate.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
        state.token = '';
        state.role = '';
      })
      .addCase(registerCustomer.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(
        registerCustomer.fulfilled,
        (state, action: PayloadAction<RegisterResponse>) => {
          const { token, id, username, name, role } = action.payload;

          state.isLoading = false;
          state.success = true;
          state.token = token;
          state.id = id;
          state.username = username;
          state.name = name;
          state.role = role;
          sessionStorage.setItem('authToken', token);
        },
      )
      .addCase(
        registerCustomer.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.success = false;
          state.error = action.payload;
        },
      )
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        logout.fulfilled,
        (state, _action: PayloadAction<{ message: string }>) => {
          state.isLoading = false;
          state.success = true;
          state.token = '';
          state.role = '';
          sessionStorage.removeItem('authToken');
        },
      )
      .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearToken } = authSlice.actions;
export default authSlice.reducer;
