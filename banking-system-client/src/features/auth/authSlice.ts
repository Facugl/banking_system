import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthError, AuthState, RegisterResponse } from './types';
import { decodeTokenRole } from '../../utils/jwt';
import { authenticate, logout, registerCustomer } from './thunks';
import { toast } from 'react-toastify';

const initialState: AuthState = {
  token: sessionStorage.getItem('authToken') ?? '',
  isLoading: false,
  loginSuccess: false,
  registerSuccess: false,
  logoutSuccess: false,
  justLoggedIn: false,
  error: null,
  id: undefined,
  username: undefined,
  name: undefined,
  role: sessionStorage.getItem('authToken')
    ? decodeTokenRole(sessionStorage.getItem('authToken')) || null
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearSuccess: (state) => {
      state.loginSuccess = false;
      state.logoutSuccess = false;
      state.justLoggedIn = false;
      state.registerSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.loginSuccess = false;
        toast.dismiss();
      })
      .addCase(
        authenticate.fulfilled,
        (state, action: PayloadAction<{ jwt: string; role: string }>) => {
          const { jwt, role } = action.payload;
          state.isLoading = false;
          state.loginSuccess = true;
          state.justLoggedIn = true;
          state.error = null;
          state.token = jwt;
          state.role = role;
          state.id = undefined;
          state.username = undefined;
          state.name = undefined;
          sessionStorage.setItem('authToken', jwt);
        },
      )
      .addCase(
        authenticate.rejected,
        (state, action: PayloadAction<AuthError | undefined>) => {
          state.isLoading = false;
          state.loginSuccess = false;
          state.error = action.payload ?? {
            frontendMessage:
              'An unexpected error occurred during authentication',
            backendMessage: 'Unknown error',
            status: 500,
          };
          state.token = '';
          state.role = null;
          state.id = undefined;
          state.username = undefined;
          state.name = undefined;
          sessionStorage.removeItem('authToken');
        },
      )
      .addCase(registerCustomer.pending, (state) => {
        state.isLoading = true;
        state.loginSuccess = false;
        state.error = null;
        toast.dismiss();
      })
      .addCase(
        registerCustomer.fulfilled,
        (state, action: PayloadAction<RegisterResponse>) => {
          const { jwt, id, username, name, role } = action.payload;
          state.isLoading = false;
          state.error = null;
          state.registerSuccess = true;
          state.justLoggedIn = true;
          state.token = jwt;
          state.id = id;
          state.username = username;
          state.name = name;
          state.role = role;
          sessionStorage.setItem('authToken', jwt);
        },
      )
      .addCase(
        registerCustomer.rejected,
        (state, action: PayloadAction<AuthError | undefined>) => {
          state.isLoading = false;
          state.registerSuccess = false;
          state.error = action.payload ?? {
            frontendMessage: 'An unexpected error occurred during registration',
            backendMessage: 'Unknown error',
            status: 500,
          };
        },
      )
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.logoutSuccess = false;
        toast.dismiss();
      })
      .addCase(
        logout.fulfilled,
        (state, _action: PayloadAction<{ message: string }>) => {
          state.isLoading = false;
          state.logoutSuccess = true;
          state.loginSuccess = false;
          state.justLoggedIn = false;
          state.registerSuccess = false;
          state.error = null;
          state.token = '';
          state.role = null;
          state.id = undefined;
          state.username = undefined;
          state.name = undefined;
          sessionStorage.removeItem('authToken');
          toast.dismiss();
        },
      )
      .addCase(
        logout.rejected,
        (state, action: PayloadAction<AuthError | undefined>) => {
          state.isLoading = false;
          state.logoutSuccess = false;
          state.error = action.payload ?? {
            frontendMessage: 'An unexpected error occurred during logout',
            backendMessage: 'Unknown error',
            status: 500,
          };
        },
      );
  },
});

export const { clearSuccess } = authSlice.actions;
export default authSlice.reducer;
