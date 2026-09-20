import { AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAppBarStyled = styled(AppBar)(({ theme }) => ({
  background: 'rgba(7, 11, 20, 0.75)',
  backdropFilter: 'blur(20px)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
}));
