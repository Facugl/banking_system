import { createAsyncThunk } from '@reduxjs/toolkit';
import { customerApi } from '../customerApi';
import { Profile } from '../types';
import { AppError } from '../../../types';
import { Messages, HttpStatus } from '../../../utils/constants';

const getProfile = createAsyncThunk<Profile, void, { rejectValue: AppError }>(
  'customer/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await customerApi.getProfile();

      return response;
    } catch (error: any) {
      return rejectWithValue({
        frontendMessage: Messages.PROFILE_FETCH_ERROR,
        backendMessage: error.response?.data?.message || Messages.UNKNOWN,
        status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  },
);

export default getProfile;
