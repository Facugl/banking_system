import { Route, Routes } from 'react-router-dom';
import { HomeRedirect, PrivateRoute } from '../components';
import {
  DashboardPage,
  LoginPage,
  RegisterPage,
  UnauthorizedPage,
} from '../pages';
import RolesView from '../features/roles/views/RolesView';
import AccountsView from '../features/accounts/views/AccountsView';
import StatisticsView from '../features/statistics/views/StatisticsView';
import { ROLES } from '../utils/constants';
import ModulesView from '../features/modules/views/ModulesView';

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<HomeRedirect />} />

    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />

    <Route
      path='/dashboard'
      element={
        <PrivateRoute
          allowedRoles={[ROLES.ADMINISTRATOR, ROLES.EMPLOYEE, ROLES.CUSTOMER]}
        >
          <DashboardPage />
        </PrivateRoute>
      }
    >
      <Route index element={<StatisticsView />} />

      <Route
        path='modules'
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMINISTRATOR, ROLES.EMPLOYEE]}>
            <ModulesView />
          </PrivateRoute>
        }
      />
      <Route
        path='roles'
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMINISTRATOR, ROLES.EMPLOYEE]}>
            <RolesView />
          </PrivateRoute>
        }
      />
      <Route
        path='accounts'
        element={
          <PrivateRoute
            allowedRoles={[ROLES.ADMINISTRATOR, ROLES.EMPLOYEE, ROLES.CUSTOMER]}
          >
            <AccountsView />
          </PrivateRoute>
        }
      />
    </Route>

    <Route path='/unauthorized' element={<UnauthorizedPage />} />
  </Routes>
);

export default AppRoutes;
