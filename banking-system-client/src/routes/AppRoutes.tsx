import { Navigate, Route, Routes } from 'react-router-dom';
import { HomeRedirect, PrivateRoute } from '../components';
import {
  DashboardPage,
  LoginPage,
  RegisterPage,
  UnauthorizedPage,
  CustomerPanelPage,
} from '../pages';
import { ROLES } from '../utils/constants';
import RolesView from '../features/roles/views/RolesView';
import AccountsView from '../features/accounts/views/AccountsView';
import StatisticsView from '../features/statistics/views/StatisticsView';
import ModulesView from '../features/modules/views/ModulesView';
import {
  AccountOverviewView,
  ProfileView,
  TransactionsView,
  TransfersView,
} from '../features/customer/views';

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<HomeRedirect />} />

    <Route
      path='/login'
      element={
        <PrivateRoute publicRoute>
          <LoginPage />
        </PrivateRoute>
      }
    />
    <Route
      path='/register'
      element={
        <PrivateRoute publicRoute>
          <RegisterPage />
        </PrivateRoute>
      }
    />

    <Route
      path='/dashboard'
      element={
        <PrivateRoute allowedRoles={[ROLES.ADMINISTRATOR, ROLES.EMPLOYEE]}>
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
          <PrivateRoute allowedRoles={[ROLES.ADMINISTRATOR, ROLES.EMPLOYEE]}>
            <AccountsView />
          </PrivateRoute>
        }
      />
    </Route>

    <Route
      path='/customer-panel'
      element={
        <PrivateRoute allowedRoles={[ROLES.CUSTOMER]}>
          <CustomerPanelPage />
        </PrivateRoute>
      }
    >
      <Route index element={<AccountOverviewView />} />
      <Route
        path='accounts'
        element={
          <PrivateRoute allowedRoles={[ROLES.CUSTOMER]}>
            <AccountsView />
          </PrivateRoute>
        }
      />
      <Route
        path='transactions'
        element={
          <PrivateRoute allowedRoles={[ROLES.CUSTOMER]}>
            <TransactionsView />
          </PrivateRoute>
        }
      />
      <Route
        path='transfers'
        element={
          <PrivateRoute allowedRoles={[ROLES.CUSTOMER]}>
            <TransfersView />
          </PrivateRoute>
        }
      />
      <Route
        path='profile'
        element={
          <PrivateRoute allowedRoles={[ROLES.CUSTOMER]}>
            <ProfileView />
          </PrivateRoute>
        }
      />
    </Route>

    <Route path='/unauthorized' element={<UnauthorizedPage />} />
    <Route path='*' element={<Navigate to='/unauthorized' replace />} />
  </Routes>
);

export default AppRoutes;
