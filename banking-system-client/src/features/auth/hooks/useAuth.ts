import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  AuthenticateRequest,
  RegisterRequest,
  UseAuthOptions,
  UseAuthReturn,
} from '../types';
import { showError, showSuccess } from '../../../utils/toast';
import { Messages, Role, ToastIds } from '../../../utils/constants';
import { authenticate, logout, registerCustomer } from '../thunks';
import { clearSuccess } from '../authSlice';

export const useAuth = (options: UseAuthOptions = {}): UseAuthReturn => {
  const { showSuccessToast = true } = options;

  const dispatch = useAppDispatch();

  const { isLoading, error, loginSuccess, registerSuccess } = useAppSelector(
    (state) => state.auth,
  );
  const { profile } = useAppSelector((state) => state.customer);
  const role = profile?.role as Role;

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
    if (loginSuccess && showSuccessToast) {
      showSuccess(Messages.LOGIN_SUCCESS, {
        toastId: ToastIds.LOGIN_SUCCESS,
      });
      dispatch(clearSuccess());
    }
  }, [loginSuccess, showSuccessToast, dispatch]);

  useEffect(() => {
    if (registerSuccess && showSuccessToast) {
      showSuccess(Messages.REGISTER_SUCCESS, {
        toastId: ToastIds.REGISTER_SUCCESS,
      });
      dispatch(clearSuccess());
    }
  }, [registerSuccess, showSuccessToast, dispatch]);

  useEffect(() => {
    if (error) {
      showError(error.frontendMessage, { toastId: ToastIds.AUTH_ERROR });
    }
  }, [error]);

  return {
    isLoading,
    error,
    role,
    loginSuccess,
    registerSuccess,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
