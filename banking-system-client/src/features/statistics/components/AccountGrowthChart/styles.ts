import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const ChartContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '400px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.customShadows.card,
  padding: theme.spacing(2),
}));
