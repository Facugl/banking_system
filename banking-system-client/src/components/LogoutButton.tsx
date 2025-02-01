import React from 'react';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../features/auth/thunks';

const LogoutButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Button
      onClick={handleLogout}
      color='secondary'
      variant='contained'
      disabled={isLoading}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
