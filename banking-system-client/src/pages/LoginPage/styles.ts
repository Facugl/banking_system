import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const LoginPageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  backgroundImage:
    'linear-gradient(135deg, ' +
    theme.palette.background.sidebar +
    ' 0%, ' +
    theme.palette.background.default +
    ' 100%)',
  padding: '2rem',
  [theme.breakpoints.down('sm')]: {
    padding: '1rem',
  },
}));

export const LoginBackground = styled(Box)({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
