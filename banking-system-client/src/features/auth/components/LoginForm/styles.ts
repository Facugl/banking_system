import styled from '@emotion/styled';
import { Box, Button, TextField, Typography } from '@mui/material';

export const LoginContainer = styled(Box)(({ theme }) => ({
  maxWidth: 450,
  margin: '2rem auto',
  padding: '2.5rem',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.customShadows?.card ?? '0 4px 8px rgba(0,0,0,0.1)',
  backgroundColor: theme.palette.background.paper,
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

export const LoginTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.h4.fontWeight,
  marginBottom: '2rem',
  color: theme.palette.primary.main,
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

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '1.2rem',
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.primary.main,
  },
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  marginTop: '1.5rem',
  padding: '0.8rem',
  fontWeight: theme.typography.button.fontWeight,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    boxShadow: theme.customShadows?.buttonHover ?? '0 4px 8px rgba(0,0,0,0.2)',
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.text.disabled,
  },
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  margin: '0.5rem 0',
  fontSize: '0.875rem',
}));

export const RegisterPrompt = styled(Typography)(({ theme }) => ({
  marginTop: '1rem',
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  textAlign: 'center',
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontWeight: theme.typography.button.fontWeight,
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.light,
    },
  },
}));
