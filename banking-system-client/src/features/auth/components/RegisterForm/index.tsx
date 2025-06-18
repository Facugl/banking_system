import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import registerSchema from '../../validation/registerSchema';
import { RegisterRequest } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  RegisterContainer,
  RegisterTitle,
  StyledTextField,
  RegisterButton,
  ErrorMessage,
  LoginPrompt,
} from './styles';
import { useEffect } from 'react';
import { clearSuccess } from '../../authSlice';
import { useAppDispatch } from '../../../../store/hooks';
import { Messages, Routes, ToastIds } from '../../../../utils/constants';
import { showSuccess } from '../../../../utils/toast';

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, registerSuccess, handleRegister } = useAuth({
    showSuccessToast: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterRequest>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterRequest> = (data) => {
    handleRegister(data);
  };

  useEffect(() => {
    if (registerSuccess) {
      showSuccess(Messages.REGISTER_SUCCESS, {
        toastId: ToastIds.REGISTER_SUCCESS,
        onClose: () => {
          dispatch(clearSuccess());
          reset();
          navigate(Routes.LOGIN);
        },
      });
    }
  }, [registerSuccess, dispatch, reset, navigate]);

  return (
    <RegisterContainer>
      <RegisterTitle variant='h4' align='center'>
        Register Customer
      </RegisterTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          label='Full Name'
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
        Already have an account? <Link to={Routes.LOGIN}>Log in here</Link>
      </LoginPrompt>
    </RegisterContainer>
  );
};

export default RegisterForm;
