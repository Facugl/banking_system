import { Box, Card, CardContent, CardActions, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CtaSectionStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(6, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(8, 0),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

export const ModernCardStyled = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.customShadows.card,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.customShadows.buttonHover,
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0, 1),
  },
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(0),
  },
}));

export const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

export const CardActionsStyled = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: 0,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
    paddingTop: 0,
  },
}));

export const GradientButtonStyled = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1.5, 2),
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
    padding: theme.spacing(1, 1.5),
    fontSize: '0.9rem',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(1.5, 3),
    fontSize: '1rem',
  },
}));
