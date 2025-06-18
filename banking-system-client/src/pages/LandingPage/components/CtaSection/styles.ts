import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CtaSectionStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(10, 0),
}));
