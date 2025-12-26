import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import loginSchema from '../../validation/loginSchema';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LoginContainer,
  LoginTitle,
  StyledTextField,
  LoginButton,
  ErrorMessage,
  RegisterPrompt,
} from './styles';
import { useEffect } from 'react';
import { clearSuccess } from '../../authSlice';
import { useAppDispatch } from '../../../../store/hooks';
import { Messages, ROLES, Routes, ToastIds } from '../../../../utils/constants';
import { showSuccess } from '../../../../utils/toast';
import { AuthenticateRequest } from '../../types';
import { useAuthSession } from '../../../../hooks/useAuthSession';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error, loginSuccess, handleLogin } = useAuth({
    showSuccessToast: false,
  });

  const { role } = useAuthSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthenticateRequest>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<AuthenticateRequest> = (data) => {
    handleLogin(data);
  };

  useEffect(() => {
    if (loginSuccess) {
      showSuccess(Messages.LOGIN_SUCCESS, {
        toastId: ToastIds.LOGIN_SUCCESS,
        onClose: () => {
          dispatch(clearSuccess());
          reset();
          if (role === ROLES.CUSTOMER) {
            navigate(Routes.CUSTOMER_PANEL);
          } else if (role === ROLES.ADMINISTRATOR || role === ROLES.EMPLOYEE) {
            navigate(Routes.DASHBOARD);
          }
        },
      });
    }
  }, [loginSuccess, dispatch, reset, navigate, role]);

  return (
    <LoginContainer>
      <LoginTitle variant='h4' align='center'>
        Login
      </LoginTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          label='Username'
          fullWidth
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <StyledTextField
          label='Password'
          type='password'
          fullWidth
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        {error && <ErrorMessage>{error.frontendMessage}</ErrorMessage>}
        <LoginButton
          type='submit'
          variant='contained'
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Login'}
        </LoginButton>
      </form>
      <RegisterPrompt>
        Don't have an account? <Link to={Routes.REGISTER}>Register here</Link>
      </RegisterPrompt>
    </LoginContainer>
  );
};

export default LoginForm;
