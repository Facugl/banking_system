import { Navigate, Route, Routes } from 'react-router-dom';
import {
  DashboardPage,
  LoginPage,
  RegisterPage,
  UnauthorizedPage,
  CustomerPanelPage,
} from '../pages';
import { ROLES, Routes as Path } from '../utils/constants';
import RolesView from '../features/roles/views/RolesView';
import AccountsView from '../features/accounts/views/AccountsView';
import StatisticsView from '../features/statistics/views/StatisticsView';
import ModulesView from '../features/modules/views/ModulesView';
import TransactionsView from '../features/transactions/TransactionsView';
import CustomerAccountsView from '../features/accounts/views/CustomerAccountsView';
import ProfileView from '../features/customer/views/ProfileView';
import LandingPage from '../pages/LandingPage';
import { PrivateRoute } from '../components';
import OperationsView from '../features/operations/views/OperationsView';
import PermissionsView from '../features/permissions/Views/PermissionsView';

const AppRoutes = () => (
  <Routes>
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
    <Route
      path={Path.DASHBOARD}
      element={
        <PrivateRoute allowedRoles={[ROLES.ADMINISTRATOR, ROLES.EMPLOYEE]}>
          <DashboardPage />
        </PrivateRoute>
      }
    >
      <Route index element={<StatisticsView />} />
      <Route path='modules' element={<ModulesView />} />
      <Route path='operations' element={<OperationsView />} />
      <Route path='permissions' element={<PermissionsView />} />
      <Route path='roles' element={<RolesView />} />
      <Route path='accounts' element={<AccountsView />} />
    </Route>
    <Route
      path={Path.CUSTOMER_PANEL}
      element={
        <PrivateRoute allowedRoles={[ROLES.CUSTOMER]}>
          <CustomerPanelPage />
        </PrivateRoute>
      }
    >
      <Route index element={<CustomerAccountsView />} />
      <Route path='transactions' element={<TransactionsView />} />
      <Route path='profile' element={<ProfileView />} />
    </Route>
    <Route path={Path.UNAUTHORIZED} element={<UnauthorizedPage />} />
    <Route path='*' element={<Navigate to={Path.UNAUTHORIZED} replace />} />
  </Routes>
);

export default AppRoutes;
