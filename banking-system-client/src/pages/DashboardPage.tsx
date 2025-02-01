import { Outlet, useLocation } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Container } from '@mui/material';
import { Sidebar, LogoutButton } from '../components';
import StatisticsView from '../features/statistics/views/StatisticsView';

const DashboardPage: React.FC = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Barra superior */}
      <AppBar
        position='fixed'
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h6' noWrap component='div'>
            Dashboard
          </Typography>
          <LogoutButton />
        </Toolbar>
      </AppBar>

      {/* Barra lateral */}
      <Sidebar />

      {/* Contenido principal */}
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth='lg'>
          {/* Renderiza la vista principal o una subruta */}
          {location.pathname === '/dashboard' ? <StatisticsView /> : <Outlet />}
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;
