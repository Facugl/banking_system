import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAvatarStyled = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: '#f3f4f6',
  color: theme.palette.primary.main,
  margin: '0 auto 16px',
  transition: 'all 0.3s ease',
}));
