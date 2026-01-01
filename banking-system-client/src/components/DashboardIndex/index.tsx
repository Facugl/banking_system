import { Navigate } from 'react-router-dom';
import { useAuthSession } from '../../hooks/useAuthSession';
import { LoadingSpinner } from '..';
import { ROLES, Routes } from '../../utils/constants';

const DashboardIndex = () => {
  const { profile, sessionLoading, sessionReady } = useAuthSession();

  if (sessionLoading || !sessionReady) {
    return <LoadingSpinner />;
  }

  if (!profile?.role) {
    return <Navigate to={Routes.LOGIN} replace />;
  }

  if (profile.role === ROLES.ADMINISTRATOR) {
    return <Navigate to={`${Routes.DASHBOARD}/statistics`} replace />;
  }

  if (profile.role === ROLES.EMPLOYEE) {
    return <Navigate to={`${Routes.DASHBOARD}/accounts`} replace />;
  }

  return <Navigate to={Routes.UNAUTHORIZED} replace />;
};

export default DashboardIndex;
