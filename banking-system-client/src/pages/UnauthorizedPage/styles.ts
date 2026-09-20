import { styled } from '@mui/material/styles';
import { Box, Typography, Button, ButtonProps } from '@mui/material';
import { LinkProps } from 'react-router-dom';

interface LinkNavigationProps {
  to: LinkProps['to'];
  replace?: LinkProps['replace'];
  state?: LinkProps['state'];
}

interface BackButtonProps extends ButtonProps, LinkNavigationProps {}

export const UnauthorizedContainer = styled(Box)(({ theme }) => ({
  maxWidth: 450,
  height: 400,
  margin: '2rem auto',
  padding: '2.5rem',
  borderRadius: 12,
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease',

  '&:hover': {
    transform: 'translateY(-5px)',
  },

  [theme.breakpoints.down('sm')]: {
    padding: '1.5rem',
    margin: '1rem',
    width: 'auto',
  },
}));

export const ErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: '6rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: '1rem',
  position: 'relative',

  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 50,
    height: 3,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 2,
  },
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  color: theme.palette.text.secondary,
  marginBottom: '2rem',
}));

export const BackButton = styled(Button)<BackButtonProps>(({ theme }) => ({
  padding: '0.8rem 2rem',
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: 'all 0.3s ease',

  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    boxShadow: theme.customShadows.buttonHover,
  },
}));
