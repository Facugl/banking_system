import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const ChartContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '400px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
  padding: theme.spacing(2),
}));
