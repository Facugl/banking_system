import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import loginSchema from '../../validation/loginSchema';
import { Link } from 'react-router-dom';
import { AuthenticateRequest } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import {
  LoginContainer,
  LoginTitle,
  StyledTextField,
  LoginButton,
  ErrorMessage,
  RegisterPrompt,
} from './styles';

const LoginForm: React.FC = () => {
  const { isLoading, error, handleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticateRequest>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<AuthenticateRequest> = (data) => {
    handleLogin(data);
  };

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
