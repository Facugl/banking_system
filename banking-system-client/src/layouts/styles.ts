import { styled } from '@mui/material/styles';
import { AppBar, Box, Container, Toolbar, BoxProps } from '@mui/material';

interface MainContentProps extends BoxProps {
  component?: React.ElementType;
}

export const DashboardRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
}));

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: 1201,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 1rem',

  [theme.breakpoints.up('sm')]: {
    padding: '0 1.5rem',
  },
}));

export const MainContent = styled(Box)<MainContentProps>(({ theme }) => ({
  flexGrow: 1,
  padding: '2rem',
  overflowY: 'auto',

  [theme.breakpoints.down('md')]: {
    padding: '1.5rem',
  },

  [theme.breakpoints.down('sm')]: {
    padding: '1rem',
  },
}));

export const ContentContainer = styled(Container)(({ theme }) => ({
  paddingTop: '1.5rem',

  [theme.breakpoints.down('sm')]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));
