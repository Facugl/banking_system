import { Box, TextField, styled, Button, BoxProps } from '@mui/material';

export const StyledModalBox = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  maxWidth: '90%',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    maxWidth: 400,
  },
  boxShadow: theme.customShadows.card,
  outline: 'none',
  display: 'flex',
  flexDirection: 'column',
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  flex: 1,
  borderRadius: theme.shape.borderRadius,

  '&.MuiButton-contained': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: theme.customShadows.buttonHover,
    },
  },

  '&.MuiButton-text': {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.light,
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
}));
