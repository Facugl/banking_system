import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SecuritySectionStyled = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a237e 0%, #000051 100%)',
  color: 'white',
  padding: theme.spacing(10, 0),
  textAlign: 'center',
}));
