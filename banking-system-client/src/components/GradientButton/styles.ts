import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const GradientButtonStyled = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 3),
  fontWeight: 600,
  boxShadow: theme.customShadows.card,
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    boxShadow: theme.customShadows.buttonHover,
  },
}));
