import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FooterSectionStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
  padding: theme.spacing(8, 0),
}));
