import { Box, BoxProps, styled } from '@mui/material';

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

export const ButtonWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  justifyContent: 'center',
  marginTop: theme.spacing(1),

  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(2),
  },

  '& .MuiButton-contained': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.shape.borderRadius,

    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: theme.customShadows.buttonHover,
    },

    '&.Mui-disabled': {
      backgroundColor: theme.palette.text.disabled,
      color: theme.palette.background.paper,
    },
  },
}));
