import { Box, BoxProps, styled } from '@mui/material';

export const StyledModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  maxWidth: '90%',
  width: '100%',
  boxShadow: theme.customShadows.card,
  outline: 'none',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    maxWidth: 400,
    padding: theme.spacing(3),
  },
  marginTop: '12px',
}));

export const StyledForm = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(2),
  },
  '& .MuiTextField-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,

    '& .MuiInputLabel-root': {
      color: theme.palette.text.secondary,
    },

    '& .MuiInputBase-root': {
      color: theme.palette.text.primary,
      '&.Mui-disabled': {
        backgroundColor: theme.palette.background.default,
      },
    },

    '& .MuiFormHelperText-root': {
      color: theme.palette.error.main,
    },
  },
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  justifyContent: 'flex-end',
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

  '& .MuiButton-text': {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.light,
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    '&:disabled': {
      color: theme.palette.action.disabled,
    },
  },
}));
