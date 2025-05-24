import { useForm } from 'react-hook-form';
import { Typography, Box, TextField, Button } from '@mui/material';
import { useAppSelector } from '../../../../store/hooks';

interface ProfileForm {
  email: string;
  phone: string;
}

const ProfileView: React.FC = () => {
  //   const user = useAppSelector((state) => state.auth.user);
  const user = {
    email: 'email@gmail.com',
    phone: '12121212',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const onSubmit = (data: ProfileForm) => {
    console.log('Update Profile:', data);
    // Dispatch update profile action to Redux
  };

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Profile
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='Email'
          fullWidth
          {...register('email', {
            required: 'Email is required',
            pattern: /^\S+@\S+$/i,
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin='normal'
        />
        <TextField
          label='Phone'
          fullWidth
          {...register('phone', { required: 'Phone is required' })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          margin='normal'
        />
        <Button type='submit' variant='contained' sx={{ mt: 2 }}>
          Update Profile
        </Button>
      </form>
    </Box>
  );
};

export default ProfileView;
