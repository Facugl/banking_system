import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  authenticate,
  logout,
  registerCustomer,
} from '../features/auth/thunks';
import { clearSuccess } from '../features/auth/authSlice';
import getProfile from '../features/customer/thunks/getProfile';
import { showError, showSuccess } from '../utils/toast';
import { ToastIds, Routes, Messages, Role } from '../utils/constants';
import { AuthenticateRequest, RegisterRequest } from '../features/auth/types';
import { useLocation } from 'react-router-dom';
import { UseAuthSessionOptions, UseAuthSessionReturn } from '../types';

export const useAuthSession = ({
  showSuccessToast = true,
}: UseAuthSessionOptions = {}): UseAuthSessionReturn => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { token, isLoading, error, loginSuccess, registerSuccess } =
    useAppSelector((state) => state.auth);
  const { profile, isLoading: profileLoading } = useAppSelector(
    (state) => state.customer,
  );
  const role = profile?.role as Role;

  const publicRoutes: string[] = [Routes.LOGIN, Routes.REGISTER];

  useEffect(() => {
    let retries = 3;
    const maxTimeout = 5000;
    const fetchProfile = async () => {
      const timeout = setTimeout(() => {
        retries = 0;
      }, maxTimeout);

      if (
        token &&
        !profile &&
        !profileLoading &&
        retries > 0 &&
        !publicRoutes.includes(location.pathname)
      ) {
        try {
          await dispatch(getProfile()).unwrap();
          clearTimeout(timeout);
        } catch {
          retries--;
          if (retries === 0) {
            showError(Messages.PROFILE_FETCH_ERROR, {
              toastId: ToastIds.PROFILE_ERROR,
            });
            dispatch(logout());
            clearTimeout(timeout);
          } else {
            setTimeout(fetchProfile, 1000);
          }
        }
      }
    };
    fetchProfile();
  }, [token, profile, profileLoading, dispatch, location.pathname]);

  useEffect(() => {
    if ((loginSuccess || registerSuccess) && showSuccessToast) {
      showSuccess(Messages.LOGIN_SUCCESS, {
        toastId: ToastIds.LOGIN_SUCCESS,
        onClose: () => dispatch(clearSuccess()),
      });
    }
  }, [loginSuccess, registerSuccess, showSuccessToast, dispatch]);

  useEffect(() => {
    if (error) {
      showError(error.frontendMessage, { toastId: ToastIds.AUTH_ERROR });
    }
  }, [error]);

  const handleLogin = (credentials: AuthenticateRequest) => {
    dispatch(authenticate(credentials));
  };

  const handleRegister = (customer: RegisterRequest) => {
    dispatch(registerCustomer(customer));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isLoading,
    isSessionLoading: profileLoading,
    error,
    role,
    profile,
    token,
    loginSuccess,
    registerSuccess,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
