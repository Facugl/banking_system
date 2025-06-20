import {
  Avatar,
  Box,
  BoxProps,
  Container,
  Typography,
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
}));

export const StyledCardTitle = styled(Typography)<TypographyProps>(({}) => ({
  fontWeight: 'bold',
}));

export const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const ContactAvatar = styled(Avatar)(({}) => ({
  backgroundColor: '#f3f4f6',
}));

export const StyledForm = styled(Box)<BoxProps>(({ theme }) => ({
  marginTop: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius * 2,
  },
  '& button': {
    borderRadius: theme.shape.borderRadius * 2,
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
}));
