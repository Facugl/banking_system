import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, AuthState } from './types';
import { authenticate, logout, registerCustomer } from './thunks';
import { toast } from 'react-toastify';
import { Messages, HttpStatus } from '../../utils/constants';
import { AppError } from '../../types';

const initialState: AuthState = {
  token: sessionStorage.getItem('authToken') ?? '',
  isLoading: false,
  sessionLoading: true,
  sessionReady: false,
  loginSuccess: false,
  registerSuccess: false,
  logoutSuccess: false,
  justLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearSuccess: (state) => {
      state.loginSuccess = false;
      state.sessionReady = false;
      state.logoutSuccess = false;
      state.justLoggedIn = false;
      state.registerSuccess = false;
    },
    setSessionReady: (state, action: PayloadAction<boolean>) => {
      state.sessionReady = action.payload;
    },
    setSessionLoading: (state, action: PayloadAction<boolean>) => {
      state.sessionLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.sessionReady = false;
        toast.dismiss();
      })
      .addCase(
        authenticate.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          const { jwt } = action.payload;
          state.isLoading = false;
          state.loginSuccess = true;
          state.justLoggedIn = true;
          state.sessionReady = true;
          state.sessionLoading = false;
          state.error = null;
          state.token = jwt;
        },
      )
      .addCase(authenticate.rejected, (state, action) => {
        state.isLoading = false;
        state.sessionReady = false;
        state.sessionLoading = false;
        state.token = '';
        state.error = action.payload ?? {
          frontendMessage: Messages.AUTHENTICATION_FAILED,
          backendMessage: Messages.UNKNOWN,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        };
      })
      .addCase(registerCustomer.pending, (state) => {
        state.isLoading = true;
        state.loginSuccess = false;
        state.error = null;
        toast.dismiss();
      })
      .addCase(
        registerCustomer.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          const { jwt } = action.payload;
          state.isLoading = false;
          state.error = null;
          state.registerSuccess = true;
          state.justLoggedIn = true;
          state.token = jwt;
        },
      )
      .addCase(
        registerCustomer.rejected,
        (state, action: PayloadAction<AppError | undefined>) => {
          state.isLoading = false;
          state.registerSuccess = false;
          state.error = action.payload ?? {
            frontendMessage: Messages.REGISTRATION_FAILED,
            backendMessage: Messages.UNKNOWN,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
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
          sessionStorage.removeItem('authToken');
          toast.dismiss();
        },
      )
      .addCase(
        logout.rejected,
        (state, action: PayloadAction<AppError | undefined>) => {
          state.isLoading = false;
          state.logoutSuccess = false;
          state.error = action.payload ?? {
            frontendMessage: Messages.LOGOUT_FAILED,
            backendMessage: Messages.UNKNOWN,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          };
        },
      );
  },
});

export const { clearSuccess, setSessionReady, setSessionLoading } = authSlice.actions;
export default authSlice.reducer;
