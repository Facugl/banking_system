import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ModernCardStyled = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundImage: 'none',
  boxShadow: theme.customShadows.card,
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: theme.palette.primary.main,
    boxShadow: theme.customShadows.buttonHover,
  },
}));
