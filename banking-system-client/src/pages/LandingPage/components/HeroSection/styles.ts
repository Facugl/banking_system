import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HeroSectionStyled = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 50%, #1a237e 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fillOpacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    backgroundSize: '60px 60px',
    [theme.breakpoints.down('sm')]: {
      backgroundSize: '40px 40px',
    },
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(10, 0),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
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
