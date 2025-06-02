import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const CenteredBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export const ErrorBox = styled(Box)({
  textAlign: 'center',
});

export const RetryButton = styled('button')(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  border: 'none',
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: theme.typography.h6.fontWeight,
  marginBottom: theme.spacing(1),
}));
