import styled from '@emotion/styled';
import { Card, CardContent, Typography } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

export const StyledCardContent = styled(CardContent)({
  textAlign: 'center',
});

export const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.h6.fontWeight,
}));

export const StyledValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: theme.typography.h4.fontWeight,
}));
