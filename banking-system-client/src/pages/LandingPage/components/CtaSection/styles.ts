import { Box, Card, CardContent, CardActions, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CtaSectionStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(6, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(8, 0),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

export const ModernCardStyled = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[6],
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
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
  color: theme.palette.common.white,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1.5, 2),
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
  },
  '&:disabled': {
    background: theme.palette.grey[400],
    color: theme.palette.grey[600],
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
