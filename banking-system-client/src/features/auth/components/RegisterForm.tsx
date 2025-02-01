import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { registerCustomer } from '../thunks/registerCustomer';
import registerSchema from '../validation/registerSchema';
import { RegisterRequest } from '../types';

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterRequest>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterRequest> = (data) => {
    dispatch(registerCustomer(data));
    reset();
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Typography variant='h4' textAlign='center' mb={3}>
        Register Customer
      </Typography>

      {error && <Typography color='error'>{error}</Typography>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='Name'
          fullWidth
          margin='normal'
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label='Username'
          fullWidth
          margin='normal'
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          label='Password'
          type='password'
          fullWidth
          margin='normal'
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label='Repeat Password'
          type='password'
          fullWidth
          margin='normal'
          {...register('repeatedPassword')}
          error={!!errors.repeatedPassword}
          helperText={errors.repeatedPassword?.message}
        />
        {isLoading && <Typography>Loading...</Typography>}

        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
