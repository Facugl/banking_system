import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppError } from '../../../types';
import { AuthMessages, HttpStatus, Messages, ROLES } from '../../../utils/constants';
import getProfile from '../../customer/thunks/getProfile';
import { getModules } from '../../modules/thunks';
import { getPermissions } from '../../permissions/thunks';
import { getRoles } from '../../roles/thunks';
import { getOperations } from '../../operations/thunks';

const bootstrapSession = createAsyncThunk<
  void,
  void,
  { rejectValue: AppError }
>('auth/bootstrapSession', async (_, { dispatch, rejectWithValue }) => {
  try {
    const profile = await dispatch(getProfile()).unwrap();

    switch (profile.role) {
      case ROLES.ADMINISTRATOR:
        await Promise.all([
          dispatch(getRoles()).unwrap(),
          dispatch(getModules()).unwrap(),
          dispatch(getOperations()).unwrap(),
          dispatch(getPermissions()).unwrap(),
        ]);
        break;

      case ROLES.EMPLOYEE:
        await Promise.all([
          dispatch(getModules()).unwrap(),
          dispatch(getOperations()).unwrap(),
        ]);
        break;

      case ROLES.CUSTOMER:
        break;

      default:
        break;
    }
  } catch (error: any) {
    return rejectWithValue({
      frontendMessage: AuthMessages.SESSION_BOOTSTRAP_FAILED,
      backendMessage: error.message || Messages.UNKNOWN,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export default bootstrapSession;
