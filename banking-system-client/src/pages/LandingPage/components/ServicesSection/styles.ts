import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ModernCardStyled } from '../../../../components/ModernCard/styles';

export const ServicesSectionStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(10, 0),
}));

export const ServiceCardStyled = styled(ModernCardStyled)(({ theme }) => ({
  textAlign: 'center',
  '&:hover .service-icon': {
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    transform: 'scale(1.1)',
  },
}));
