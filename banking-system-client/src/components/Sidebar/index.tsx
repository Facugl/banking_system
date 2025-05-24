import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { List, ListItemIcon, ListItemText, Divider } from '@mui/material';
import {
  Home as HomeIcon,
  Group as GroupIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  SwapHoriz as TransferIcon,
  History as HistoryIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
import {
  StyledDrawer,
  LogoContainer,
  BrandName,
  StyledListItem,
} from './styles';
import { ROLES } from '../../utils/constants';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const role = useAppSelector((state) => state.auth.role);

  const menuItems = [
    // Admin/Employee menu items
    {
      text: 'Home',
      icon: <HomeIcon />,
      path: '/dashboard',
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },
    {
      text: 'Modules',
      icon: <SettingsIcon />,
      path: '/dashboard/modules',
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },
    {
      text: 'Operations',
      icon: <SettingsIcon />,
      path: '/dashboard/operations',
      roles: [ROLES.ADMINISTRATOR],
    },
    {
      text: 'Permissions',
      icon: <LockIcon />,
      path: '/dashboard/permissions',
      roles: [ROLES.ADMINISTRATOR],
    },
    {
      text: 'Roles',
      icon: <GroupIcon />,
      path: '/dashboard/roles',
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },
    // Shared Accounts menu item
    {
      text: 'Accounts',
      icon: <AccountCircleIcon />,
      path:
        role === ROLES.CUSTOMER
          ? '/customer-panel/accounts'
          : '/dashboard/accounts',
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE, ROLES.CUSTOMER],
    },
    // Customer-specific menu items
    {
      text: 'Account Overview',
      icon: <HomeIcon />,
      path: '/customer-panel',
      roles: [ROLES.CUSTOMER],
    },
    {
      text: 'Transactions',
      icon: <HistoryIcon />,
      path: '/customer-panel/transactions',
      roles: [ROLES.CUSTOMER],
    },
    {
      text: 'Transfers',
      icon: <TransferIcon />,
      path: '/customer-panel/transfers',
      roles: [ROLES.CUSTOMER],
    },
    {
      text: 'Profile',
      icon: <ProfileIcon />,
      path: '/customer-panel/profile',
      roles: [ROLES.CUSTOMER],
    },
  ];

  return (
    <StyledDrawer variant='permanent' anchor='left'>
      <LogoContainer>
        <BrandName variant='h6' noWrap component='div'>
          Banking System
        </BrandName>
      </LogoContainer>
      <Divider />
      <List>
        {menuItems
          .filter((item) => role && item.roles.includes(role))
          .map((item) => (
            <StyledListItem
              key={item.text}
              component={Link}
              to={item.path}
              isActive={location.pathname.startsWith(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
