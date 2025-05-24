import { Outlet } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Sidebar, LogoutButton } from '../../components';
import {
  DashboardRoot,
  StyledAppBar,
  StyledToolbar,
  MainContent,
  ContentContainer,
} from './styles';

const DashboardPage: React.FC = () => {
  return (
    <DashboardRoot>
      <StyledAppBar position='fixed'>
        <StyledToolbar>
          <Typography variant='h6' noWrap component='div'>
            Dashboard
          </Typography>
          <LogoutButton />
        </StyledToolbar>
      </StyledAppBar>

      <Sidebar />

      <MainContent component='main'>
        <StyledToolbar />{' '}
        <ContentContainer maxWidth='lg'>
          <Outlet />
        </ContentContainer>
      </MainContent>
    </DashboardRoot>
  );
};

export default DashboardPage;
