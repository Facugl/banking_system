import React from 'react';
import { CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../features/auth/thunks';
import { StyledLogoutButton } from './styles';
import { showSuccess } from '../../utils/toast';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const handleLogout = async () => {
    await dispatch(logout());
    showSuccess('Logged out successfully! 👋');
    navigate('/login', { replace: true });
  };

  return (
    <StyledLogoutButton
      onClick={handleLogout}
      variant='contained'
      disabled={isLoading}
    >
      {isLoading ? <CircularProgress size={20} color='inherit' /> : 'Logout'}
    </StyledLogoutButton>
  );
};

export default LogoutButton;
