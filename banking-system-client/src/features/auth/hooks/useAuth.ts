import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { AuthenticateRequest, RegisterRequest } from '../types';
import { useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../../../utils/toast';
import { ROLES } from '../../../utils/constants';
import { authenticate, logout, registerCustomer } from '../thunks';
import { clearSuccess } from '../authSlice';

interface UseAuthOptions {
  skipRegisterSuccessHandling?: boolean;
  showSuccessToast?: boolean;
}

export const useAuth = ({
  skipRegisterSuccessHandling = false,
  showSuccessToast = true,
}: UseAuthOptions = {}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const hasShownSuccessRef = useRef(false);
  const { isLoading, error, loginSuccess, registerSuccess, role } =
    useAppSelector((state) => state.auth);

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
    if (
      (loginSuccess || (registerSuccess && !skipRegisterSuccessHandling)) &&
      !hasShownSuccessRef.current &&
      showSuccessToast
    ) {
      hasShownSuccessRef.current = true;
      showSuccess('Successful login! 👍', {
        toastId: 'login-success',
        autoClose: 2000,
      });
      dispatch(clearSuccess());

      setTimeout(() => {
        const currentRole = role ?? '';
        if (currentRole === ROLES.CUSTOMER) {
          navigate('/customer-panel');
        } else if (
          [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE].includes(currentRole)
        ) {
          navigate('/dashboard');
        } else {
          navigate('/unauthorized');
        }
        hasShownSuccessRef.current = false;
      }, 2000);
    }
  }, [
    loginSuccess,
    registerSuccess,
    dispatch,
    navigate,
    skipRegisterSuccessHandling,
    showSuccessToast,
  ]);

  useEffect(() => {
    if (error) {
      showError(error.frontendMessage, { toastId: 'auth-error' });
    }
  }, [error]);

  return {
    isLoading,
    error,
    loginSuccess,
    registerSuccess,
    role,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
