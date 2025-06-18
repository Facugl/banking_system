import { Box, Card, Avatar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PageWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

export const ProfileCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

export const AvatarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

export const InfoRow = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: theme.palette.primary.main,
  fontSize: '2rem',
}));

export const PermissionsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
  marginTop: theme.spacing(1),
}));
