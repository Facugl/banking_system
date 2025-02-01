import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { ROLES } from '../utils/constants';

const Sidebar = () => {
  const location = useLocation();
  const role = useAppSelector((state) => state.auth.role);

  const menuItems = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      path: '/dashboard',
      roles: [ROLES.ADMINISTRATOR],
    },
    // {
    //   text: 'Statistics',
    //   icon: <ReceiptIcon />,
    //   path: '/dashboard/statistics',
    //   roles: [ROLES.ADMINISTRATOR],
    // },
    {
      text: 'Moduless',
      icon: <GroupIcon />,
      path: '/dashboard/modules',
      roles: [ROLES.ADMINISTRATOR],
    },
    {
      text: 'Roles',
      icon: <GroupIcon />,
      path: '/dashboard/roles',
      roles: [ROLES.ADMINISTRATOR],
    },
    {
      text: 'Accounts',
      icon: <DashboardIcon />,
      path: '/dashboard/accounts',
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE, ROLES.CUSTOMER],
    },
  ];

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      variant='permanent'
      anchor='left'
    >
      <Toolbar>
        <Typography variant='h6' noWrap component='div'>
          Banking System
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems
          .filter((item) => !item.roles || item.roles.includes(role))
          .map((item) => (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
