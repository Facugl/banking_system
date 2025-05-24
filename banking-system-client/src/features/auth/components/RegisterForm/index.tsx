import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { registerCustomer } from '../../thunks';
import registerSchema from '../../validation/registerSchema';
import { RegisterRequest } from '../../types';
import { useNavigate, Link } from 'react-router-dom';
import { showError, showSuccess } from '../../../../utils/toast';
import { clearSuccess } from '../../authSlice';
import {
  RegisterContainer,
  RegisterTitle,
  StyledTextField,
  RegisterButton,
  ErrorMessage,
  LoginPrompt,
} from './styles';

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, registerSuccess } = useAppSelector(
    (state) => state.auth,
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterRequest>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    await dispatch(registerCustomer(data));
  };

  useEffect(() => {
    if (registerSuccess) {
      showSuccess('Successful registration! 👍', {
        onClose: () => {
          dispatch(clearSuccess());
          reset();
          navigate('/login');
        },
      });
    }
  }, [registerSuccess, dispatch, reset, navigate]);

  useEffect(() => {
    if (error) {
      showError(error.frontendMessage);
    }
  }, [error]);

  return (
    <RegisterContainer>
      <RegisterTitle variant='h4' align='center'>
        Register Customer
      </RegisterTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          label='Name'
          fullWidth
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
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
        <StyledTextField
          label='Repeat Password'
          type='password'
          fullWidth
          {...register('repeatedPassword')}
          error={!!errors.repeatedPassword}
          helperText={errors.repeatedPassword?.message}
        />
        {error && <ErrorMessage>{error.frontendMessage}</ErrorMessage>}

        <RegisterButton
          type='submit'
          variant='contained'
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Register'}
        </RegisterButton>
      </form>
      <LoginPrompt>
        Already have an account? <Link to='/login'>Log in here</Link>
      </LoginPrompt>
    </RegisterContainer>
  );
};

export default RegisterForm;
