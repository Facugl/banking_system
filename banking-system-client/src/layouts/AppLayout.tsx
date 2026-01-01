import { Outlet } from 'react-router-dom';
import { Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  DashboardRoot,
  StyledAppBar,
  StyledToolbar,
  MainContent,
  ContentContainer,
} from './styles';
import { useAppSelector } from '../store/hooks';
import { ROLES } from '../utils/constants';
import { LogoutButton, Sidebar } from '../components';

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const role = useAppSelector((state) => state.customer.profile?.role);

  const title = role === ROLES.CUSTOMER ? 'Customer Panel' : 'Dashboard';

  return (
    <DashboardRoot>
      <StyledAppBar position='fixed'>
        <StyledToolbar>
          {isMobile && (
            <IconButton onClick={() => setMobileOpen(!mobileOpen)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant='h6'>{title}</Typography>
          <LogoutButton />
        </StyledToolbar>
      </StyledAppBar>

      <Sidebar
        mobileOpen={mobileOpen}
        onDrawerToggle={() => setMobileOpen(!mobileOpen)}
      />

      <MainContent component='main'>
        <StyledToolbar />
        <ContentContainer maxWidth='lg'>
          <Outlet />
        </ContentContainer>
      </MainContent>
    </DashboardRoot>
  );
};

export default AppLayout;
