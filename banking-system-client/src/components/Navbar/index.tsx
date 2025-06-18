import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Toolbar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material';
import { StyledAppBarStyled } from './styles';
import GradientButton from '../GradientButton';

interface NavItem {
  label: string;
  path: string;
}

interface NavBarProps {
  navItems: NavItem[];
}

const Navbar = ({ navItems }: NavBarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{ width: 280, p: 2 }}
      role='presentation'
      onClick={handleDrawerToggle}
    >
      <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
        Horizon Bank
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component='a'
            href={item.path}
            sx={{ borderRadius: 1, mb: 1 }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={1}>
        <Button variant='outlined' onClick={() => navigate('/login')} fullWidth>
          Sign In
        </Button>
        <Button
          variant='contained'
          onClick={() => navigate('/register')}
          fullWidth
        >
          Get Started
        </Button>
      </Stack>
    </Box>
  );

  return (
    <>
      <StyledAppBarStyled position='sticky' elevation={0}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <AccountBalanceIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography
              variant='h6'
              component='div'
              sx={{ fontWeight: 'bold', color: 'text.primary' }}
            >
              Horizon Bank
            </Typography>
          </Box>

          <Box
            sx={{
              alignItems: 'center',
              gap: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                color='inherit'
                component='a'
                href={item.path}
                sx={{
                  color: 'text.primary',
                  fontWeight: 500,
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant='outlined'
              onClick={() => navigate('/login')}
              sx={{ ml: 2 }}
            >
              Sign In
            </Button>
            <GradientButton
              onClick={() => navigate('/register')}
              sx={{ ml: 3 }}
            >
              Get Started
            </GradientButton>
          </Box>
        </Toolbar>
      </StyledAppBarStyled>

      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
