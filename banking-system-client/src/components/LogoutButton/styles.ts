import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const StyledLogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  padding: '0.5rem 1.5rem',
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',

  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    boxShadow: theme.customShadows.buttonHover,
  },
}));
