import { Box, Card, CardContent, CardActions, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ServicesSectionStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(6, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(8, 0),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

export const ModernCardStyled = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[6],
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0, 1),
  },
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(0),
  },
}));

export const ServiceCardStyled = styled(ModernCardStyled)(({ theme }) => ({
  textAlign: 'center',
  '&:hover .service-icon': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    transform: 'scale(1.1)',
  },
  [theme.breakpoints.down('sm')]: {
    '&:hover .service-icon': {
      transform: 'none',
    },
  },
}));

export const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

export const CardActionsStyled = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(1),
  paddingTop: 0,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
}));

export const StyledAvatarStyled = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.primary.main,
  width: 60,
  height: 60,
  margin: '0 auto 16px',
  transition: 'background-color 0.3s, color 0.3s, transform 0.3s',
  [theme.breakpoints.down('sm')]: {
    width: 50,
    height: 50,
    margin: '0 auto 12px',
  },
  [theme.breakpoints.up('md')]: {
    width: 60,
    height: 60,
    margin: '0 auto 16px',
  },
}));
