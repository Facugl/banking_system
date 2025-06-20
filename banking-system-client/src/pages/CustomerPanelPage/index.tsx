import { Outlet } from 'react-router-dom';
import { Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Sidebar, LogoutButton } from '../../components';
import {
  DashboardRoot,
  StyledAppBar,
  StyledToolbar,
  MainContent,
  ContentContainer,
} from '../DashboardPage/styles';

const CustomerPanelPage: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <DashboardRoot>
      <StyledAppBar position='fixed'>
        <StyledToolbar>
          {isMobile && (
            <IconButton
              onClick={handleDrawerToggle}
              edge='start'
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant='h6' noWrap component='div'>
            Customer Panel
          </Typography>
          <LogoutButton />
        </StyledToolbar>
      </StyledAppBar>

      <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />

      <MainContent component='main'>
        <StyledToolbar />
        <ContentContainer maxWidth='lg'>
          <Outlet />
        </ContentContainer>
      </MainContent>
    </DashboardRoot>
  );
};

export default CustomerPanelPage;
