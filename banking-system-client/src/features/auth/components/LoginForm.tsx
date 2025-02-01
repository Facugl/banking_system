import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import loginSchema from '../validation/loginSchema';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { authenticate } from '../thunks/authenticate';
import { useNavigate } from 'react-router-dom';
import { AuthenticateRequest } from '../types';
import { ROLES } from '../../../utils/constants';

const LoginForm: React.FC = () => {
  const { isLoading, error } = useAppSelector((state) => state.auth);
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
    const response = await dispatch(authenticate(data)).unwrap();

    if (response.role === ROLES.CUSTOMER) {
      navigate('/customer-panel');
    } else if ([ROLES.ADMINISTRATOR, ROLES.CUSTOMER].includes(response.role)) {
      navigate('/dashboard');
    } else {
      navigate('/unauthorized');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Typography variant='h4' textAlign='center' mb={3}>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        {error && <Typography color='error'>{error}</Typography>}
        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
