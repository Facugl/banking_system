import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { authenticate, logout, registerCustomer } from '../thunks';
import { clearSuccess } from '../authSlice';
import { showError, showSuccess } from '../../../utils/toast';
import { Messages, ToastIds } from '../../../utils/constants';
import {
  AuthenticateRequest,
  RegisterRequest,
  UseAuthOptions,
  UseAuthReturn,
} from '../types';

export const useAuth = (options: UseAuthOptions = {}): UseAuthReturn => {
  const { showSuccessToast = true } = options;

  const dispatch = useAppDispatch();
  const { isLoading, error, loginSuccess, registerSuccess } = useAppSelector(
    (state) => state.auth,
  );

  const handleLogin = (credentials: AuthenticateRequest) => {
    dispatch(authenticate(credentials));
  };

  const handleRegister = (customer: RegisterRequest) => {
    dispatch(registerCustomer(customer));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if ((loginSuccess || registerSuccess) && showSuccessToast) {
      showSuccess(Messages.LOGIN_SUCCESS, {
        toastId: ToastIds.LOGIN_SUCCESS,
      });
      dispatch(clearSuccess());
    }
  }, [loginSuccess, registerSuccess, showSuccessToast, dispatch]);

  useEffect(() => {
    if (error) {
      showError(error.frontendMessage, {
        toastId: ToastIds.AUTH_ERROR,
      });
    }
  }, [error]);

  return {
    isLoading,
    error,
    loginSuccess,
    registerSuccess,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
