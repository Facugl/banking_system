import { Box, styled } from '@mui/material';

export const StyledModalBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
    maxWidth: 400,
  },
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  width: '90%',
  margin: 'auto',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
  },
  boxShadow: theme.customShadows.card,
  outline: 'none',
}));

export const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },

  '& > button': {
    flex: 1,
    borderRadius: theme.shape.borderRadius,
  },

  '& .MuiButton-contained': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: theme.customShadows.buttonHover,
    },
    '&:disabled': {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
    },
  },

  '& .MuiButton-outlined': {
    borderColor: theme.palette.divider,
    color: theme.palette.text.primary,
    '&:hover': {
      borderColor: theme.palette.primary.light,
      color: theme.palette.primary.light,
    },
    '&:disabled': {
      borderColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
    },
  },
}));
