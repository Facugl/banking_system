import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { List, ListItemIcon, ListItemText, Divider } from '@mui/material';
import {
  Home as HomeIcon,
  Group as GroupIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  History as HistoryIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
import {
  StyledDrawer,
  LogoContainer,
  BrandName,
  StyledListItem,
} from './styles';
import { ROLES, Role, Routes } from '../../utils/constants';

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onDrawerToggle }) => {
  const location = useLocation();
  const profile = useAppSelector((state) => state.customer.profile);
  const role = profile?.role as Role | undefined;

  const menuItems: Array<{
    text: string;
    icon: JSX.Element;
    path: string;
    roles: Role[];
  }> = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      path: Routes.DASHBOARD,
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },
    {
      text: 'Modules',
      icon: <SettingsIcon />,
      path: Routes.DASHBOARD_MODULES,
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },
    {
      text: 'Roles',
      icon: <GroupIcon />,
      path: Routes.DASHBOARD_ROLES,
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },
    {
      text: 'Operations',
      icon: <GroupIcon />,
      path: Routes.DASHBOARD_OPERATIONS,
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },
    {
      text: 'Accounts',
      icon: <AccountCircleIcon />,
      path: Routes.DASHBOARD_ACCOUNTS,
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },
    {
      text: 'Home',
      icon: <HomeIcon />,
      path: Routes.CUSTOMER_PANEL,
      roles: [ROLES.CUSTOMER],
    },
    {
      text: 'Transactions',
      icon: <HistoryIcon />,
      path: Routes.CUSTOMER_TRANSACTIONS,
      roles: [ROLES.CUSTOMER],
    },
    {
      text: 'Profile',
      icon: <ProfileIcon />,
      path: Routes.CUSTOMER_PROFILE,
      roles: [ROLES.CUSTOMER],
    },
  ];

  const drawerContent = (
    <>
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
              isActive={
                item.path === Routes.CUSTOMER_PANEL ||
                item.path === Routes.DASHBOARD
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path)
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
      </List>
    </>
  );

  return (
    <>
      <StyledDrawer
        variant='temporary'
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {drawerContent}
      </StyledDrawer>

      <StyledDrawer
        variant='permanent'
        open
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        {drawerContent}
      </StyledDrawer>
    </>
  );
};

export default Sidebar;
