import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage, UnauthorizedPage } from '../pages';
import { ROLES, Routes as Path } from '../utils/constants';
import RolesView from '../features/roles/views/RolesView';
import AccountsView from '../features/accounts/views/AccountsView';
import StatisticsView from '../features/statistics/views/StatisticsView';
import ModulesView from '../features/modules/views/ModulesView';
import TransactionsView from '../features/transactions/views/TransactionsView';
import CustomerAccountsView from '../features/accounts/views/CustomerAccountsView';
import ProfileView from '../features/customer/views/ProfileView';
import LandingPage from '../pages/LandingPage';
import { PrivateRoute } from '../components';
import OperationsView from '../features/operations/views/OperationsView';
import PermissionsView from '../features/permissions/views/PermissionsView';
import DashboardIndex from '../components/DashboardIndex';
import AppLayout from '../layouts/AppLayout';

const AppRoutes = () => (
  <Routes>
    {/* Public */}
    <Route path='/' element={<LandingPage />} />

    <Route
      path={Path.LOGIN}
      element={
        <PrivateRoute publicRoute>
          <LoginPage />
        </PrivateRoute>
      }
    />

    <Route
      path={Path.REGISTER}
      element={
        <PrivateRoute publicRoute>
          <RegisterPage />
        </PrivateRoute>
      }
    />

    {/* App Layout */}
    <Route
      element={
        <PrivateRoute
          allowedRoles={[ROLES.ADMINISTRATOR, ROLES.EMPLOYEE, ROLES.CUSTOMER]}
        >
          <AppLayout />
        </PrivateRoute>
      }
    >
      {/* ADMIN / EMPLOYEE */}
      <Route path={Path.DASHBOARD} element={<DashboardIndex />} />
      <Route
        path={`${Path.DASHBOARD}/statistics`}
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMINISTRATOR]}>
            <StatisticsView />
          </PrivateRoute>
        }
      />
      <Route
        path={`${Path.DASHBOARD}/modules`}
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMINISTRATOR]}>
            <ModulesView />
          </PrivateRoute>
        }
      />
      <Route
        path={`${Path.DASHBOARD}/operations`}
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMINISTRATOR]}>
            <OperationsView />
          </PrivateRoute>
        }
      />
      <Route
        path={`${Path.DASHBOARD}/roles`}
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMINISTRATOR]}>
            <RolesView />
          </PrivateRoute>
        }
      />
      <Route
        path={`${Path.DASHBOARD}/permissions`}
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMINISTRATOR]}>
            <PermissionsView />
          </PrivateRoute>
        }
      />
      <Route
        path={`${Path.DASHBOARD}/accounts`}
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMINISTRATOR, ROLES.EMPLOYEE]}>
            <AccountsView />
          </PrivateRoute>
        }
      />

      {/* CUSTOMER */}
      <Route path={Path.CUSTOMER_PANEL} element={<CustomerAccountsView />} />

      {/* SHARED */}
      <Route path={Path.PROFILE} element={<ProfileView />} />
      <Route path={Path.TRANSACTIONS} element={<TransactionsView />} />
    </Route>

    <Route path={Path.UNAUTHORIZED} element={<UnauthorizedPage />} />
    <Route path='*' element={<Navigate to={Path.UNAUTHORIZED} replace />} />
  </Routes>
);

export default AppRoutes;
