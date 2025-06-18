import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography';

export const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    marginBottom: theme.spacing(3),
    gap: 0,
  },
}));

export const StyledWelcomeTitle = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.primary.main, // #1A365D
    marginBottom: theme.spacing(1),
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left: 0,
      width: '50px',
      height: '3px',
      backgroundColor: theme.palette.secondary.main,
      borderRadius: '2px',
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(1.5),
    },
  }),
);

export const StyledAccountsTitle = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontWeight: 500,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(2),
    },
  }),
);

export const StyledAccountsGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(1.5),
  },
}));

export const StyledLoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.paper,
}));
