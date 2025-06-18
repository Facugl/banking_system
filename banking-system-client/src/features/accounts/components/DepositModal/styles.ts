import { Box, styled, TextField, Button } from '@mui/material';

export const StyledModalBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  maxWidth: '90%',
  width: '100%',
  margin: 'auto',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('sm')]: {
    maxWidth: 400,
    marginTop: theme.spacing(10),
  },
  boxShadow: theme.customShadows.card,
  outline: 'none',
}));

export const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const StyledTextField = styled(TextField)(() => ({}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
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

  '&.MuiButton-outlined': {
    borderColor: theme.palette.divider,
    color: theme.palette.text.primary,
    '&:hover': {
      borderColor: theme.palette.primary.light,
      color: theme.palette.primary.light,
    },
  },
}));
