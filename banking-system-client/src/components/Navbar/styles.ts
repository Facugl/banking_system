import { AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAppBarStyled = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  color: theme.palette.text.primary,
}));
