import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FooterSectionStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(8, 0),
}));
