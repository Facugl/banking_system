import { Typography, Chip, CardContent } from '@mui/material';
import { useProfile } from '../hooks/useProfile';
import ErrorMessage from '../../../components/ErrorMessage';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EmptyState from '../../../components/EmptyState';
import { getInitials } from '../../../utils/getInitialsUtils';
import {
  ProfileCard,
  AvatarContainer,
  InfoRow,
  StyledAvatar,
  PageWrapper,
  SectionTitle,
  PermissionsWrapper,
} from './styles';
import { Messages, permissionLabels } from '../../../utils/constants';

const ProfileView: React.FC = () => {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.frontendMessage} />;
  if (!profile) return <EmptyState message={Messages.NOT_FOUND} />;

  return (
    <PageWrapper>
      <SectionTitle variant='h4'>My Profile</SectionTitle>
      <ProfileCard>
        <CardContent>
          <AvatarContainer>
            <StyledAvatar>{getInitials(profile.name)}</StyledAvatar>
          </AvatarContainer>

          <InfoRow>
            <Typography variant='h6' color='text.secondary'>
              Full Name:
            </Typography>
            <Typography variant='body1'>{profile.name}</Typography>
          </InfoRow>

          <InfoRow>
            <Typography variant='h6' color='text.secondary'>
              Username:
            </Typography>
            <Typography variant='body1'>{profile.username}</Typography>
          </InfoRow>

          <InfoRow>
            <Typography variant='h6' color='text.secondary'>
              Role:
            </Typography>
            <Typography variant='body1'>{profile.role}</Typography>
          </InfoRow>

          {profile.role !== 'CUSTOMER' && (
            <InfoRow>
              <Typography variant='h6' color='text.secondary'>
                Permissions:
              </Typography>
              <PermissionsWrapper>
                {profile.authorities.map((authority) => (
                  <Chip
                    key={authority}
                    label={permissionLabels[authority] || authority}
                    color='primary'
                    variant='outlined'
                  />
                ))}
              </PermissionsWrapper>
            </InfoRow>
          )}
        </CardContent>
      </ProfileCard>
    </PageWrapper>
  );
};

export default ProfileView;
