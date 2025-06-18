import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerState, Profile } from './types';
import { logout } from '../auth/thunks';
import getProfile from './thunks/getProfile';
import { AppError } from '../../types';
import { Messages, HttpStatus } from '../../utils/constants';

const initialState: CustomerState = {
  profile: null,
  isLoading: false,
  error: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.isLoading = false;
          state.profile = action.payload;
        },
      )
      .addCase(
        getProfile.rejected,
        (state, action: PayloadAction<AppError | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? {
            frontendMessage: Messages.PROFILE_FETCH_ERROR,
            backendMessage: Messages.UNKNOWN,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          };
        },
      )
      .addCase(logout.fulfilled, (state) => {
        state.profile = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.profile = null;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { clearProfile } = customerSlice.actions;
export default customerSlice.reducer;
