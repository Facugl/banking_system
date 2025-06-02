import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  padding: '1rem',
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    padding: '0.5rem',
  },
}));
