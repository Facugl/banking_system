import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppError } from '../../../types';
import {
  AuthMessages,
  HttpStatus,
  Messages,
  ROLES,
} from '../../../utils/constants';
import getProfile from '../../customer/thunks/getProfile';
import { getModules } from '../../modules/thunks';
import { getPermissions } from '../../permissions/thunks';
import { getRoles } from '../../roles/thunks';
import { getOperations } from '../../operations/thunks';
import { setSessionLoading, setSessionReady } from '../authSlice';
import { getTransactions } from '../../transactions/thunks';

const bootstrapSession = createAsyncThunk<
  void,
  void,
  { rejectValue: AppError }
>('auth/bootstrapSession', async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setSessionLoading(true));

    const profile = await dispatch(getProfile()).unwrap();

    if (profile.role === ROLES.ADMINISTRATOR) {
      await Promise.all([
        dispatch(getModules()).unwrap(),
        dispatch(getOperations()).unwrap(),
        dispatch(getRoles()).unwrap(),
        dispatch(getPermissions()).unwrap(),
        dispatch(getTransactions()).unwrap(),
      ]);
    }

    if (profile.role === ROLES.EMPLOYEE) {
      await dispatch(getTransactions()).unwrap();
    }

    if (profile.role === ROLES.CUSTOMER) {
      await dispatch(getTransactions()).unwrap();
    }
  } catch (error: any) {
    return rejectWithValue({
      frontendMessage: AuthMessages.SESSION_BOOTSTRAP_FAILED,
      backendMessage: error.message || Messages.UNKNOWN,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  } finally {
    dispatch(setSessionLoading(false));
    dispatch(setSessionReady(true));
  }
});

export default bootstrapSession;
