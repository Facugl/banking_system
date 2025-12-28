import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { List, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import BuildIcon from '@mui/icons-material/Build';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SecurityIcon from '@mui/icons-material/Security';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
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
      icon: <DashboardIcon />,
      path: Routes.DASHBOARD,
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },
    {
      text: 'Modules',
      icon: <ViewModuleIcon />,
      path: Routes.DASHBOARD_MODULES,
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },
    {
      text: 'Operations',
      icon: <BuildIcon />,
      path: Routes.DASHBOARD_OPERATIONS,
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },
    {
      text: 'Roles',
      icon: <AdminPanelSettingsIcon />,
      path: Routes.DASHBOARD_ROLES,
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },
    {
      text: 'Permissions',
      icon: <SecurityIcon />,
      path: Routes.DASHBOARD_PERMISSIONS,
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },
    {
      text: 'Accounts',
      icon: <AccountBalanceIcon />,
      path: Routes.DASHBOARD_ACCOUNTS,
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },
    {
      text: 'Overview',
      icon: <HomeIcon />,
      path: Routes.CUSTOMER_PANEL,
      roles: [ROLES.CUSTOMER],
    },
    {
      text: 'Transactions',
      icon: <ReceiptLongIcon />,
      path: Routes.CUSTOMER_TRANSACTIONS,
      roles: [ROLES.CUSTOMER],
    },
    {
      text: 'Profile',
      icon: <PersonIcon />,
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
