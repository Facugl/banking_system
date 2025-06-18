import { Box, styled } from '@mui/material';

export const StyledModalBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  maxWidth: '90%',
  width: '100%',
  margin: 'auto',
  marginTop: theme.spacing(5),
  boxShadow: theme.customShadows.card,
  outline: 'none',
  [theme.breakpoints.up('sm')]: {
    maxWidth: 400,
    padding: theme.spacing(3),
    marginTop: theme.spacing(10),
  },
}));

export const LoadingContainer = styled(StyledModalBox)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 100,
  [theme.breakpoints.up('sm')]: {
    minHeight: 150,
  },
}));

export const ErrorContainer = styled(StyledModalBox)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const EmptyContainer = styled(StyledModalBox)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  flexDirection: 'column',

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
  },

  '& .MuiButton-outlined': {
    borderColor: theme.palette.divider,
    color: theme.palette.text.primary,
    '&:hover': {
      borderColor: theme.palette.primary.light,
      color: theme.palette.primary.light,
    },
  },
}));
