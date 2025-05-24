import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import loginSchema from '../../validation/loginSchema';
import { useAppSelector, useAppDispatch } from '../../../../store/hooks';
import { authenticate } from '../../thunks';
import { useNavigate, Link } from 'react-router-dom';
import { AuthenticateRequest } from '../../types';
import { ROLES } from '../../../../utils/constants';
import { useEffect } from 'react';
import { showError, showSuccess } from '../../../../utils/toast';
import { clearSuccess } from '../../authSlice';
import { store } from '../../../../store/store';
import {
  LoginContainer,
  LoginTitle,
  StyledTextField,
  LoginButton,
  ErrorMessage,
  RegisterPrompt,
} from './styles';

const LoginForm: React.FC = () => {
  const { isLoading, error, loginSuccess, role } = useAppSelector(
    (state) => state.auth,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticateRequest>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<AuthenticateRequest> = async (data) => {
    await dispatch(authenticate(data));
  };

  useEffect(() => {
    if (loginSuccess) {
      showSuccess('Successful login! 👍');
      dispatch(clearSuccess());

      setTimeout(() => {
        const currentRole = role ?? store.getState().auth.role ?? '';
        if (currentRole === ROLES.CUSTOMER) {
          navigate('/customer-panel');
        } else if (
          [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE].includes(currentRole)
        ) {
          navigate('/dashboard');
        } else {
          navigate('/unauthorized');
        }
      }, 2000);
    }
  }, [loginSuccess, dispatch, navigate, role]);

  useEffect(() => {
    if (error) {
      showError(error.frontendMessage);
    }
  }, [error]);

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
        Don't have an account? <Link to='/register'>Register here</Link>
      </RegisterPrompt>
    </LoginContainer>
  );
};

export default LoginForm;
