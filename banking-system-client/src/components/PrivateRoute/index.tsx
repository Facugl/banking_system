import { Navigate } from 'react-router-dom';
import { ROLES, Routes } from '../../utils/constants';
import { useAuthSession } from '../../hooks/useAuthSession';
import { ReactNode } from 'react';
import LoadingSpinner from '../LoadingSpinner';

interface PrivateRouteProps {
  allowedRoles?: string[];
  publicRoute?: boolean;
  children: ReactNode;
}

const PrivateRoute = ({
  allowedRoles,
  publicRoute = false,
  children,
}: PrivateRouteProps) => {
  const { token, profile, sessionLoading, sessionReady } = useAuthSession();

  const isAuthenticated = Boolean(token);
  const userRole = profile?.role;

  if (publicRoute) {
    if (isAuthenticated && userRole) {
      const redirectTo =
        userRole === ROLES.CUSTOMER ? Routes.CUSTOMER_PANEL : Routes.DASHBOARD;

      return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <Navigate to={Routes.LOGIN} replace />;
  }

  if (sessionLoading || !sessionReady) {
    return <LoadingSpinner />;
  }

  if (!userRole) {
    return <Navigate to={Routes.LOGIN} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={Routes.UNAUTHORIZED} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
