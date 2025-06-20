import {
  Box,
  Container,
  Typography,
  Grid,
  TypographyProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

export const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8),
}));

export const SectionSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  maxWidth: 800,
  margin: '0 auto',
}));

export const StyledCardTitle = styled(Typography)<TypographyProps>(({}) => ({
  fontWeight: 'bold',
}));

export const ValuesWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

export const BulletPoint = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  '& .dot': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    marginTop: theme.spacing(0.5),
    flexShrink: 0,
  },
}));

export const StatGridContainer = styled(Grid)(({ theme }) => ({
  [`& .MuiGrid-item`]: {
    textAlign: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    [`& .MuiGrid-item`]: {
      width: '100%',
    },
  },
}));
