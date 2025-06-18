import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography';

export const StyledCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.customShadows?.card || '0 4px 8px rgba(0,0,0,0.1)',
  maxWidth: '100%',
  margin: theme.spacing(2, 1),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
    maxWidth: 400,
    margin: theme.spacing(2, 'auto'),
  },
}));

export const StyledAccountType = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
  }),
);

export const StyledAccountInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(1),
  },
}));

export const StyledAccountNumber = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontWeight: 400,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
  }),
);

export const StyledBalanceContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(1),
  },
}));

export const StyledBalanceText = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontWeight: 400,
    color: theme.palette.text.primary,
  }),
);

export const StyledButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  flexDirection: 'column',
  '& > button': {
    flex: '1 0 100%',
    borderRadius: theme.shape.borderRadius,
    '&.MuiButton-outlined': {
      borderColor: theme.palette.divider,
      color: theme.palette.text.primary,
      '&:hover': {
        borderColor: theme.palette.primary.light,
        color: theme.palette.primary.light,
      },
      '&.MuiButton-outlinedError': {
        borderColor: theme.palette.error.main,
        color: theme.palette.error.main,
        '&:hover': {
          borderColor: theme.palette.error.dark,
          color: theme.palette.error.dark,
        },
      },
    },
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    '& > button': {
      flex: '1 0 auto',
    },
  },
}));

export const StyledInactiveMessage = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
    fontWeight: 400,
  }),
);
