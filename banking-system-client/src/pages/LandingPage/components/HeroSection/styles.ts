import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HeroSectionStyled = styled(Box)(({ theme }) => ({
  background: `
    radial-gradient(circle at 20% 20%, rgba(108, 142, 232, 0.25), transparent 45%),
    radial-gradient(circle at 85% 15%, rgba(108, 142, 232, 0.15), transparent 40%),
    ${theme.palette.background.default}
  `,
  color: theme.palette.text.primary,
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(10, 0),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

export const GradientButtonStyled = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1.5, 3),
  fontWeight: 700,
  boxShadow: theme.customShadows.card,
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    boxShadow: theme.customShadows.buttonHover,
  },
  '&:disabled': {
    background: 'rgba(255, 255, 255, 0.12)',
    color: theme.palette.text.secondary,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 2.5),
    fontSize: '0.9rem',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(1.5, 4),
    fontSize: '1rem',
  },
}));
